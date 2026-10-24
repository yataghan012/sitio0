import React from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/bakeryData';

interface GalleryProps {
  onSelectImage: (item: { imageUrl: string; alt: string; title: string }) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectImage }) => {
  return (
    <section id="galeria" aria-labelledby="galeria-title">
      <div>
        <div className="ornament" style={{ color: 'var(--gold-light)' }} aria-hidden="true">
          ✦
        </div>
        <p className="section-label">Momentos dulces</p>
        <h2 className="section-title" id="galeria-title">
          Galería de <em>Tortas y Creaciones Artesanales</em>
        </h2>
        <p className="section-desc">
          Una muestra de las tortas temáticas personalizadas, postres gourmet y mesas dulces que salen cada día de nuestra pastelería artesanal en Córdoba.
        </p>
      </div>

      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item: GalleryItem) => (
          <figure
            key={item.id}
            className={`gallery-item ${item.gridClass}`}
            role="button"
            tabIndex={0}
            aria-label={`Ver foto ampliada de ${item.title}`}
            onClick={() => onSelectImage({ imageUrl: item.imageUrl, alt: item.alt, title: item.title })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectImage({ imageUrl: item.imageUrl, alt: item.alt, title: item.title });
              }
            }}
          >
            <div className="g-bg">
              <img
                src={item.imageUrl}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={400}
                height={320}
                className="g-img"
              />
            </div>
            <figcaption className="g-overlay">
              <span>{item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
