import React, { useEffect, useRef } from 'react';

interface LightboxModalProps {
  image: { imageUrl: string; alt: string; title: string } | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;

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
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="lightbox-overlay active"
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Imagen ampliada de Amarena Pastelería"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="lightbox-content">
        <button
          ref={closeBtnRef}
          className="lightbox-close"
          id="lightboxClose"
          aria-label="Cerrar imagen ampliada"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={image.imageUrl}
          alt={image.alt || image.title}
          id="lightboxImg"
          width={800}
          height={600}
        />
      </div>
    </div>
  );
};
