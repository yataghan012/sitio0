export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: string;
  alt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  gridClass: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  alt?: string;
  isCustomAction?: boolean;
  actionType?: 'tartas' | 'more';
}

export interface ModalProductItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answerHtml: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleOrOccasion: string;
  neighborhood: string;
  date: string;
  comment: string;
  rating: number;
}

export interface CoverageZone {
  id: string;
  zoneName: string;
  neighborhoods: string[];
  description: string;
  highlight?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Tortas Personalizadas para Cumpleaños y Bodas',
    description: 'Diseñamos y creamos tortas únicas para cumpleaños, bodas y celebraciones especiales en Córdoba según tu visión y gustos.',
    imageUrl: '/assets/img/torta-personalizada-artesanal-cordoba-sm.webp',
    alt: 'Torta personalizada artesanal en Córdoba'
  },
  {
    id: 's2',
    title: 'Mesa Dulce para Eventos',
    description: 'Armamos mesas dulces completas con variedad de postres artesanales para que tu evento en Córdoba sea inolvidable.',
    imageUrl: '/assets/img/mesa-dulce-artesanal-eventos-cordoba-sm.webp',
    alt: 'Mesa dulce artesanal para eventos en Córdoba'
  },
  {
    id: 's3',
    title: 'Envío a Domicilio en Córdoba Capital',
    description: 'Recibí tus pedidos directamente en tu casa con embalaje especial que preserva la calidad y presentación de cada producto.',
    icon: '📦',
    alt: 'Envío a domicilio en Córdoba Capital'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Torta de Cumpleaños',
    imageUrl: '/assets/img/torta-cumpleanos-personalizada-cordoba.webp',
    alt: 'Torta de cumpleaños artesanal personalizada - Amarena Pastelería Córdoba',
    gridClass: 'g1'
  },
  {
    id: 'g2',
    title: 'Lemon Pie',
    imageUrl: '/assets/img/lemon-pie-artesanal-cordoba.webp',
    alt: 'Lemon Pie artesanal con merengue italiano - Pastelería Córdoba',
    gridClass: 'g2'
  },
  {
    id: 'g3',
    title: 'Hojaldre',
    imageUrl: '/assets/img/hojaldre-artesanal-cordoba.webp',
    alt: 'Hojaldre artesanal - Amarena Pastelería Córdoba',
    gridClass: 'g3'
  },
  {
    id: 'g4',
    title: 'Profiteroles con Crema Pastelera',
    imageUrl: '/assets/img/bombas-de-crema-artesanales-cordoba.webp',
    alt: 'Profiteroles artesanales con crema pastelera - Pastelería Córdoba',
    gridClass: 'g4'
  },
  {
    id: 'g5',
    title: 'Long Cake',
    imageUrl: '/assets/img/long-cake-artesanal-cordoba.webp',
    alt: 'Long Cake artesanal - Amarena Pastelería Córdoba',
    gridClass: 'g5'
  },
  {
    id: 'g6',
    title: 'Rogel',
    imageUrl: '/assets/img/rogel-artesanal-cordoba.webp',
    alt: 'Rogel artesanal con dulce de leche - Pastelería Córdoba',
    gridClass: 'g6'
  },
  {
    id: 'g7',
    title: 'Marquise de Chocolate',
    imageUrl: '/assets/img/marquise-chocolate-cordoba.webp',
    alt: 'Marquise de chocolate con dulce de leche - Amarena Pastelería Córdoba',
    gridClass: 'g7'
  },
  {
    id: 'g8',
    title: 'Torta de Cumpleaños',
    imageUrl: '/assets/img/torta-cumpleanos-artesanal-cordoba.webp',
    alt: 'Torta de cumpleaños artesanal - Pastelería Artesanal Córdoba',
    gridClass: 'g8'
  },
  {
    id: 'g9',
    title: 'Nuestras Especialidades',
    imageUrl: '/assets/img/variedad-de-tortas-artesanales-cordoba.webp',
    alt: 'Especialidades artesanales de Amarena Pastelería Córdoba',
    gridClass: 'g9'
  },
  {
    id: 'g10',
    title: 'Pastelería Temática',
    imageUrl: '/assets/img/torta-tematica-star-wars-cordoba.webp',
    alt: 'Torta temática personalizada Star Wars - Pastelería Córdoba',
    gridClass: 'g10'
  },
  {
    id: 'g11',
    title: 'Tortas de 15 Años',
    imageUrl: '/assets/img/torta-de-15-anos-personalizada-cordoba.webp',
    alt: 'Torta de 15 años personalizada - Amarena Pastelería Córdoba',
    gridClass: 'g11'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    title: 'Tartas Artesanales',
    description: 'Pasta Frola, Lemon Pie, Cabsha, Tarta de Durazno y Naranja — masa casera y frutas frescas',
    imageUrl: '/assets/img/pastafrola-artesanal-cordoba.webp',
    alt: 'Pasta Frola artesanal - Amarena Pastelería Córdoba',
    isCustomAction: true,
    actionType: 'tartas'
  },
  {
    id: 'p2',
    title: 'Torta de Cumpleaños Personalizada',
    description: 'Decoración personalizada · Sabor a elección · Envío a domicilio',
    imageUrl: '/assets/img/torta-cumpleanos-cordoba.webp',
    alt: 'Torta de cumpleaños personalizada - Pastelería Córdoba'
  },
  {
    id: 'p3',
    title: 'Box de Petit Fours Artesanales',
    description: 'Variedad de bocados dulces artesanales premium para regalo o eventos',
    imageUrl: '/assets/img/box-petit-fours-artesanales-cordoba.webp',
    alt: 'Box de Petit Fours artesanales - Amarena Pastelería Córdoba'
  },
  {
    id: 'p4',
    title: 'Pavlova con Frutos Rojos',
    description: 'Mousse ligera con merengue crujiente artesanal y frutos rojos frescos',
    imageUrl: '/assets/img/pavlova-con-frutos-rojos-cordoba.webp',
    alt: 'Pavlova artesanal con frutos rojos - Pastelería Córdoba'
  },
  {
    id: 'p5',
    title: 'Marquise de Chocolate',
    description: 'Base de chocolate semiamargo con dulce de leche, crema y frutos rojos',
    imageUrl: '/assets/img/marquise-chocolate-cordoba.webp',
    alt: 'Marquise de chocolate artesanal - Amarena Pastelería Córdoba'
  },
  {
    id: 'p6',
    title: 'Ver más productos',
    description: '',
    isCustomAction: true,
    actionType: 'more'
  }
];

