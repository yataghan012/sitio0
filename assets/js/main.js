/**
 * main.js — Amarena Pastelería
 *
 * PERFORMANCE NOTES:
 * - Este script usa defer en el HTML → se ejecuta después del DOM parsing
 * - No usa document.write() ni bloquea el render
 * - IntersectionObserver en lugar de scroll listeners → mejor INP
 *
 * INP TARGET: < 200ms (Core Web Vital 2024)
 * - Evitar operaciones síncronas pesadas en event handlers
 * - Preferir requestAnimationFrame para cambios visuales
 */

/*
 * FONT LOADING — Elimina FOUT en el hero title
 *
 * document.fonts.ready: Promise que resuelve cuando TODAS las
 * webfonts declaradas en el CSS terminaron de cargar (o fallaron).
 *
 * Flujo:
 * 1. HTML carga con class="no-js" → .hero-title opacity:0
 * 2. JS quita "no-js" → ya no es fallback
 * 3. fonts.ready resuelve → agrega "fonts-loaded"
 * 4. CSS transition hace fade-in suave con la fuente correcta
 *
 * display=block en Google Fonts URL:
 * El browser mantiene el espacio reservado (invisible, no layout shift)
 * durante la descarga, en lugar de mostrar el fallback (swap).
 * Combinado con opacity:0 = el usuario nunca ve texto con fuente incorrecta.
 */
document.documentElement.classList.remove('no-js');

document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
}).catch(() => {
  // Si las fuentes fallan (offline, timeout), mostrar el texto igual
  document.documentElement.classList.add('fonts-loaded');
});

'use strict'; // Modo estricto: previene errores silenciosos

/* ─────────────────────────────────────────────────────────────
   HELPER: Tracking de eventos GA4
   
   Si GA4 no está instalado (window.gtag undefined), el helper
   falla silenciosamente sin romper el sitio.
   
   EVENTOS A CONFIGURAR EN GA4:
   - whatsapp_click → conversión principal
   - form_submit   → conversión secundaria
   - tel_click     → conversión de llamada
   ───────────────────────────────────────────────────────────── */
function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  // Debug en desarrollo: descomentar para ver eventos en consola
  // console.log('[GA4 Event]', eventName, params);
}

/* ─────────────────────────────────────────────────────────────
   NAV — Shrink on scroll
   
   Usa scroll event con throttle implícito via CSS transition.
   classList.toggle es más performante que cambiar style directamente.
   ───────────────────────────────────────────────────────────── */
const nav = document.getElementById('mainNav');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shrunk', window.scrollY > 60);
  }, { passive: true }); // passive: true → mejora performance del scroll
}

/* ─────────────────────────────────────────────────────────────
   MOBILE NAV TOGGLE
   
   aria-expanded: CRÍTICO para accesibilidad.
   Screen readers anuncian si el menú está abierto o cerrado.
   ───────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  const toggleIcon = navToggle.querySelector('i');

  navToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');

    // Actualizar aria-expanded (requerido para accesibilidad)
    navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

    // Cambiar ícono hamburger ↔ X
    toggleIcon.classList.toggle('fa-bars', !isActive);
    toggleIcon.classList.toggle('fa-xmark', isActive);

    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Cerrar menú al hacer clic en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      toggleIcon.classList.add('fa-bars');
      toggleIcon.classList.remove('fa-xmark');
      document.body.style.overflow = '';
    });
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      toggleIcon.classList.add('fa-bars');
      toggleIcon.classList.remove('fa-xmark');
      document.body.style.overflow = '';
      navToggle.focus(); // Devolver el foco al botón
    }
  });
}

/* ─────────────────────────────────────────────────────────────
   HELPER: Gestión de Modales
   
   Centraliza la lógica de abrir/cerrar modales para:
   - Consistencia entre todos los modales
   - Manejo correcto de focus (accesibilidad)
   - Soporte para atributo [hidden] HTML nativo
   - Tecla Escape para cerrar
   ───────────────────────────────────────────────────────────── */
let lastFocusedElement = null;

function openModal(modal) {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.removeAttribute('hidden');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Mover el foco dentro del modal (accesibilidad)
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) {
    // Pequeño delay para que el display: flex se aplique antes del focus
    requestAnimationFrame(() => focusable.focus());
  }
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';

  // Devolver el foco al elemento que abrió el modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* ─────────────────────────────────────────────────────────────
   MODAL — Más productos
   ───────────────────────────────────────────────────────────── */
const moreModal = document.getElementById('moreModal');
const moreBtn = document.getElementById('moreBtn');
const modalClose = document.getElementById('modalClose');

if (moreModal && moreBtn) {
  // Click con mouse
  moreBtn.addEventListener('click', () => openModal(moreModal));

  // Activar con teclado (Enter o Espacio) — accesibilidad para role="button"
  moreBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(moreModal);
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => closeModal(moreModal));
  }

  // Cerrar haciendo clic fuera del modal-box
  moreModal.addEventListener('click', (e) => {
    if (e.target === moreModal) closeModal(moreModal);
  });
}

