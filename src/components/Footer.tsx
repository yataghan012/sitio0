import React from 'react';
import { CONTACT_INFO } from '../data/bakeryData';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Seguinos en</h4>
          <div className="social-links">
            <a
              href={CONTACT_INFO.instagramUrl}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Amarena Pastelería @amarenacba21 — abre en nueva ventana"
            >
              <span className="s-icon">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </span>
              Instagram
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappRaw}`}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Amarena Pastelería — abre en nueva ventana"
            >
              <span className="s-icon">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              </span>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-col footer-info">
          <div className="f-logo">
            <i className="fa-solid fa-cake-candles" aria-hidden="true" />
            Amarena Pastelería
          </div>
          <p>
            © 2026 Amarena Pastelería<br />
            Hecho con amor y dedicación en Córdoba<br /><br />
            <i className="fa-solid fa-location-dot" aria-hidden="true" /> {CONTACT_INFO.address}<br />
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
              aria-label={`Llamar al ${CONTACT_INFO.phone}`}
            >
              {CONTACT_INFO.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Amarena Pastelería · Todos los derechos reservados · Hecho con ❤️ y mucha azúcar en Córdoba</p>
      </div>
    </footer>
  );
};
