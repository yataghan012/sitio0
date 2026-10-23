import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CONTACT_INFO } from '../data/bakeryData';
import { trackConversion } from '../utils/analytics';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    trackConversion('contact_form_submit', {
      category: 'lead_generation',
      label: formData.servicio || 'general_query',
    });

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);

      // Confetti celebratory burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c0515a', '#b8956a', '#3b2314', '#d4b48c'],
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleSendWhatsAppDirect = () => {
    trackConversion('whatsapp_click', {
      category: 'lead_generation',
      label: 'contact_form_success_whatsapp',
    });
    const text = encodeURIComponent(
      `Hola Amarena Pastelería! Mi nombre es ${formData.nombre || 'un cliente'}. ` +
      `${formData.servicio ? `Me interesa: ${formData.servicio}. ` : ''}` +
      `${formData.mensaje ? `Detalle: ${formData.mensaje}` : 'Quisiera consultar disponibilidad y presupuesto.'}`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
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
        <div className="contacto-info" itemScope itemType="https://schema.org/Bakery">
          <meta itemProp="name" content="Amarena Pastelería" />
          <meta itemProp="priceRange" content="$$" />

          <h3>Visitanos o escribínos</h3>
          <p>
            Estamos disponibles para atenderte en persona o a distancia. Nos interesa conocer tu proyecto y crear algo memorable para tu celebración.
          </p>

          <div className="info-item">
            <span className="info-icon">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
            </span>
            <div>
              <strong>Ubicación</strong>
              <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress" style={{ fontStyle: 'normal' }}>
                <span itemProp="streetAddress">B° Empalme</span>,{' '}
                <span itemProp="addressLocality">Córdoba</span>,{' '}
                <span itemProp="addressCountry">Argentina</span>
              </address>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <i className="fa-solid fa-phone" aria-hidden="true" />
            </span>
            <div>
              <strong>Teléfono</strong>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                itemProp="telephone"
                style={{ color: 'inherit', textDecoration: 'none' }}
                aria-label={`Llamar a Amarena Pastelería al ${CONTACT_INFO.phone}`}
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </span>
            <div>
              <strong>Email</strong>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                itemProp="email"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">
              <i className="fa-solid fa-clock" aria-hidden="true" />
            </span>
            <div>
              <strong>Horario</strong>
              <time dateTime="Mo-Sa 09:00-19:00" itemProp="openingHours">
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
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                Continuar por WhatsApp
              </button>
              <button
                type="button"
                className="btn-send"
                style={{ background: 'var(--brown-mid)', padding: '0.6rem 1.4rem' }}
                onClick={() => {
                  setSubmitted(false);
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
                  Teléfono <span style={{ fontWeight: 400, opacity: 0.7 }}>(opcional)</span>
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
              <small id="mensaje-hint" style={{ opacity: 0.7, fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                Cuanto más detalle nos des, más preciso será el presupuesto.
              </small>
            </div>

            <button type="submit" className="btn-send" disabled={isSending}>
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              {isSending ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