/* ─────────────────────────────────────────────────────────────
   MODAL — Tartas
   ───────────────────────────────────────────────────────────── */
const tartasModal = document.getElementById('tartasModal');
const tartasCard = document.getElementById('tartasCard');
const tartasModalClose = document.getElementById('tartasModalClose');

if (tartasModal && tartasCard) {
  tartasCard.addEventListener('click', () => openModal(tartasModal));

  tartasCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(tartasModal);
    }
  });

  if (tartasModalClose) {
    tartasModalClose.addEventListener('click', () => closeModal(tartasModal));
  }

  tartasModal.addEventListener('click', (e) => {
    if (e.target === tartasModal) closeModal(tartasModal);
  });
}

/* ─────────────────────────────────────────────────────────────
   ESCAPE KEY — Cerrar cualquier modal abierto
   ───────────────────────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal-overlay.active, .lightbox-overlay.active');
    openModals.forEach(m => {
      if (m.id === 'lightbox') {
        closeLightbox();
      } else {
        closeModal(m);
      }
    });
  }
});

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX — Galería
   ───────────────────────────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

if (lightbox) {
  document.querySelectorAll('.gallery-item, .modal-item-icon').forEach(item => {
    const targetDiv = item.classList.contains('gallery-item') ? item.querySelector('.g-bg') : item;
    if (!targetDiv) return;

    const bgImage = targetDiv.style.backgroundImage;
    if (!bgImage || !bgImage.includes('url')) return;

    item.style.cursor = 'pointer';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    const openLightbox = () => {
      const imageUrl = bgImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
      // Tomar el alt del aria-label del contenedor
      const altText = targetDiv.getAttribute('aria-label') || 'Creación artesanal de Amarena Pastelería Córdoba';
      lightboxImg.src = imageUrl;
      lightboxImg.alt = altText;
      lastFocusedElement = document.activeElement;
      lightbox.removeAttribute('hidden');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => lightboxClose.focus());
    };

    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — Animaciones de entrada
   
   IntersectionObserver: más eficiente que scroll listeners.
   - No dispara en cada pixel de scroll (throttling automático)
   - Mejor INP (Interaction to Next Paint)
   - Se desconecta (unobserve) después de animar → no sigue escuchando
   
   threshold: 0.12 → el elemento debe estar 12% visible para animar.
   ───────────────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

if (reveals.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay escalonado para efecto cascada en grupos de elementos
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target); // Desconectar para performance
      }
    });
  }, {
    threshold: 0.12,
    // rootMargin: empieza a animar 50px antes de que sea visible
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: mostrar todos sin animación si IntersectionObserver no está disponible
  reveals.forEach(el => el.classList.add('visible'));
}

/* ─────────────────────────────────────────────────────────────
   ANALYTICS — Tracking de conversiones
   
   🔴 CRÍTICO para SEO: los eventos de conversión le dicen a
   Google Analytics qué acciones generan valor real.
   
   Sin tracking de conversiones, no se puede medir:
   - Qué fuente de tráfico genera más consultas
   - Qué sección del sitio genera más clics en WhatsApp
   - Si el formulario se está enviando correctamente
   
   CONFIGURAR EN GA4:
   - whatsapp_click → marcar como conversión
   - form_submit → marcar como conversión
   - tel_click → marcar como conversión
   ───────────────────────────────────────────────────────────── */

// Tracking: clic en WhatsApp flotante
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    trackEvent('whatsapp_click', {
      event_category: 'conversión',
      event_label: 'WhatsApp flotante',
      value: 1
    });
  });
}

// Tracking: todos los links de WhatsApp (footer, etc.)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  if (link.id === 'whatsappBtn') return; // Ya trackeado arriba
  link.addEventListener('click', () => {
    trackEvent('whatsapp_click', {
      event_category: 'conversión',
      event_label: 'WhatsApp general'
    });
  });
});

// Tracking: clic en teléfono
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('tel_click', {
      event_category: 'conversión',
      event_label: 'Clic en teléfono'
    });
  });
});

// Tracking: envío de formulario
const contactForm = document.querySelector('form[name="contacto-amarena"]');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    trackEvent('form_submit', {
      event_category: 'conversión',
      event_label: 'Formulario de contacto'
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   REDUCED MOTION — Accesibilidad
   
   Algunos usuarios configuran "Prefer Reduced Motion" en su OS
   por condiciones vestibulares o fotosensibilidad.
   Respetar esta preferencia es accesibilidad + buena UX.
   ───────────────────────────────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Mostrar elementos inmediatamente sin animación
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  // Desactivar animaciones CSS via clase global
  document.documentElement.classList.add('no-motion');
}
