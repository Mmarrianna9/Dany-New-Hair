

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, Star, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import sfondo1 from '../assets/images/sfondo.jpg';
import sfondo2 from '../assets/images/sfondo2.jpg';

const Home = () => {
  const slides = [sfondo1, sfondo2];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambio automatico ogni 5 secondi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  const prevSlide = () => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);

  return (
    <div className="bg-zinc-950 min-h-screen text-white overflow-x-hidden">
      
      {/* Hero Section con Carosello */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Immagini del Carosello */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img 
              src={slide} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}

        {/* Overlay Gradiente per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950 z-10" />

        {/* Contenuto Testuale */}
        <div className="relative z-20 text-center px-4 max-w-4xl pt-10">
          <div className="flex justify-center mb-6">
            <span className="bg-amber-500/20 text-amber-500 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase border border-amber-500/30">
              Premium Barber Experience
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            DANY'S <br />
            <span className="text-amber-500 underline decoration-zinc-800">NEW HAIR</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light">
            Oltre il semplice taglio. Definiamo il tuo stile con precisione sartoriale e prodotti d'eccellenza.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/booking" 
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-10 py-5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              PRENOTA ORA <ChevronRight size={24} />
            </Link>
            <Link 
              to="/login" 
              className="bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-xl border border-white/10 backdrop-blur-md transition-all"
            >
              AREA CLIENTE
            </Link>
          </div>
        </div>

        {/* Frecce Navigazione (Opzionali, visibili al passaggio) */}
        <button onClick={prevSlide} className="absolute left-4 z-30 p-2 bg-black/20 rounded-full hover:bg-amber-500 transition-colors hidden md:block">
          <ChevronLeft size={30} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 z-30 p-2 bg-black/20 rounded-full hover:bg-amber-500 transition-colors hidden md:block">
          <ChevronRight size={30} />
        </button>

        {/* Indicatori (Puntini) */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-amber-500' : 'w-2 bg-zinc-600'}`}
            />
          ))}
        </div>
      </section>

      {/* Sezione Caratteristiche */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Scissors />, title: "Tagli Sartoriali", desc: "Studio della fisionomia per un look personalizzato." },
            { icon: <Clock />, title: "Zero Attese", desc: "Puntualità garantita grazie al nostro sistema online." },
            { icon: <Star />, title: "Prodotti Top", desc: "Solo il meglio per la salute di pelle e capelli." }
          ].map((item, index) => (
            <div key={index} className="group p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 hover:border-amber-500/50 transition-all duration-500">
              <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { className: "text-amber-500", size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-900 py-16 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 font-black text-3xl text-white">
              <Scissors className="text-amber-500 rotate-90" size={32} /> NEW HAIR
            </div>
            <p className="text-zinc-500 max-w-xs">L'arte della barberia tradizionale incontra il design moderno.</p>
          </div>
          
          <div className="space-y-4 text-zinc-300">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin size={20} className="text-amber-500"/> 
              <span>Via Roma 123, Treviso</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Clock size={20} className="text-amber-500"/> 
              <span>Mar - Sab: 09:00 - 19:00</span>
            </div>
          </div>

          <div className="text-zinc-600 text-sm">
            <p>© 2026 Dany's NewHair Barber Shop.</p>
            <p className="mt-2 uppercase tracking-widest text-[10px]">Quality & Style</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;