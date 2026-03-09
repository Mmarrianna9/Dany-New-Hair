import React, { useState } from 'react';
import api from '../api/api';
import { Scissors, UserPlus, DollarSign, Clock, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  // State per Servizio
  const [service, setService] = useState({ name: '', description: '', price: '', durationMinutes: '' });
  // State per Barbiere
  const [barber, setBarber] = useState({ name: '', specialty: '' });
  const [message, setMessage] = useState('');

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services/add', service);
      setMessage("Servizio aggiunto con successo!");
      setService({ name: '', description: '', price: '', durationMinutes: '' });
    } catch (err) {
        console.error("Dettagli errore:", err);
      setMessage("Errore durante l'inserimento del servizio.");
    }
  };

  const handleBarberSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/barbers/add', barber);
      setMessage("Barbiere aggiunto con successo!");
      setBarber({ name: '', specialty: '' });
    } catch (err) {
      console.error("Errore rilevato:", err);
      setMessage("Errore durante l'inserimento del barbiere.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-amber-500 flex items-center gap-2">
          <Scissors /> Pannello Admin NewHair
        </h1>

        {message && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500 text-amber-500 rounded-lg flex items-center gap-2">
            <CheckCircle size={20} /> {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form Inserimento Servizio */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scissors size={20} className="text-amber-500" /> Aggiungi Servizio
            </h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Nome Servizio (es. Taglio)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-amber-500 outline-none"
                value={service.name} onChange={(e) => setService({...service, name: e.target.value})} required
              />
              <textarea 
                placeholder="Descrizione"
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-amber-500 outline-none"
                value={service.description} onChange={(e) => setService({...service, description: e.target.value})}
              />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-2 top-2.5 text-zinc-500" size={16}/>
                  <input 
                    type="number" placeholder="Prezzo"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 pl-8 focus:border-amber-500 outline-none"
                    value={service.price} onChange={(e) => setService({...service, price: e.target.value})} required
                  />
                </div>
                <div className="relative flex-1">
                  <Clock className="absolute left-2 top-2.5 text-zinc-500" size={16}/>
                  <input 
                    type="number" placeholder="Minuti"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 pl-8 focus:border-amber-500 outline-none"
                    value={service.durationMinutes} onChange={(e) => setService({...service, durationMinutes: e.target.value})} required
                  />
                </div>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 rounded transition">
                Salva Servizio
              </button>
            </form>
          </div>

          {/* Form Inserimento Barbiere */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserPlus size={20} className="text-amber-500" /> Aggiungi Barbiere
            </h2>
            <form onSubmit={handleBarberSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Nome Barbiere"
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-amber-500 outline-none"
                value={barber.name} onChange={(e) => setBarber({...barber, name: e.target.value})} required
              />
              <input 
                type="text" placeholder="Specialità (es. Sfumature, Barba)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 focus:border-amber-500 outline-none"
                value={barber.specialty} onChange={(e) => setBarber({...barber, specialty: e.target.value})}
              />
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 rounded transition">
                Salva Barbiere
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;