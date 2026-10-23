import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { CoverageAreas } from './components/CoverageAreas';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { TartasModal } from './components/TartasModal';
import { MoreProductsModal } from './components/MoreProductsModal';
import { LightboxModal } from './components/LightboxModal';

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
        <Testimonials />
        <CoverageAreas />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />

      {/* Modals */}
      <TartasModal
        isOpen={isTartasOpen}
        onClose={() => setIsTartasOpen(false)}
        onSelectImage={handleOpenImage}
      />

      <MoreProductsModal
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onSelectImage={handleOpenImage}
      />

      <LightboxModal
        image={lightboxImage}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default App;
