/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, Sparkles, Phone, MapPin, Clock, Instagram, 
  Accessibility, Car, UserCheck, Users, Coffee, Smile, 
  Check, Star, Mail, Calendar, CheckCircle2, ChevronRight, 
  Menu, X, ArrowRight, MessageSquare, ExternalLink,
  Award, Shield, Heart, Info
} from 'lucide-react';

import { 
  SERVICES_DATA, 
  TESTIMONIALS, 
  GALLERY_IMAGES, 
  GOOD_TO_KNOW, 
  CONTACT_INFO,
  ServiceItem
} from './data';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'barbering' | 'spa'>('barbering');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Handle transparent header transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon mapping for Good to Know section
  const iconMap: Record<string, any> = {
    Accessibility: Accessibility,
    Car: Car,
    UserCheck: UserCheck,
    Users: Users,
    Coffee: Coffee,
    Smile: Smile,
  };

  // Toggle service selection for estimator
  const toggleService = (service: ServiceItem) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Clear all selected services
  const clearSelection = () => {
    setSelectedServices([]);
  };

  // Calculate total price and duration
  const totalCost = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => {
    const mins = parseInt(service.duration);
    return sum + (isNaN(mins) ? 0 : mins);
  }, 0);

  // Generate dynamic WhatsApp booking message link
  const getWhatsAppLink = (customOnly = false) => {
    let text = '';
    
    if (customOnly || selectedServices.length === 0) {
      text = `Hi Azzi Lounge, I'd like to book an appointment.`;
    } else {
      text = `Hi Azzi Lounge, I'd like to book a custom package containing:\n\n`;
      selectedServices.forEach(s => {
        text += `• ${s.name} (KES ${s.price.toLocaleString()})\n`;
      });
      text += `\n💵 Total Est: KES ${totalCost.toLocaleString()}`;
      text += `\n⏱️ Total Est. Time: ${totalDuration} mins`;
      
      if (bookingName) text += `\n👤 Client Name: ${bookingName}`;
      if (bookingDate) text += `\n📅 Date: ${bookingDate}`;
      if (bookingTime) text += `\n🕒 Preferred Time: ${bookingTime}`;
      
      text += `\n\nPlease confirm availability!`;
    }
    
    return `https://wa.me/254716058500?text=${encodeURIComponent(text)}`;
  };

  // Scroll smoothly to section
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-gold-500 selection:text-neutral-950 font-sans">
      
      {/* HEADER & NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-md bg-neutral-950/90 border-b border-neutral-900 shadow-xl py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Branding */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group cursor-pointer"
              id="header_logo"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Scissors className="w-5 h-5 text-neutral-950 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-wider text-base sm:text-lg text-white group-hover:text-gold-400 transition-colors duration-300 leading-tight">
                  AZZI LOUNGE
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-gold-500 font-medium">
                  BARBER & SPA
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors duration-200">About</button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors duration-200">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors duration-200">Gallery</button>
              <button onClick={() => scrollToSection('good-to-know')} className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors duration-200">Good to Know</button>
              <button onClick={() => scrollToSection('location')} className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors duration-200">Location</button>
            </nav>

            {/* Book Appointment CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="text-sm font-semibold text-neutral-300 hover:text-gold-400 flex items-center gap-1.5 px-3 py-1.5 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                {CONTACT_INFO.phone}
              </a>
              <button 
                onClick={() => scrollToSection('booking-estimator')}
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-neutral-950 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-gold-500/10 active:scale-95"
              >
                Book Package
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-gold-400 focus:outline-none transition-colors"
              aria-label="Toggle menu"
              id="mobile_menu_toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-neutral-950/95 border-b border-neutral-900 overflow-hidden backdrop-blur-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  Services Grid
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  Ambiance Gallery
                </button>
                <button 
                  onClick={() => scrollToSection('good-to-know')} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  Good to Know
                </button>
                <button 
                  onClick={() => scrollToSection('location')} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  Hours & Location
                </button>
                
                <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3 px-3">
                  <a 
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="flex items-center justify-center gap-2 text-neutral-300 hover:text-gold-400 font-semibold py-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold-400" />
                    Call: {CONTACT_INFO.phone}
                  </a>
                  <button 
                    onClick={() => scrollToSection('booking-estimator')}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-bold py-2.5 rounded-full text-center text-sm shadow-md"
                  >
                    Create Custom Package
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" id="hero">
        {/* Background with Moody Overlays (Plain Gray Placeholder) */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className="text-neutral-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">[Premium Barbershop Interior Background Placeholder]</span>
          </div>
          {/* Gradients to blend background into layout */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/60" />
          {/* Subtle gold glowing orb background */}
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gold-600/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center">
          
          {/* Small Crown Logo Accent */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-950/60 border border-gold-500/20 text-gold-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm shadow-inner"
          >
            <span className="text-base sm:text-lg">👑</span>
            Nakuru's Premier Grooming Lounge
          </motion.div>

          {/* Business Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-[1.1] text-shadow"
            id="hero_title"
          >
            AZZI LOUNGE <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent italic drop-shadow-sm font-extrabold">
              BARBERSHOP & SPA
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl md:text-3xl text-neutral-300 font-light tracking-wide max-w-3xl mb-12 font-display"
          >
            "More Than a Cut — <span className="text-gold-400 font-medium">It's a Vibe</span>."
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none justify-center px-4"
          >
            {/* Primary Action: Call to Book */}
            <a 
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:via-gold-300 hover:to-gold-400 text-neutral-950 font-bold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-gold-500/20 hover:shadow-gold-500/30 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              id="hero_cta_call"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" />
              Call to Book: {CONTACT_INFO.phone}
            </a>

            {/* Secondary Action: Book via WhatsApp */}
            <a 
              href={getWhatsAppLink(true)}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-emerald-600/10 hover:shadow-emerald-600/20 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              id="hero_cta_whatsapp"
            >
              <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              Book via WhatsApp
            </a>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 mt-20 pt-10 border-t border-neutral-900 w-full max-w-4xl text-left"
          >
            <div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">8 PM</p>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider">Closes Daily</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">18+</p>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider">Signature Services</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">Nakuru</p>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider">Oginga Odinga Avenue</p>
            </div>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <button 
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 hover:text-gold-400 text-neutral-500 transition-colors duration-300 hidden sm:block animate-bounce focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center p-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" />
            </div>
          </button>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Custom Visual Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
              {/* Decorative light wash */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group hover:border-gold-500/30 transition-all duration-300">
                  <div className="w-full h-56 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs text-neutral-400 font-semibold font-display">Luxury Reception & Lounge</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1.5 uppercase tracking-wider">[Image Placeholder]</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group hover:border-gold-500/30 transition-all duration-300 p-6 bg-neutral-900/40 backdrop-blur-sm text-center">
                  <Award className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                  <h4 className="font-display font-semibold text-white">Elite Salon</h4>
                  <p className="text-xs text-neutral-400 mt-1">Impeccable standards of hygiene & hospitality</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group hover:border-gold-500/30 transition-all duration-300 p-6 bg-neutral-900/40 backdrop-blur-sm text-center">
                  <Shield className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                  <h4 className="font-display font-semibold text-white">Safe & Secure</h4>
                  <p className="text-xs text-neutral-400 mt-1">Secure parking and 24/7 guarded premises</p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group hover:border-gold-500/30 transition-all duration-300">
                  <div className="w-full h-56 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs text-neutral-400 font-semibold font-display">Premium Styling Lounge</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1.5 uppercase tracking-wider">[Image Placeholder]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: About Content */}
            <div className="lg:col-span-7 space-y-8" id="about_content">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Welcome to Azzi Lounge</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                  Nakuru’s Ultimate <br />
                  <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Grooming Sanctuary</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-gold-400 to-transparent rounded-full mt-4" />
              </div>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                Azzi Lounge Barbers & Spa offers professional haircuts, beard styling, hair washing, manicure, pedicure, facial treatments and massage therapy — more than a cut, it's an experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold-400">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">Elite Barbering</h3>
                    <p className="text-sm text-neutral-400 mt-1">From classic skin-fades to expert curly hair trims and conditioning treatments.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">Luxury Spa Care</h3>
                    <p className="text-sm text-neutral-400 mt-1">Rejuvenating pedicures, facials, and deep therapeutic body scrubs and massages.</p>
                  </div>
                </div>
              </div>

              {/* Founder/Director Card Highlight */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gold-500">Director & Founder</p>
                  <h4 className="font-display font-bold text-white text-lg mt-0.5">Aziz Farah</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">"Providing Nakuru with the gold standard of personal care and grooming vibes."</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`tel:${CONTACT_INFO.phoneDirectorRaw}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 text-xs font-semibold text-gold-400 hover:bg-neutral-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Contact Aziz
                  </a>
                  <a 
                    href={getWhatsAppLink(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/60 text-xs font-semibold text-emerald-400 border border-emerald-900 hover:bg-emerald-900/40 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID & TAB NAVIGATOR */}
      <section className="py-24 bg-neutral-900/30 border-t border-b border-neutral-900 relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Signature Rituals</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Our Professional Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full mx-auto mt-4" />
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Select and combine your preferred grooming and spa services below. Click to add them to your custom booking package!
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-full bg-neutral-950 border border-neutral-800 max-w-md w-full">
              <button
                onClick={() => setActiveCategory('barbering')}
                className={`flex-1 py-3 px-6 rounded-full font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeCategory === 'barbering' 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 shadow-md' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Scissors className="w-4 h-4" />
                Barbering & Cuts
              </button>
              <button
                onClick={() => setActiveCategory('spa')}
                className={`flex-1 py-3 px-6 rounded-full font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeCategory === 'spa' 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 shadow-md' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Spa & Massage
              </button>
            </div>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services_grid_cards">
            {SERVICES_DATA.find(cat => cat.id === activeCategory)?.items.map((service) => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <div 
                  key={service.id}
                  onClick={() => toggleService(service)}
                  className={`group relative rounded-2xl p-6 bg-neutral-950 border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between ${
                    isSelected 
                      ? 'border-gold-500 bg-gradient-to-br from-neutral-950 to-gold-950/20 shadow-lg shadow-gold-500/5 scale-[1.02]' 
                      : 'border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40'
                  }`}
                  id={`service_card_${service.id}`}
                >
                  {/* Badge for Popular Item */}
                  {service.popular && !isSelected && (
                    <span className="absolute top-4 right-4 bg-gold-950 border border-gold-500/30 text-gold-400 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}

                  {/* Checked Indicator */}
                  {isSelected && (
                    <span className="absolute top-4 right-4 bg-gold-500 text-neutral-950 p-1 rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}

                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold-400 transition-colors pr-10">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light min-h-[40px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Add Area */}
                  <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Estimated Price</p>
                      <p className="font-display font-extrabold text-lg text-gold-400">
                        KES {service.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Duration</p>
                      <p className="text-xs text-neutral-300 font-medium">
                        {service.duration}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOOKING ESTIMATOR & CUSTOMIZER */}
      <section className="py-24 bg-neutral-950 relative border-b border-neutral-900" id="booking-estimator">
        {/* Background elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold-600/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info: Why Book a Package? */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Fast & Convenient</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Design Your Ultimate <br />
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Grooming Package</span>
              </h2>
              <div className="h-1 w-16 bg-gold-500 rounded-full" />
              
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                Why choose just one service? Assemble a tailor-made day of absolute luxury. Select any combination of premium haircuts, beard alignments, facial streams, and spa pampering. 
              </p>
              
              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-gold-950 text-gold-400 border border-gold-500/20">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-neutral-400"><strong>Skip the Line</strong> — Custom package clients receive priority VIP slots.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-gold-950 text-gold-400 border border-gold-500/20">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-neutral-400"><strong>Full Vibe Experience</strong> — Complemented with warm drinks and premium music.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 p-0.5 rounded-full bg-gold-950 text-gold-400 border border-gold-500/20">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-neutral-400"><strong>No Hidden Fees</strong> — Transparent pricing beforehand, sent directly to WhatsApp.</p>
                </li>
              </ul>

              {/* Instant Call To Book Highlight */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3">
                <p className="text-xs text-neutral-400 font-medium">Prefer to book immediately via phone?</p>
                <a 
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-base font-bold transition-all"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  Call Now: {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right Estimator: Selection Summary Cart */}
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-900">
                  <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold-400" />
                    Appointment Estimator
                  </h3>
                  {selectedServices.length > 0 && (
                    <button 
                      onClick={clearSelection}
                      className="text-xs font-semibold text-neutral-500 hover:text-gold-400 transition-colors"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {/* Selected List */}
                {selectedServices.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                      <Scissors className="w-8 h-8" />
                    </div>
                    <div className="max-w-xs mx-auto">
                      <p className="font-display font-bold text-white">Your package is empty</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Go to the services grid above and tap/click any services to build your customized session!
                      </p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider"
                    >
                      Browse Services
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Items List */}
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                      <AnimatePresence initial={false}>
                        {selectedServices.map(service => (
                          <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-900/80 group hover:border-gold-500/20 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-gold-400" />
                              <div>
                                <h4 className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">{service.name}</h4>
                                <p className="text-[10px] text-neutral-500">{service.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-display font-bold text-sm text-gold-400">
                                KES {service.price.toLocaleString()}
                              </span>
                              <button 
                                onClick={() => toggleService(service)}
                                className="text-neutral-600 hover:text-red-400 p-1 transition-colors"
                                aria-label={`Remove ${service.name}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Client Quick Details */}
                    <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Your Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Maurice" 
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Preferred Date</label>
                        <input 
                          type="date" 
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Preferred Time</label>
                        <input 
                          type="time" 
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Aggregate Summary */}
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400">Selected Services:</span>
                        <span className="font-semibold text-white">{selectedServices.length} items</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400">Estimated Duration:</span>
                        <span className="font-semibold text-white">~{totalDuration} mins</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-neutral-900">
                        <span className="font-display font-bold text-base text-white">Estimated Total:</span>
                        <span className="font-display font-extrabold text-2xl text-gold-400">
                          KES {totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Book Package via WhatsApp Trigger */}
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/10 active:scale-98"
                      id="estimator_whatsapp_booking_btn"
                    >
                      <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                      Book Package via WhatsApp
                    </a>
                    
                    <p className="text-center text-[10px] text-neutral-500 font-light leading-snug">
                      Clicking above opens WhatsApp with your selections, allowing us to immediately confirm your VIP slot. Payments are completed on-site.
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AMBIANCE GALLERY & LIGHTBOX */}
      <section className="py-24 bg-neutral-900/20 border-b border-neutral-900 relative" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Visual Tour</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Our Premium Ambiance
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full mx-auto mt-4" />
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Experience the luxury before you arrive. Click any image to open the full visual tour.
            </p>
          </div>

          {/* Grid Layout (Bento-like / Masonry feel) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery_grid">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden border border-neutral-900 cursor-pointer shadow-lg hover:shadow-gold-500/5 hover:border-gold-500/20 transition-all duration-500 aspect-4/3"
                id={`gallery_img_${img.id}`}
              >
                <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center group-hover:bg-neutral-850 transition-colors duration-300">
                  <span className="text-sm text-neutral-300 font-semibold font-display">{img.title}</span>
                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 px-2">{img.alt}</p>
                  <span className="text-[10px] text-gold-500/60 font-mono mt-4 uppercase tracking-widest">[Image Placeholder]</span>
                </div>
                
                {/* Image Overlay Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">Ambiance Showcase</span>
                    <h4 className="font-display font-bold text-lg text-white mt-1">{img.title}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gold-500 text-neutral-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              id="gallery_lightbox"
            >
              {/* Close Button */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2.5 rounded-full bg-neutral-900/50 hover:bg-neutral-800 transition-colors z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next buttons */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
                }}
                className="absolute left-4 sm:left-8 text-white/70 hover:text-gold-400 p-3 rounded-full bg-neutral-900/50 hover:bg-neutral-800 transition-colors z-10"
                aria-label="Previous Image"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null);
                }}
                className="absolute right-4 sm:right-8 text-white/70 hover:text-gold-400 p-3 rounded-full bg-neutral-900/50 hover:bg-neutral-800 transition-colors z-10"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div 
                className="max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div 
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl aspect-video bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-2xl"
                >
                  <span className="text-lg text-white font-semibold font-display">{GALLERY_IMAGES[lightboxIndex].title}</span>
                  <p className="text-sm text-neutral-400 mt-3 max-w-md">{GALLERY_IMAGES[lightboxIndex].alt}</p>
                  <span className="text-xs text-neutral-500 font-mono mt-6 uppercase tracking-widest">[Image Placeholder]</span>
                </motion.div>
                
                {/* Caption text */}
                <div className="text-center mt-4 space-y-1">
                  <h4 className="font-display font-extrabold text-white text-lg sm:text-xl">
                    {GALLERY_IMAGES[lightboxIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto px-4 leading-normal">
                    {GALLERY_IMAGES[lightboxIndex].alt}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* GOOD TO KNOW SECTION */}
      <section className="py-24 bg-neutral-950 border-b border-neutral-900 relative" id="good-to-know">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">The Fine Details</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Good to Know
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full mx-auto mt-4" />
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              We’ve crafted an environment focused entirely on hospitality, accessibility, and high comfort.
            </p>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="good_to_know_grid">
            {GOOD_TO_KNOW.map((badge, idx) => {
              const BadgeIcon = iconMap[badge.icon] || Info;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-gold-500/20 hover:bg-neutral-900/60 transition-all duration-300 flex items-start gap-4"
                  id={`good_badge_${idx}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <BadgeIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">{badge.label}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-neutral-900/10 relative border-b border-neutral-900 overflow-hidden" id="testimonials">
        {/* Soft decorative glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Testimonials</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Loved by Our Clients
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="testimonials_grid">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between space-y-6 shadow-xl"
                id={`testimonial_card_${idx}`}
              >
                {/* Ratings stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4.5 h-4.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed italic font-light">
                  "{t.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-neutral-850 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-800 flex items-center justify-center font-display font-extrabold text-gold-400 text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">{t.author}</h4>
                    <p className="text-neutral-500 text-xs font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOURS & LOCATION (EMBEDDED GOOGLE MAPS) */}
      <section className="py-24 bg-neutral-950 relative" id="location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hours & Address details */}
            <div className="lg:col-span-5 space-y-8" id="location_info">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-500">Visit Azzi Lounge</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  Hours & Location
                </h2>
                <div className="h-1 w-16 bg-gold-500 rounded-full mt-4" />
              </div>

              {/* Detail Blocks */}
              <div className="space-y-6">
                
                {/* Hours Block */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">Opening Hours</h3>
                    <p className="text-sm font-semibold text-neutral-200 mt-1">{CONTACT_INFO.hours.days}</p>
                    <p className="text-base font-extrabold text-gold-400 mt-0.5">{CONTACT_INFO.hours.time}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 italic">{CONTACT_INFO.hours.note}</p>
                  </div>
                </div>

                {/* Location Block */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">Our Address</h3>
                    <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                      <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                      Right next to Sakinya Motors, opp. FEM Church
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Contact Form Actions */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <h4 className="font-display font-bold text-white text-sm">Need Help Finding Us?</h4>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-xs font-bold text-white transition-colors"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-950/40 text-xs font-bold text-gold-400 border border-gold-500/20 hover:bg-gold-900/30 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Reception
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Google Maps Embed Iframe */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-neutral-850 p-2 bg-neutral-900/50 shadow-2xl relative">
                {/* Elegant overlay borders */}
                <div className="absolute top-4 left-4 z-10 bg-neutral-950/90 border border-neutral-800 px-4 py-2 rounded-lg backdrop-blur-sm text-xs text-neutral-300 flex items-center gap-2 shadow-lg">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  Azzi Lounge, Nakuru
                </div>
                
                {/* Responsive Google Maps Iframe */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x1829f074a382e753%3A0xe6bf448cf82ca709!2sSakinya%20Motors%20Ltd!5e0!3m2!1sen!2ske!4v1783508600000!5m2!1sen!2ske" 
                  className="w-full h-[350px] sm:h-[450px] rounded-2xl border-0 filter grayscale invert contrast-110 opacity-80" 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Azzi Lounge Barbers & Spa Google Map Location"
                  id="location_map"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-8 mt-auto relative" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
            
            {/* Column 1: Logo & Tagline */}
            <div className="lg:col-span-4 space-y-6">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Scissors className="w-5 h-5 text-neutral-950 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold tracking-wider text-base text-white group-hover:text-gold-400 transition-colors leading-tight">
                    AZZI LOUNGE
                  </span>
                  <span className="text-[10px] tracking-widest text-gold-500 font-medium">
                    BARBER & SPA
                  </span>
                </div>
              </a>

              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Offers professional haircuts, beard styling, hair washing, manicure, pedicure, facial treatments and massage therapy — more than a cut, it's an experience.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href={CONTACT_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={CONTACT_INFO.tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300 font-bold"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.12 2.27 1.89 3.66 2.22v3.91c-1.01-.16-2-.54-2.88-1.12-.87-.58-1.58-1.37-2.07-2.29-.02 2.37-.01 4.74-.02 7.12-.11 2.44-1.28 4.78-3.18 6.34-1.95 1.63-4.63 2.4-7.15 2.1-2.61-.25-5.02-1.85-6.19-4.21-1.32-2.58-1.09-5.91.63-8.28 1.54-2.18 4.14-3.51 6.84-3.4 1.13.04 2.24.36 3.22.92V8.95c-.83-.49-1.78-.73-2.75-.7-1.46.01-2.91.68-3.83 1.83-.98 1.19-1.26 2.87-.75 4.34.45 1.39 1.62 2.53 3.07 2.89 1.52.41 3.22-.05 4.29-1.19.97-1.01 1.28-2.52 1.25-3.89-.02-4.14-.01-8.28-.02-12.42z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">About Us</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">Our Services</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('gallery')} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">Ambiance Gallery</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('good-to-know')} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">Good to Know</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('location')} className="text-sm text-neutral-400 hover:text-gold-400 transition-colors">Hours & Location</button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">Contact Reception</h4>
              
              <div className="space-y-4 text-sm text-neutral-400">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">Call/WhatsApp (Booking & Inquiry)</p>
                    <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-white hover:text-gold-400 transition-colors font-semibold">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">Director Aziz Farah</p>
                    <a href={`tel:${CONTACT_INFO.phoneDirectorRaw}`} className="text-white hover:text-gold-400 transition-colors font-semibold">
                      {CONTACT_INFO.phoneDirector}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">Email Address</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-gold-400 transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-neutral-500">Our Address</p>
                    <p className="text-white">
                      Oginga Odinga Avenue, Nakuru
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright and Sign-off */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} Azzi Lounge Barbershop & Spa. All rights reserved.
            </p>
            <p className="text-[10px] text-neutral-600 font-light tracking-wide">
              "More Than a Cut — It's a Vibe." • Designed for Luxury & Precision
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP BOOKING BUTTON */}
      <a 
        href={getWhatsAppLink(true)}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/30 hover:shadow-emerald-500/40 transform hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse group"
        aria-label="Book appointment on WhatsApp"
        id="floating_whatsapp_btn"
      >
        <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        
        {/* Floating tooltip label */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Book on WhatsApp 💬
        </span>
      </a>

    </div>
  );
}
