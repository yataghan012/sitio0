import React, { useEffect, useRef } from 'react';
import { TARTAS_ITEMS } from '../data/bakeryData';

interface TartasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (item: { imageUrl: string; alt: string; title: string }) => void;
}

export const TartasModal: React.FC<TartasModalProps> = ({ isOpen, onClose, onSelectImage }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      prevActive?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      id="tartasModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tartasModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box">
        <button
          ref={closeBtnRef}
          className="modal-close"
          id="tartasModalClose"
          aria-label="Cerrar modal de tartas artesanales"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="tartasModalTitle">Tartas Artesanales en Córdoba</h2>
        <p className="modal-sub">Masa casera, rellenos naturales y frutas frescas de estación elaboradas en Córdoba Capital</p>

        {TARTAS_ITEMS.map((item) => (
          <div key={item.id} className="modal-item">
            <div
              className="modal-item-icon"
              role="button"
              tabIndex={0}
              aria-label={`Ver foto ampliada de ${item.title}`}
              title="Clic para ampliar foto"
              onClick={() => onSelectImage({ imageUrl: item.imageUrl, alt: item.alt, title: item.title })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectImage({ imageUrl: item.imageUrl, alt: item.alt, title: item.title });
                }
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.alt || `${item.title} artesanal en Córdoba`}
                loading="lazy"
                decoding="async"
                width={54}
                height={54}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
              />
            </div>
            <div className="modal-item-info">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
