import React from 'react';
import { trackConversion } from '../utils/analytics';

export const Hero: React.FC = () => {
  const scrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    trackConversion('catalog_click', {
      category: 'engagement',
      label: 'hero_btn',
    });
    const target = document.getElementById('productos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Bienvenidos a Amarena Pastelería — Pastelería Artesanal en Córdoba Argentina">
      <div className="hero-bg" aria-hidden="true" />
      <span className="hero-deco left" aria-hidden="true">🌾</span>
      <span className="hero-deco right" aria-hidden="true">🍂</span>
      <div className="hero-content">
        <div className="hero-tag">Pastelería Artesanal · Córdoba Capital</div>
        <h1 className="hero-title">
          <em style={{ color: 'white' }}>Amarena</em><br />
          <em>Pastelería</em>
          <span className="sr-only"> Artesanal en Córdoba — Tortas Personalizadas, Cumpleaños y Mesas Dulces</span>
        </h1>
        <div className="hero-divider" aria-hidden="true" />
        <p className="hero-sub">
          Cada pieza es una obra de arte hecha a mano con dedicación artesanal en Córdoba, ingredientes selectos y el sabor único para tus cumpleaños, eventos y momentos especiales.
        </p>
        <a href="#productos" className="btn-hero" onClick={scrollToCatalog}>
          Ver Catálogo de Productos
        </a>
      </div>
    </section>
  );
};
