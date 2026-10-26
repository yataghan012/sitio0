export interface Env {
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  MAIL_TO?: string;
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

interface ContactPayload {
  nombre?: unknown;
  email?: unknown;
  telefono?: unknown;
  servicio?: unknown;
  mensaje?: unknown;
  honeypot?: unknown;
  _gotcha?: unknown;
  turnstileToken?: unknown;
  'cf-turnstile-response'?: unknown;
}

function jsonResponse(data: { ok: boolean; error?: string }, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Ruta específica POST /api/contact
    if (url.pathname === '/api/contact') {
      // Restricción same-origin only: rechazar si el header Origin no coincide con url.origin
      const origin = request.headers.get('Origin');
      if (origin && origin !== url.origin) {
        return jsonResponse({ ok: false, error: 'Acceso denegado: solo solicitudes del mismo origen' }, 403);
      }

      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: 'Método no permitido' }, 405);
      }

      let payload: ContactPayload;
      try {
        payload = (await request.json()) as ContactPayload;
      } catch {
        return jsonResponse({ ok: false, error: 'JSON inválido' }, 400);
      }

      const {
        nombre,
        email,
        telefono,
        servicio,
        mensaje,
        honeypot,
        _gotcha,
        turnstileToken,
        'cf-turnstile-response': cfResponse,
      } = payload;

      // 1. Honeypot anti-spam: Si el campo oculto contiene valor, rechazar
      const hp = typeof honeypot === 'string' ? honeypot.trim() : (typeof _gotcha === 'string' ? _gotcha.trim() : '');
      if (hp.length > 0) {
        return jsonResponse({ ok: false, error: 'Solicitud no válida' }, 400);
      }

      // 2. Verificación de Cloudflare Turnstile server-side
      const token =
        typeof turnstileToken === 'string' && turnstileToken.trim()
          ? turnstileToken.trim()
          : typeof cfResponse === 'string' && cfResponse.trim()
          ? cfResponse.trim()
          : '';

      if (!token) {
        return jsonResponse({ ok: false, error: 'Token de Turnstile requerido' }, 400);
      }

      const remoteIp = request.headers.get('CF-Connecting-IP') || '';

      const turnstileFormData = new FormData();
      turnstileFormData.append('secret', env.TURNSTILE_SECRET || '');
      turnstileFormData.append('response', token);
      if (remoteIp) {
        turnstileFormData.append('remoteip', remoteIp);
      }

      try {
        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: turnstileFormData,
        });

        const turnstileOutcome = (await turnstileRes.json().catch(() => null)) as {
          success?: boolean;
          'error-codes'?: string[];
        } | null;

        if (!turnstileOutcome || !turnstileOutcome.success) {
          return jsonResponse({ ok: false, error: 'Verificación de Turnstile inválida' }, 400);
        }
      } catch (err) {
        console.error('Error al contactar Cloudflare Turnstile:', err);
        return jsonResponse({ ok: false, error: 'Error al validar Turnstile' }, 400);
      }

      // 3. Validación de campos obligatorios
      if (typeof nombre !== 'string' || !nombre.trim()) {
        return jsonResponse({ ok: false, error: 'El nombre es obligatorio' }, 400);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return jsonResponse({ ok: false, error: 'El email no es válido' }, 400);
      }

      if (typeof servicio !== 'string' || !servicio.trim()) {
        return jsonResponse({ ok: false, error: 'Debes seleccionar un servicio' }, 400);
      }

      if (typeof mensaje !== 'string' || !mensaje.trim()) {
        return jsonResponse({ ok: false, error: 'El mensaje no puede estar vacío' }, 400);
      }

      // Limpieza y remoción de \r\n de nombre y campos de cabecera
      const cleanNombre = nombre.replace(/[\r\n]/g, '').trim();
      const cleanEmail = email.trim();
      const cleanTelefono = typeof telefono === 'string' && telefono.trim() ? telefono.replace(/[\r\n]/g, '').trim() : '';
      const cleanServicio = servicio.replace(/[\r\n]/g, '').trim();
      const cleanMensaje = mensaje.trim();

      if (!cleanNombre) {
        return jsonResponse({ ok: false, error: 'El nombre no es válido' }, 400);
      }

      // 4. Validación de longitudes máximas (nombre 100, email 200, telefono 40, mensaje 3000)
      if (cleanNombre.length > 100) {
        return jsonResponse({ ok: false, error: 'El nombre excede el límite máximo de 100 caracteres' }, 400);
      }

      if (cleanEmail.length > 200) {
        return jsonResponse({ ok: false, error: 'El email excede el límite máximo de 200 caracteres' }, 400);
      }

      if (cleanTelefono.length > 40) {
        return jsonResponse({ ok: false, error: 'El teléfono excede el límite máximo de 40 caracteres' }, 400);
      }

      if (cleanMensaje.length > 3000) {
        return jsonResponse({ ok: false, error: 'El mensaje excede el límite máximo de 3000 caracteres' }, 400);
      }

      // 5. Envío por REST de Resend
      if (!env.RESEND_API_KEY) {
        console.error('Variable RESEND_API_KEY no configurada');
        return jsonResponse({ ok: false, error: 'Servicio de correo temporalmente no configurado' }, 500);
      }

      const fromAddress = env.MAIL_FROM || 'Amarena Pastelería <onboarding@resend.dev>';
      const toAddress = env.MAIL_TO ? [env.MAIL_TO] : ['marialorenavivasrodriguez@gmail.com'];

      // Sanitizar el asunto eliminando \r\n
      const rawSubject = `Nuevo pedido web: ${cleanNombre} (${cleanServicio})`;
      const cleanSubject = rawSubject.replace(/[\r\n]/g, '');

      const escapedNombre = escapeHtml(cleanNombre);
      const escapedEmail = escapeHtml(cleanEmail);
      const escapedTelefono = cleanTelefono ? escapeHtml(cleanTelefono) : 'No especificado';
      const escapedServicio = escapeHtml(cleanServicio);
      const escapedMensajeHtml = escapeHtml(cleanMensaje).replace(/\n/g, '<br/>');

      const htmlContent = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7ded2; border-radius: 10px; background-color: #fffefb;">
          <h2 style="color: #3b2314; font-size: 20px; border-bottom: 2px solid #b8956a; padding-bottom: 10px; margin-top: 0;">
            Nuevo mensaje desde amarenapasteleria.com
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; color: #3b2314;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Nombre:</td>
              <td style="padding: 8px 0;">${escapedNombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}" style="color: #c0515a;">${escapedEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 8px 0;">${escapedTelefono}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Servicio de interés:</td>
              <td style="padding: 8px 0;">${escapedServicio}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f7f1e7; border-left: 4px solid #c0515a; border-radius: 6px;">
            <strong style="color: #3b2314; display: block; margin-bottom: 8px;">Mensaje o detalle del pedido:</strong>
            <p style="margin: 0; color: #4a3627; font-size: 14px; line-height: 1.6;">${escapedMensajeHtml}</p>
          </div>
          <hr style="margin: 24px 0 16px; border: none; border-top: 1px solid #eedecb;" />
          <p style="font-size: 12px; color: #8a7566; margin: 0; text-align: center;">
            Amarena Pastelería Artesanal Córdoba &bull; Barrio Empalme
          </p>
        </div>
      `;

      const textContent = `Nuevo mensaje desde amarenapasteleria.com:\n\n` +
        `Nombre: ${cleanNombre}\n` +
        `Email: ${cleanEmail}\n` +
        `Teléfono: ${cleanTelefono || 'No especificado'}\n` +
        `Servicio: ${cleanServicio}\n\n` +
        `Mensaje:\n${cleanMensaje}\n`;

      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: toAddress,
            reply_to: cleanEmail,
            subject: cleanSubject,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (!resendRes.ok) {
          const errorText = await resendRes.text();
          console.error('Error respuesta Resend:', resendRes.status, errorText);
          return jsonResponse({ ok: false, error: 'No se pudo enviar el correo mediante el servidor' }, 502);
        }

        // Éxito
        return jsonResponse({ ok: true }, 200);
      } catch (err) {
        console.error('Error de conexión con Resend:', err);
        return jsonResponse({ ok: false, error: 'Error de conexión al enviar el correo' }, 500);
      }
    }

    // Otras rutas /api/* devuelven 404
    if (url.pathname.startsWith('/api/')) {
      return jsonResponse({ ok: false, error: 'Ruta API no encontrada' }, 404);
    }

    // Rutas estáticas mediante binding ASSETS si está disponible
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
