import React from 'react';
import { CONTACT_INFO } from '../data/bakeryData';
import { trackConversion } from '../utils/analytics';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hola! Quisiera hacer una consulta sobre productos y disponibilidad de Amarena Pastelería'
  )}`;

  const handleClick = () => {
    trackConversion('whatsapp_click', {
      category: 'engagement',
      label: 'floating_widget',
    });
  };

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Amarena Pastelería por WhatsApp — abre en nueva ventana"
      id="whatsappBtn"
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        width="32"
        height="32"
      >
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.253 1.408 1.412-5.248-0.319-0.524c-1.343-2.188-2.050-4.706-2.050-7.273 0-7.589 6.178-13.767 13.767-13.767s13.767 6.178 13.767 13.767c0 7.589-6.178 13.767-13.767 13.767zM23.204 19.567c-0.401-0.201-2.366-1.168-2.732-1.302s-0.633-0.201-0.899 0.201c-0.266 0.401-1.033 1.302-1.267 1.569s-0.467 0.301-0.868 0.101c-0.401-0.201-1.691-0.623-3.219-1.987-1.19-1.061-1.994-2.372-2.228-2.773s-0.025-0.618 0.176-0.818c0.181-0.179 0.401-0.467 0.602-0.701s0.267-0.401 0.401-0.668c0.133-0.267 0.067-0.501-0.034-0.701s-0.899-2.167-1.232-2.967c-0.324-0.78-0.653-0.674-0.899-0.687-0.232-0.012-0.498-0.015-0.764-0.015s-0.701 0.1-1.067 0.501c-0.367 0.401-1.4 1.368-1.4 3.335s1.433 3.869 1.633 4.135c0.201 0.267 2.827 4.318 6.85 6.055 0.957 0.413 1.705 0.659 2.288 0.844 0.962 0.305 1.837 0.262 2.528 0.159 0.771-0.115 2.366-0.968 2.699-1.902s0.333-1.736 0.233-1.902c-0.1-0.167-0.367-0.267-0.768-0.467z" />
      </svg>
    </a>
  );
};
