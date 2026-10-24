import React from 'react';
import { CONTACT_INFO } from '../data/bakeryData';
import { IconInstagram, IconWhatsApp, IconCake, IconLocation, IconPhone } from './Icons';

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
                <IconInstagram />
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
                <IconWhatsApp />
              </span>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-col footer-info">
          <div className="f-logo">
            <IconCake style={{ marginRight: '0.4rem' }} />
            Amarena Pastelería
          </div>
          <p>
            © 2026 Amarena Pastelería<br />
            Hecho con amor y dedicación en Córdoba<br /><br />
            <IconLocation style={{ marginRight: '0.3rem' }} /> {CONTACT_INFO.address}<br />
            <IconPhone style={{ marginRight: '0.3rem' }} />
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
