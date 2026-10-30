import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Products } from './components/Products';
import { CoverageAreas } from './components/CoverageAreas';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

// Code-splitting modals to keep initial bundle ultra-lean
const TartasModal = React.lazy(() =>
  import('./components/TartasModal').then((m) => ({ default: m.TartasModal }))
);
const MoreProductsModal = React.lazy(() =>
  import('./components/MoreProductsModal').then((m) => ({ default: m.MoreProductsModal }))
);
const LightboxModal = React.lazy(() =>
  import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal }))
);

export const App: React.FC = () => {
  const [isTartasOpen, setIsTartasOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    imageUrl: string;
    alt: string;
    title: string;
  } | null>(null);

  const handleOpenImage = (item: { imageUrl: string; alt: string; title: string }) => {
    setLightboxImage(item);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Gallery onSelectImage={handleOpenImage} />
        <Products
          onOpenTartasModal={() => setIsTartasOpen(true)}
          onOpenMoreModal={() => setIsMoreOpen(true)}
          onSelectImage={handleOpenImage}
        />
        <CoverageAreas />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />

      {/* Lazy Loaded Modals */}
      <React.Suspense fallback={null}>
        {isTartasOpen && (
          <TartasModal
            isOpen={isTartasOpen}
            onClose={() => setIsTartasOpen(false)}
            onSelectImage={handleOpenImage}
          />
        )}

        {isMoreOpen && (
          <MoreProductsModal
            isOpen={isMoreOpen}
            onClose={() => setIsMoreOpen(false)}
            onSelectImage={handleOpenImage}
          />
        )}

        {lightboxImage && (
          <LightboxModal
            image={lightboxImage}
            onClose={handleCloseLightbox}
          />
        )}
      </React.Suspense>
    </div>
  );
};

export default App;
