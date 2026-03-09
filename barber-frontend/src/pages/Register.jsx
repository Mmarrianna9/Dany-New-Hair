import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Chiamata al tuo endpoint di registrazione (es. /auth/register)
      await api.post('/auth/register', formData);
      
      setMessage({ type: 'success', text: 'Registrazione completata! Verrai reindirizzato al login...' });
      
      // Dopo 2 secondi lo mandiamo al login
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Errore: Username già esistente o dati non validi.' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white flex justify-center items-center gap-2">
            <UserPlus className="text-amber-500" /> Registrati
          </h2>
          <p className="text-zinc-400 mt-2">Crea il tuo account per NewHair</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 border ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2 font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-500" size={20} />
              <input 
                type="text"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition"
                placeholder="Scegli uno username"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-zinc-500" size={20} />
              <input 
                type="password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition"
                placeholder="Crea una password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg transition transform active:scale-95">
            Crea Account
          </button>
        </form>

        <p className="text-center text-zinc-500 mt-6 text-sm">
          Hai già un account? <Link to="/login" className="text-amber-500 hover:underline">Accedi qui</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;