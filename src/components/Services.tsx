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
            itemScope
            itemType="https://schema.org/Service"
          >
            {service.imageUrl ? (
              <div
                className="servicio-img-circle"
                style={{ backgroundImage: `url('${service.imageUrl}')` }}
                role="img"
                aria-label={service.alt}
              />
            ) : (
              <span className="servicio-icon" aria-hidden="true">
                {service.icon || '📦'}
              </span>
            )}
            <h3 itemProp="name">{service.title}</h3>
            <p itemProp="description">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
