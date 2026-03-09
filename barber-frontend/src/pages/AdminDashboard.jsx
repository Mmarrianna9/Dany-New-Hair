import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Scissors, UserPlus, DollarSign, Clock, CheckCircle, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [service, setService] = useState({ name: '', description: '', price: '', durationMinutes: '' });
  const [barber, setBarber] = useState({ name: '', specialty: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-hide del messaggio dopo 4 secondi
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/services/add', service);
      setMessage("Servizio aggiunto con successo!");
      setService({ name: '', description: '', price: '', durationMinutes: '' });
    } catch (err) {
      console.error("Dettagli errore:", err);
      setMessage("Errore: controlla se il server è attivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleBarberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/barbers/add', barber);
      setMessage("Barbiere aggiunto con successo!");
      setBarber({ name: '', specialty: '' });
    } catch (err) {
      console.error("Dettagli errore:", err);
      setMessage("Errore durante l'inserimento del barbiere.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header con Logout rapido */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-amber-500 flex items-center gap-3 tracking-tighter">
            <Scissors size={32} className="rotate-90" /> DANY'S ADMIN
          </h1>
          <button 
            onClick={() => {localStorage.clear(); window.location.href='/login'}}
            className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest font-bold transition"
          >
            Esci Sessione
          </button>
        </div>

        {/* Notifica Animata */}
        {message && (
          <div className="fixed top-5 right-5 z-50 animate-bounce p-4 bg-zinc-900 border-l-4 border-amber-500 text-white rounded shadow-2xl flex items-center gap-3">
            <CheckCircle className="text-amber-500" size={24} /> 
            <span className="font-bold">{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form Servizio */}
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Scissors size={20} className="text-amber-500" /> Nuovo Servizio
            </h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Nome</label>
                <input 
                  type="text" placeholder="Es: Taglio Skinfade"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-amber-500 outline-none transition"
                  value={service.name} onChange={(e) => setService({...service, name: e.target.value})} required
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Descrizione</label>
                <textarea 
                  placeholder="Dettagli del servizio..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-amber-500 outline-none transition h-24 resize-none"
                  value={service.description} onChange={(e) => setService({...service, description: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Prezzo (€)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 text-zinc-600" size={16}/>
                    <input 
                      type="number" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 pl-10 focus:border-amber-500 outline-none transition"
                      value={service.price} onChange={(e) => setService({...service, price: e.target.value})} required
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Durata (Min)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-zinc-600" size={16}/>
                    <input 
                      type="number"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 pl-10 focus:border-amber-500 outline-none transition"
                      value={service.durationMinutes} onChange={(e) => setService({...service, durationMinutes: e.target.value})} required
                    />
                  </div>
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 text-black font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "REGISTRA SERVIZIO"}
              </button>
            </form>
          </div>

          {/* Form Barbiere */}
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
              <UserPlus size={20} className="text-amber-500" /> Nuovo Staff
            </h2>
            <form onSubmit={handleBarberSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Nome Completo</label>
                <input 
                  type="text" placeholder="Es: Marco Barber"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-amber-500 outline-none transition"
                  value={barber.name} onChange={(e) => setBarber({...barber, name: e.target.value})} required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Specializzazione</label>
                <input 
                  type="text" placeholder="Es: Barba e Trattamenti"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-amber-500 outline-none transition"
                  value={barber.specialty} onChange={(e) => setBarber({...barber, specialty: e.target.value})}
                />
              </div>
              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "AGGIUNGI AL TEAM"}
                </button>
              </div>
            </form>

            <div className="mt-auto pt-10 text-center">
               <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">Dany's NewHair Management System</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;