export const TARTAS_ITEMS: ModalProductItem[] = [
  {
    id: 't1',
    title: 'Lemon Pie',
    description: 'Merengue italiano sobre crema de limón natural y base crocante. Un clásico irresistible.',
    imageUrl: '/assets/img/lemon-pie-con-merengue-cordoba.webp',
    alt: 'Lemon Pie artesanal Córdoba'
  },
  {
    id: 't2',
    title: 'Tarta de Naranja',
    description: 'Crema de naranja fresca con base crocante y decoración de gajos naturales.',
    imageUrl: '/assets/img/tarta-de-naranja-artesanal-cordoba.webp',
    alt: 'Tarta de naranja artesanal Córdoba'
  },
  {
    id: 't3',
    title: 'Cabsha',
    description: 'Intenso chocolate semiamargo y dulce de leche sobre masa sablé artesanal.',
    imageUrl: '/assets/img/tarta-cabsha-artesanal-cordoba.webp',
    alt: 'Tarta Cabsha chocolate dulce de leche Córdoba'
  },
  {
    id: 't4',
    title: 'Tarta de Durazno',
    description: 'Duraznos frescos de estación con crema pastelera artesanal sobre base crujiente.',
    imageUrl: '/assets/img/tarta-de-durazno-artesanal-cordoba.webp',
    alt: 'Tarta de durazno artesanal Córdoba'
  }
];

export const MORE_ITEMS: ModalProductItem[] = [
  {
    id: 'm1',
    title: 'Cremocoas',
    description: 'Bocados de chocolate rellenos con una suave crema, un clásico irresistible de la pastelería artesanal',
    imageUrl: '/assets/img/cremocoas-artesanales-cordoba.webp',
    alt: 'Cremocoas artesanales Córdoba'
  },
  {
    id: 'm2',
    title: 'Tres Leches',
    description: 'Bizcocho esponjoso embebido en tres tipos de leche y decorado con crema batida artesanal',
    imageUrl: '/assets/img/postre-tres-leches-artesanal-cordoba.webp',
    alt: 'Tres Leches artesanal Córdoba'
  },
  {
    id: 'm3',
    title: 'Tortas Infantiles Personalizadas',
    description: 'Diseños mágicos y coloridos para los más pequeños, con sus personajes favoritos y decoración única',
    imageUrl: '/assets/img/tortas-infantiles-personalizadas-cordoba.webp',
    alt: 'Tortas infantiles personalizadas Córdoba'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: '¿Con cuánta anticipación debo pedir una torta personalizada en Córdoba?',
    answerHtml: 'Recomendamos pedir con al menos <strong>5 a 7 días de anticipación</strong>. Para bodas y eventos grandes, 2 a 3 semanas. Consultanos por WhatsApp al (351) 248-4288 para verificar disponibilidad.'
  },
  {
    id: 'f2',
    question: '¿Hacen envíos a domicilio en Córdoba Capital?',
    answerHtml: 'Sí, realizamos <strong>envíos a domicilio en Córdoba Capital</strong> con embalaje especial que preserva la calidad de cada producto. Consultá disponibilidad para tu zona por WhatsApp.'
  },
  {
    id: 'f3',
    question: '¿Dónde está ubicada Amarena Pastelería en Córdoba?',
    answerHtml: 'Estamos en el <strong>Barrio Empalme, Córdoba Capital</strong>. Atendemos lunes a sábados de 9:00 a 19:00hs. También podés contactarnos por WhatsApp al (351) 248-4288.'
  },
  {
    id: 'f4',
    question: '¿Cuánto cuesta una torta de cumpleaños personalizada en Córdoba?',
    answerHtml: 'El precio varía según el <strong>tamaño, diseño y cantidad de porciones</strong>. Contactanos por WhatsApp con los detalles de tu evento y te damos presupuesto sin costo ni compromiso.'
  },
  {
    id: 'f5',
    question: '¿Hacen mesa dulce para eventos y bodas en Córdoba?',
    answerHtml: 'Sí, armamos <strong>mesas dulces completas para todo tipo de eventos</strong>: casamientos, cumpleaños de 15, fiestas infantiles y corporativos. Consultanos con anticipación para fechas especiales.'
  }
];

