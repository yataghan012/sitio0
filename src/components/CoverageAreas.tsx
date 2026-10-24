import React from 'react';
import { COVERAGE_ZONES, CONTACT_INFO } from '../data/bakeryData';
import { trackConversion } from '../utils/analytics';
import { IconBoxOpen, IconTemperatureLow, IconClock, IconLocation } from './Icons';

export const CoverageAreas: React.FC = () => {
  const handleConsultZone = (zoneName: string) => {
    trackConversion('whatsapp_click', {
      category: 'engagement',
      label: `coverage_zone_${zoneName}`,
    });
    const message = encodeURIComponent(
      `Hola Amarena Pastelería! Quisiera consultar por un envío a domicilio para mi zona (${zoneName}) en Córdoba.`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="zonas-entrega" aria-labelledby="zonas-title" className="cobertura-section">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Llegamos a tu evento</p>
        <h2 className="section-title" id="zonas-title">
          Envíos a Domicilio y <em>Zonas de Cobertura en Córdoba</em>
        </h2>
        <p className="section-desc">
          Entregamos nuestras tortas y postres artesanales en todos los barrios de Córdoba Capital y Gran Córdoba con transporte acondicionado para preservar la presentación.
        </p>

        <div className="cobertura-features">
          <div className="feature-pill">
            <IconBoxOpen />
            <span>Embalaje rígido protector</span>
          </div>
          <div className="feature-pill">
            <IconTemperatureLow />
            <span>Control de temperatura</span>
          </div>
          <div className="feature-pill">
            <IconClock />
            <span>Horario programado para tu evento</span>
          </div>
        </div>
      </div>

      <div className="cobertura-grid">
        {COVERAGE_ZONES.map((zone) => (
          <div key={zone.id} className="zona-card">
            <div className="zona-header">
              <span className="zona-icon" aria-hidden="true">
                <IconLocation />
              </span>
              <div>
                <h3 className="zona-name">{zone.zoneName}</h3>
                {zone.highlight && <span className="zona-tag">{zone.highlight}</span>}
              </div>
            </div>

            <p className="zona-desc">{zone.description}</p>

            <div className="zona-barrios">
              <strong>Barrios frecuentes:</strong>
              <div className="barrios-tags">
                {zone.neighborhoods.map((barrio) => (
                  <span key={barrio} className="barrio-chip">
                    {barrio}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="zona-btn"
              onClick={() => handleConsultZone(zone.zoneName)}
              aria-label={`Consultar envío en esta zona: ${zone.zoneName} por WhatsApp`}
            >
              Consultar envío en esta zona →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
