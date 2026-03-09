import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, Star, MapPin, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-950 z-10" />
        
        {/* Background Decorativo (Simulazione immagine) */}
        <div className="absolute inset-0 bg-zinc-900 opacity-40">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            IL TUO STILE, <br />
            <span className="text-amber-500">LA NOSTRA ARTE.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-8">
            Prenota il tuo taglio in pochi secondi. Esperienza, precisione e passione al servizio del tuo look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/book" 
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              Prenota Ora <ChevronRight size={20} />
            </Link>
            <Link 
              to="/login" 
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-full border border-zinc-700 transition-all"
            >
              Area Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* Sezione Caratteristiche */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scissors className="text-amber-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Tagli Sartoriali</h3>
          <p className="text-zinc-400">Ogni viso ha il suo taglio. Studiamo la tua fisionomia per un risultato perfetto.</p>
        </div>

        <div className="text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="text-amber-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Zero Attese</h3>
          <p className="text-zinc-400">Il nostro sistema di prenotazione online ti garantisce puntualità massima.</p>
        </div>

        <div className="text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="text-amber-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">Prodotti Top</h3>
          <p className="text-zinc-400">Utilizziamo solo i migliori prodotti per la cura di barba e capelli.</p>
        </div>
      </section>

      {/* Footer / Info Rapide */}
      <footer className="bg-zinc-900/30 border-t border-zinc-800 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-2xl text-zinc-500">
            <Scissors size={24} /> NewHair
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center text-zinc-400">
            <span className="flex items-center gap-2"><MapPin size={18} className="text-amber-500"/> Via Roma 123, Treviso</span>
            <span className="flex items-center gap-2"><Clock size={18} className="text-amber-500"/> Mar-Sab: 09:00 - 19:00</span>
          </div>
          <p className="text-zinc-600 text-sm">© 2026 NewHair Barber Shop.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;