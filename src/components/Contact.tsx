import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/bakeryData';
import { trackConversion } from '../utils/analytics';
import {
  IconLocation,
  IconPhone,
  IconEnvelope,
  IconClock,
  IconWhatsApp,
  IconAlertCircle,
  IconPaperPlane,
} from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendWhatsAppDirect = () => {
    trackConversion('whatsapp_click', {
      category: 'lead_generation',
      label: 'contact_form_whatsapp_direct',
    });
    const text = encodeURIComponent(
      `Hola Amarena Pastelería! Mi nombre es ${formData.nombre || 'un cliente'}. ` +
      `${formData.servicio ? `Me interesa: ${formData.servicio}. ` : ''}` +
      `${formData.mensaje ? `Detalle: ${formData.mensaje}` : 'Quisiera consultar disponibilidad y presupuesto.'}`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          servicio: formData.servicio,
          mensaje: formData.mensaje,
          honeypot: honeypot,
        }),
      });

      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (response.ok && data && data.ok) {
        // Éxito: solo si ok
        setSubmitted(true);
        trackConversion('contact_form_submit', {
          category: 'lead_generation',
          label: formData.servicio || 'general_query',
        });

        // Explosión de confetti con importación dinámica diferida
        try {
          const confettiModule = await import('canvas-confetti');
          const runConfetti = confettiModule.default || confettiModule;
          runConfetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#c0515a', '#b8956a', '#3b2314', '#d4b48c'],
          });
        } catch {
          // Fallback silencioso
        }
      } else {
        // Falla: error visible + botón de WhatsApp
        const errorText = data && data.error
          ? data.error
          : 'Ocurrió un inconveniente al enviar tu mensaje. Podés comunicarte directamente por WhatsApp.';
        setErrorMessage(errorText);
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setErrorMessage('No pudimos conectar con el servidor. Comunicate con nosotros por WhatsApp para atenderte de inmediato.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacto" aria-labelledby="contacto-title">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Escribínos</p>
        <h2 className="section-title" id="contacto-title">
          Contacto y Pedidos en <em>Córdoba Capital</em>
        </h2>
        <p className="section-desc">
          ¿Tenés un evento especial, cumpleaños o boda en Córdoba? Encargá tu torta personalizada o mesa dulce por WhatsApp o completando el formulario.
        </p>
      </div>

      <div className="contacto-wrap">
        <div className="contacto-info">
          <h3>Visitanos o escribínos</h3>
          <p>
            Estamos disponibles para atenderte en persona o a distancia. Nos interesa conocer tu proyecto y crear algo memorable para tu celebración.
          </p>

          <div className="info-item">
            <span className="info-icon">
              <IconLocation />
            </span>
            <div>
              <strong>Ubicación</strong>
              <address style={{ fontStyle: 'normal' }}>
                <span>B° Empalme</span>,{' '}
                <span>Córdoba</span>,{' '}
                <span>Argentina</span>
              </address>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <IconPhone />
            </span>
            <div>
              <strong>Teléfono</strong>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
                aria-label={`Llamar a Amarena Pastelería al ${CONTACT_INFO.phone}`}
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <IconEnvelope />
            </span>
            <div>
              <strong>Email</strong>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <IconClock />
            </span>
            <div>
              <strong>Horario</strong>
              <time dateTime="Mo-Sa 09:00-19:00">
                {CONTACT_INFO.hours}
              </time>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="form-feedback-success" role="alert">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: '0.5rem', color: '#166534' }}>
              ¡Mensaje enviado con éxito!
            </h4>
            <p style={{ marginBottom: '1rem' }}>
              Gracias por escribirnos, <strong>{formData.nombre}</strong>. Nos pondremos en contacto a la brevedad para coordinar tu pedido o consulta.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-send"
                style={{ background: '#25d366', padding: '0.6rem 1.4rem' }}
                onClick={handleSendWhatsAppDirect}
              >
                <IconWhatsApp />
                Continuar por WhatsApp
              </button>
              <button
                type="button"
                className="btn-send"
                style={{ background: 'var(--brown-mid)', padding: '0.6rem 1.4rem' }}
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage(null);
                  setHoneypot('');
                  setFormData({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' });
                }}
              >
                Enviar otra consulta
              </button>
            </div>
          </div>
        ) : (
          <form
            className="contacto-form"
            name="contacto-amarena"
            onSubmit={handleSubmit}
            aria-label="Formulario de contacto y pedidos de Amarena Pastelería"
          >
            {/* Honeypot anti-spam oculto */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="hp_comment">Por favor deje este campo en blanco</label>
              <input
                type="text"
                id="hp_comment"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Error visible + Botón de WhatsApp */}
            {errorMessage && (
              <div className="form-feedback-error" role="alert">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <IconAlertCircle style={{ color: 'var(--rose)', marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <strong>No pudimos enviar tu mensaje:</strong>
                    <p style={{ margin: '0.2rem 0 0.6rem 0' }}>{errorMessage}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-send"
                  style={{
                    background: '#25d366',
                    padding: '0.55rem 1.2rem',
                    fontSize: '0.8rem',
                    marginTop: '0.3rem',
                  }}
                  onClick={handleSendWhatsAppDirect}
                >
                  <IconWhatsApp />
                  Enviar consulta por WhatsApp
                </button>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
                autoComplete="given-name"
                aria-required="true"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">
                  Teléfono <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="(351) 000-0000"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="servicio">¿Qué necesitás?</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
                aria-required="true"
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value="torta-personalizada">Torta personalizada para evento</option>
                <option value="tortas-15">Torta de 15 años</option>
                <option value="mesa-dulce">Mesa dulce para evento</option>
                <option value="catering">Catering para evento</option>
                <option value="tartas">Tartas artesanales</option>
                <option value="petit-fours">Box de Petit Fours</option>
                <option value="consulta">Consulta general</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Contanos sobre tu proyecto</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Fecha del evento, cantidad de personas, gustos, ideas..."
                required
                aria-required="true"
                aria-describedby="mensaje-hint"
              />
              <small id="mensaje-hint" style={{ color: 'var(--text-light)', fontSize: '0.82rem', marginTop: '0.25rem', display: 'block' }}>
                Cuanto más detalle nos des, más preciso será el presupuesto.
              </small>
            </div>



            <button type="submit" className="btn-send" disabled={isSending}>
              <IconPaperPlane />
              {isSending ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
