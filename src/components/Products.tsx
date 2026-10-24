import React from 'react';
import { PRODUCTS, ProductItem } from '../data/bakeryData';

interface ProductsProps {
  onOpenTartasModal: () => void;
  onOpenMoreModal: () => void;
  onSelectImage: (item: { imageUrl: string; alt: string; title: string }) => void;
}

export const Products: React.FC<ProductsProps> = ({
  onOpenTartasModal,
  onOpenMoreModal,
  onSelectImage,
}) => {
  const handleProductClick = (product: ProductItem) => {
    if (product.actionType === 'tartas') {
      onOpenTartasModal();
    } else if (product.actionType === 'more') {
      onOpenMoreModal();
    } else if (product.imageUrl) {
      onSelectImage({
        imageUrl: product.imageUrl,
        alt: product.alt || product.title,
        title: product.title,
      });
    }
  };

  return (
    <section id="productos" aria-labelledby="productos-title">
      <div>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="section-label">Sabores artesanales</p>
        <h2 className="section-title" id="productos-title">
          Catálogo de <em>Tortas y Tartas Artesanales</em>
        </h2>
        <p className="section-desc">
          Creaciones dulces elaboradas a mano con ingredientes selectos en Córdoba Capital. Consultá por pedidos personalizados y mesas dulces.
        </p>
      </div>

      <div className="productos-grid">
        {PRODUCTS.map((product) => {
          if (product.actionType === 'more') {
            return (
              <div
                key={product.id}
                className="producto-card more-card"
                id="moreBtn"
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="Ver más productos de pastelería artesanal en Córdoba"
                onClick={onOpenMoreModal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenMoreModal();
                  }
                }}
              >
                <div className="more-plus" aria-hidden="true">+</div>
                <span>Ver más productos</span>
              </div>
            );
          }

          return (
            <article
              key={product.id}
              className="producto-card"
              role="button"
              tabIndex={0}
              aria-haspopup={product.actionType === 'tartas' ? 'dialog' : undefined}
              aria-label={`Ver detalle de ${product.title}`}
              itemScope
              itemType="https://schema.org/Product"
              onClick={() => handleProductClick(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProductClick(product);
                }
              }}
            >
              {product.imageUrl && (
                <div className="producto-img">
                  <img
                    src={product.imageUrl}
                    alt={product.alt || `${product.title} en Córdoba`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={260}
                    itemProp="image"
                    className="producto-img-element"
                  />
                </div>
              )}
              <div className="producto-body">
                <h3 itemProp="name">{product.title}</h3>
                <p itemProp="description">{product.description}</p>
                {product.actionType === 'tartas' && (
                  <span className="producto-price" style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Ver Variedades ✦
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
