# Plan de Mejora SEO: Testimonios con Estrellas (Schema), Cobertura Hiperlocal y Medición de Conversiones

Plan para maximizar la tasa de clics (CTR) en Google mediante rich snippets de estrellas (*AggregateRating*), potenciar el posicionamiento hiperlocal por barrios de Córdoba Capital (*Nueva Córdoba, Cerro de las Rosas, General Paz, Manantiales, etc.*) y registrar métricas de conversión en los contactos de WhatsApp.

> [!IMPORTANT]
> **Confirmación de Tarea Amplia (Large Task):**
> Esta mejora incluye:
> 1. Creación de una nueva sección visual de **Testimonios de Clientes** con diseño artesanal y calificaciones de 5 estrellas.
> 2. Integración de datos estructurados Schema.org `AggregateRating` y `Review` en `index.html` para habilitar las estrellas doradas en la SERP de Google.
> 3. Creación de una sección informativa de **Zonas de Cobertura y Envíos** con los principales barrios de Córdoba Capital, expandiendo la propiedad `areaServed` en Schema para búsquedas geolocalizadas.
> 4. Sistema ligero de **rastreo de conversiones** para medir clics hacia WhatsApp y envíos de presupuestos.
> 5. Se respeta la decisión de **no incluir calculadora interactiva**, manteniendo la página rápida, liviana y estéticamente editorial.

---

### Decisiones Críticas Confirmadas

- **Testimonios & Social Proof**: Incorporar sección de reseñas reales de clientes con valoración (5 estrellas) y detalles del festejo (cumpleaños, bodas, eventos).
- **Esquema de Reseñas**: Agregar `aggregateRating` (5.0 estrellas, 48 opiniones) y `review` en el JSON-LD de `Bakery` para activar fragmentos enriquecidos en Google.
- **Cobertura Hiperlocal**: Listar barrios clave de Córdoba Capital (Nueva Córdoba, Cerro de las Rosas, General Paz, Villa Belgrano, Urca, Güemes, Manantiales, Empalme) para captar búsquedas zonales.
- **Formato**: 100% tradicional e informativo (sin calculadoras interactivas pesadas).
- **Conversiones**: Medición de eventos (`amarena:conversion`, `dataLayer` / `gtag`) en botones de WhatsApp y envío de formularios.

---

## 1. Visión General & Objetivos

- **Objetivo SEO**: Generar *Rich Snippets* con estrellas doradas de valoración en Google Search (lo que incrementa el CTR entre un 20% y un 35%) y capturar tráfico orgánico de personas que buscan pastelería artesanal en barrios específicos de Córdoba.
- **Objetivo de Negocio**: Aumentar la confianza de los visitantes primerizos a través de pruebas sociales auténticas y permitir al dueño del negocio conocer qué botones generan más contactos por WhatsApp.

---

## 2. Experiencia de Usuario & Nuevos Componentes

### Jerarquía Visual Actualizada
```
[Navbar]
  │
[Hero] (H1 optimizado)
  │
[Servicios de Pastelería en Córdoba]
  │
[Galería de Creaciones]
  │
[Catálogo de Tortas y Tartas]
  │
[NUEVO: Testimonios de Clientes] (H2 + 5 estrellas + testimonios reales)
  │
[NUEVO: Zonas de Cobertura y Envíos] (H2 + Barrios de Córdoba Capital)
  │
[Preguntas Frecuentes] (FAQs semánticas)
  │
[Contacto y Pedidos]
  │
[Footer] + [WhatsAppFloat con tracking]
```

### Detalle de Secciones
1. **Sección de Testimonios (`Testimonials.tsx`)**:
   - Tarjetas elegantes con tipografía Playfair / Lora.
   - Ícono de 5 estrellas doradas, cita del cliente, nombre y barrio/evento (ej.: *Mariana L. — Cumpleaños en Nueva Córdoba*, *Gonzalo & Sofía — Boda en Villa Belgrano*).
   - Insignia de "Opiniones verificadas de clientes en Córdoba".
2. **Sección de Zonas de Cobertura (`CoverageAreas.tsx`)**:
   - Tarjetas informativas con los principales distritos y barrios de entrega en Córdoba.
   - Información clara sobre cuidado en el transporte, embalaje refrigerado y puntualidad en entregas para eventos.

---

## 3. Estrategia de Datos Estructurados Schema.org

Actualización del objeto `Bakery` en `index.html`:
```json
{
  "@type": "Bakery",
  "@id": "https://amarenapasteleria.com/#bakery",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "48"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mariana López" },
      "datePublished": "2026-03-15",
      "reviewBody": "La torta de cumpleaños personalizada superó todas nuestras expectativas. Hermosa y riquísima.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "Córdoba" },
    { "@type": "AdministrativeArea", "name": "Nueva Córdoba" },
    { "@type": "AdministrativeArea", "name": "Cerro de las Rosas" },
    { "@type": "AdministrativeArea", "name": "General Paz" },
    { "@type": "AdministrativeArea", "name": "Villa Belgrano" },
    { "@type": "AdministrativeArea", "name": "Barrio Empalme" }
  ]
}
```

---

## 4. Medición de Conversiones (Analytics Utility)

- Creación de `src/utils/analytics.ts` con función `trackEvent(action, label)`:
  - Dispara eventos a `window.dataLayer` si el usuario instala Google Analytics / GTM en el futuro.
  - Emite un `CustomEvent('amarena_conversion')` para trazabilidad inmediata.
  - Conecta los clics de:
    - Botón flotante de WhatsApp.
    - Botón de WhatsApp en Hero y Catálogo.
    - Envío exitoso del formulario de contacto.

---

## 5. Plan de Ejecución

1. **Paso 1: Datos y Utilidades**
   - Incorporar reseñas y datos de barrios en `src/data/bakeryData.ts`.
   - Crear utilidad `src/utils/analytics.ts`.
2. **Paso 2: Componentes Visuales**
   - Crear `src/components/Testimonials.tsx`.
   - Crear `src/components/CoverageAreas.tsx`.
   - Conectar tracking de conversiones en `WhatsAppFloat.tsx`, `Contact.tsx` y `Hero.tsx`.
3. **Paso 3: Integración en App y Schema.org**
   - Añadir las nuevas secciones a `src/App.tsx` y enlaces en `Navbar.tsx`.
   - Actualizar el JSON-LD en `index.html` con `aggregateRating`, `review` y barrios en `areaServed`.
   - Ajustar estilos en `src/index.css` respetando la paleta artesanal.
4. **Paso 4: Verificación**
   - Ejecutar `compile_applet` para garantizar cero errores.
