import React, { useState, useEffect } from 'react';
import { IconBars, IconXmark } from './Icons';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav id="mainNav" className={isShrunk ? 'shrunk' : ''} aria-label="Navegación principal">
      <div className="nav-logo">
        <a href="#hero" onClick={closeMenu} aria-label="Ir al inicio - Amarena Pastelería">
          <picture>
            <source srcSet="/assets/img/amarena-pasteleria-logo.webp" type="image/webp" />
            <img
              src="/assets/img/amarena-pasteleria-logo-opt.png"
              alt="Amarena Pastelería - Pastelería Artesanal en Córdoba"
              width={180}
              height={70}
              decoding="async"
            />
          </picture>
        </a>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks" role="list">
        <li>
          <a href="#servicios" onClick={closeMenu}>
            Servicios
          </a>
        </li>
        <li>
          <a href="#galeria" onClick={closeMenu}>
            Galería
          </a>
        </li>
        <li>
          <a href="#productos" onClick={closeMenu}>
            Productos
          </a>
        </li>
        <li>
          <a href="#zonas-entrega" onClick={closeMenu}>
            Envíos
          </a>
        </li>
        <li>
          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>
        </li>
        <li>
          <a href="#contacto" onClick={closeMenu}>
            Contacto
          </a>
        </li>
      </ul>

      <button
        className="nav-toggle"
        id="navToggle"
        aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        aria-expanded={isMenuOpen}
        aria-controls="navLinks"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <IconXmark /> : <IconBars />}
      </button>
    </nav>
  );
};
