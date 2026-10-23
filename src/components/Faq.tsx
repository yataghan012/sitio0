import React from 'react';
import { FAQS } from '../data/bakeryData';

export const Faq: React.FC = () => {
  return (
    <section id="faq" aria-labelledby="faq-title" className="faq-section">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Preguntas frecuentes</p>
        <h2 className="section-title" id="faq-title">
          Preguntas Frecuentes sobre <em>Tortas y Pedidos en Córdoba</em>
        </h2>
        <p className="section-desc">
          Las respuestas a las consultas más habituales de nuestros clientes sobre anticipación de pedidos, cálculo de porciones y envíos a domicilio en Córdoba Capital.
        </p>
      </div>

      <div className="faq-grid">
        {FAQS.map((faq) => (
          <details
            key={faq.id}
            className="faq-item"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary itemProp="name">{faq.question}</summary>
            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div
                itemProp="text"
                dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
              />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