export const CONTACT_INFO = {
  address: 'B° Empalme, Córdoba, Argentina',
  phone: '(351) 248-4288',
  phoneRaw: '+543512484288',
  whatsappRaw: '5493512484288',
  email: 'marialorenavivas@gmail.com',
  hours: 'Lun – Sáb · 9:00 a 19:00hs',
  instagramUrl: 'https://www.instagram.com/amarenacba21/',
  instagramHandle: '@amarenacba21'
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Mariana López',
    roleOrOccasion: 'Torta de Cumpleaños Personalizada',
    neighborhood: 'Nueva Córdoba',
    date: '2026-03-12',
    comment: 'Encargué una torta temática para el cumple de mi hija y quedó espectacular. No solo era hermosa visualmente, sino que el bizcochuelo estaba súper húmedo y los rellenos riquísimos. Llegó en perfecto estado.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Gonzalo & Sofía',
    roleOrOccasion: 'Mesa Dulce para Casamiento',
    neighborhood: 'Villa Belgrano',
    date: '2026-02-20',
    comment: 'La mesa dulce para nuestro casamiento fue un éxito rotundo. Los petit fours, la pavlova con frutos rojos y el rogel se llevaron todos los elogios de los invitados. Atención impecable de principio a fin.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Valeria Rossi',
    roleOrOccasion: 'Torta de 15 Años',
    neighborhood: 'Cerro de las Rosas',
    date: '2026-01-28',
    comment: 'Lorena captó exactamente el estilo elegante que quería mi sobrina para sus 15. Los detalles en las flores y el merengue fueron de pastelería de primer nivel. Muy recomendada en Córdoba.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Esteban Carrizo',
    roleOrOccasion: 'Lemon Pie y Tartas de Cumpleaños',
    neighborhood: 'General Paz',
    date: '2026-04-05',
    comment: 'El mejor Lemon Pie de Córdoba sin dudas: merengue italiano en su punto justo y crema de limón bien natural. La entrega en horario convenido y embalaje impecable.',
    rating: 5,
  },
];

export const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'z1',
    zoneName: 'Zona Centro y Nueva Córdoba',
    neighborhoods: ['Nueva Córdoba', 'Centro', 'Güemes', 'Observatorio'],
    description: 'Envíos diarios programados a domicilios particulares, oficinas y salones de eventos céntricos.',
    highlight: 'Entregas rápidas y puntuales',
  },
  {
    id: 'z2',
    zoneName: 'Zona Norte y Noroeste',
    neighborhoods: ['Cerro de las Rosas', 'Villa Belgrano', 'Urca', 'Argüello', 'Tablada Park'],
    description: 'Cobertura especial para salones de fiestas, residencias y quintas con transporte refrigerado.',
    highlight: 'Ideal para bodas y cumpleaños de 15',
  },
  {
    id: 'z3',
    zoneName: 'Zona Este y Sudeste',
    neighborhoods: ['General Paz', 'Cofico', 'Barrio Empalme', 'San Vicente', 'Jardín'],
    description: 'Zona de origen y alrededores inmediatos con opción de retiro en taller o envío a domicilio.',
    highlight: 'Retiro en taller o entrega a domicilio',
  },
  {
    id: 'z4',
    zoneName: 'Zona Sur y Nuevas Urbanizaciones',
    neighborhoods: ['Manantiales', 'Tejas del Sur', 'Barrio Jardín', 'Inaudi', 'Villa Revol'],
    description: 'Llegamos a barrios cerrados y urbanizaciones del sur de Córdoba para que tu festejo tenga la mejor pastelería.',
    highlight: 'Atención personalizada para reuniones familiares',
  },
];

