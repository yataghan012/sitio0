import React from 'react';
import { TESTIMONIALS, CONTACT_INFO } from '../data/bakeryData';
import { trackConversion } from '../utils/analytics';

export const Testimonials: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackConversion('whatsapp_click', {
      category: 'engagement',
      label: 'testimonials_cta',
    });
    const message = encodeURIComponent(
      'Hola Amarena Pastelería! Estuve leyendo las opiniones de sus clientes en Córdoba y quisiera consultar disponibilidad para un pedido.'
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="testimonios-section">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Experiencias y confianza</p>
        <h2 className="section-title" id="testimonios-title">
          Opiniones de <em>Nuestros Clientes en Córdoba</em>
        </h2>
        <p className="section-desc">
          La satisfacción de quienes confiaron en nuestras manos artesanas para sus cumpleaños, bodas y eventos en Córdoba Capital.
        </p>

        <div className="reviews-summary-badge" role="status" aria-label="Calificación promedio 5.0 sobre 5 estrellas">
          <span className="stars-gold" aria-hidden="true">★★★★★</span>
          <span className="rating-score">5.0 de 5.0</span>
          <span className="rating-divider">·</span>
          <span className="rating-count">+48 opiniones de clientes felices en Córdoba</span>
        </div>
      </div>

      <div className="testimonios-grid">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            className="testimonio-card"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="testimonio-stars" aria-label={`Calificación de ${t.rating} de 5 estrellas`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <i key={i} className="fa-solid fa-star" aria-hidden="true" />
              ))}
            </div>

            <blockquote className="testimonio-comment" itemProp="reviewBody">
              “{t.comment}”
            </blockquote>

            <div className="testimonio-footer">
              <div className="testimonio-avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </div>
              <div>
                <h3 className="testimonio-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{t.name}</span>
                </h3>
                <p className="testimonio-meta">
                  <span>{t.roleOrOccasion}</span> · <em>{t.neighborhood}</em>
                </p>
                <meta itemProp="datePublished" content={t.date} />
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="sr-only">
                  <meta itemProp="ratingValue" content={String(t.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="testimonios-cta">
        <p>¿Querés que tu festejo sea el próximo momento inolvidable?</p>
        <button
          type="button"
          className="btn-hero"
          onClick={handleWhatsAppClick}
          aria-label="Consultar fecha y presupuesto por WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true" style={{ marginRight: '0.5rem' }} />
          Encargá tu Torta o Mesa Dulce
        </button>
      </div>
    </section>
  );
};
