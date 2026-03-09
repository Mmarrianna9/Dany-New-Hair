import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Calendar, Clock, Scissors, User, CheckCircle, AlertCircle } from 'lucide-react';

const Booking = () => {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State per il form
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Carichiamo i dati all'avvio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [barbersRes, servicesRes] = await Promise.all([
          api.get('/barbers/all'),
          api.get('/services/all')
        ]);
        setBarbers(barbersRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        console.error("Errore caricamento dati:", err);
        setMessage({ type: 'error', text: 'Impossibile caricare barbieri o servizi.' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Invio della prenotazione
  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validazione semplice per la data (formato richiesto dal backend)
    // Trasformiamo "2026-03-15T10:30" in "2026-03-15 10:30"
    const formattedDate = appointmentTime.replace('T', ' ');

    try {
      const response = await api.post('/appointments/book', {
        barberId: selectedBarber,
        serviceId: selectedService,
        appointmentTime: formattedDate
      });
      setMessage({ type: 'success', text: response.data });
      // Reset form
      setSelectedBarber('');
      setSelectedService('');
      setAppointmentTime('');
    } catch (err) {
      const errorMsg = err.response?.data || "Errore durante la prenotazione.";
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  if (loading) return <div className="text-center p-20">Caricamento in corso...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-500 mb-2">Prenota il tuo Taglio</h1>
          <p className="text-zinc-400">Scegli il tuo barbiere di fiducia e l'orario perfetto.</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
          }`}>
            {message.type === 'success' ? <CheckCircle /> : <AlertCircle />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-6 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
          
          {/* Selezione Barbiere */}
          <div>
            <label className="flex items-center gap-2 text-zinc-400 mb-2">
              <User size={18} /> Seleziona Barbiere
            </label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none focus:border-amber-500 transition text-white"
              value={selectedBarber}
              onChange={(e) => setSelectedBarber(e.target.value)}
              required
            >
              <option value="">-- Scegli un barbiere --</option>
              {barbers.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.specialty})</option>
              ))}
            </select>
          </div>

          {/* Selezione Servizio */}
          <div>
            <label className="flex items-center gap-2 text-zinc-400 mb-2">
              <Scissors size={18} /> Seleziona Servizio
            </label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none focus:border-amber-500 transition text-white"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">-- Scegli cosa vuoi fare --</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.price}€</option>
              ))}
            </select>
          </div>

          {/* Selezione Data e Ora */}
          <div>
            <label className="flex items-center gap-2 text-zinc-400 mb-2">
              <Clock size={18} /> Data e Ora
            </label>
            <input 
              type="datetime-local"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none focus:border-amber-500 transition text-white"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            CONFERMA PRENOTAZIONE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;