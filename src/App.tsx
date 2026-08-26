import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingSystem from './components/BookingSystem';
import CanchasSection from './components/CanchasSection';
import Instalaciones from './components/Instalaciones';
import Servicios from './components/Servicios';
import Actividades from './components/Actividades';
import Ubicacion from './components/Ubicacion';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileStickyBar from './components/MobileStickyBar';

export default function App() {
  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToBooking = () => {
    navigateToSection('reservas');
  };

  useEffect(() => {
    // Dynamic Dark/Light Theme Support based on system preferences, but default to light for main UI
    // while keeping the header, hero, and facilities premium dark blocks for high sports atmosphere.
    document.documentElement.classList.add('light');
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Header
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToSection={navigateToSection}
      />

      {/* 2. Hero Presentation Block */}
      <Hero
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToExplore={() => navigateToSection('canchas')}
      />

      {/* 3. Main Multi-step Booking Scheduler */}
      <BookingSystem />

      {/* 4. Asymmetrical Courts Exhibition */}
      <CanchasSection onNavigateToBooking={handleNavigateToBooking} />

      {/* 5. Editorial Architectural Installations */}
      <Instalaciones />

      {/* 6. Grid Amenities & Features */}
      <Servicios />

      {/* 7. Tournaments, Clinics & Events */}
      <Actividades />

      {/* 8. Geolocation and Contact Center */}
      <Ubicacion />

      {/* 9. Structured Footer & Final CTA */}
      <Footer
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToSection={navigateToSection}
      />

      {/* 10. Non-obtrusive WhatsApp Button */}
      <WhatsAppButton />

      {/* 11. Smartphone Sticky Quick CTA Bar */}
      <MobileStickyBar onNavigateToBooking={handleNavigateToBooking} />
    </div>
  );
}
