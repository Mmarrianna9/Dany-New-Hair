import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Calendar, Clock, Scissors, User, Trash2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Funzione per caricare gli appuntamenti dal backend
  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my');
      setAppointments(response.data);
    } catch (err) {
      console.error("Errore nel caricamento appuntamenti:", err);
      setMessage({ type: 'error', text: 'Errore nel caricamento delle prenotazioni.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Funzione per cancellare un appuntamento
  const handleCancel = async (id) => {
    if (window.confirm("Sei sicuro di voler annullare questo appuntamento?")) {
      try {
        await api.delete(`/appointments/cancel/${id}`);
        setMessage({ type: 'success', text: 'Appuntamento annullato con successo.' });
        // Rimuoviamo l'appuntamento dalla lista senza ricaricare la pagina
        setAppointments(appointments.filter(app => app.id !== id));
      } catch (err) {
        console.error("Errore durante la cancellazione:", err);
        setMessage({ type: 'error', text: 'Impossibile annullare l\'appuntamento.' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p>Caricamento dei tuoi appuntamenti...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-amber-500 flex items-center gap-3">
            <Calendar size={32} /> I Miei Appuntamenti
          </h1>
          <p className="text-zinc-400 mt-2">Gestisci le tue prenotazioni presso NewHair.</p>
        </header>

        {message.text && (
          <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">
            <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <Calendar size={30} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Nessun appuntamento trovato</h2>
            <p className="text-zinc-400 mb-6">Non hai ancora prenotato il tuo prossimo stile.</p>
            <a href="/book" className="bg-amber-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-amber-400 transition">
              Prenota ora
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((app) => (
              <div 
                key={app.id} 
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-zinc-700 transition-colors shadow-lg"
              >
                {/* Dettagli Servizio e Barbiere */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="bg-amber-500/10 p-4 rounded-2xl text-amber-500">
                    <Scissors size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{app.service.name}</h3>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                      <User size={14} className="text-amber-500" />
                      <span>Barbiere: <strong className="text-zinc-200">{app.barber.name}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Data e Ora */}
                <div className="flex items-center gap-8 text-zinc-300 bg-zinc-800/50 px-6 py-3 rounded-xl w-full md:w-auto justify-around">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-amber-500" />
                    <span>{new Date(app.appointmentTime).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-amber-500" />
                    <span>{new Date(app.appointmentTime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Azione Cancella */}
                <button 
                  onClick={() => handleCancel(app.id)}
                  className="group flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors p-2"
                  title="Annulla prenotazione"
                >
                  <Trash2 size={20} />
                  <span className="md:hidden font-semibold text-sm">Annulla Prenotazione</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;