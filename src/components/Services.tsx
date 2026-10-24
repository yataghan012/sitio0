import React from 'react';
import { SERVICES } from '../data/bakeryData';

export const Services: React.FC = () => {
  return (
    <section id="servicios" aria-labelledby="servicios-title">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Lo que ofrecemos</p>
        <h2 className="section-title" id="servicios-title">
          Servicios de <em>Pastelería en Córdoba</em>
        </h2>
        <p className="section-desc">
          Desde tortas personalizadas para cumpleaños y bodas hasta mesas dulces completas y envíos a domicilio en Córdoba Capital.
        </p>
      </div>

      <div className="servicios-grid">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="servicio-card"
          >
            {service.imageUrl ? (
              <img
                src={service.imageUrl}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                width={190}
                height={190}
                className="servicio-img-circle"
              />
            ) : (
              <span className="servicio-icon" aria-hidden="true">
                {service.icon || '📦'}
              </span>
            )}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
