import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Puliamo l'errore a ogni tentativo

    try {
      // 1. Chiamata al backend
      const response = await api.post('/auth/login', { username, password });
      
      /* IMPORTANTE: Assicurati che il tuo backend restituisca un oggetto tipo:
         { token: "...", roles: ["ROLE_ADMIN"], username: "..." }
      */
      const { token, roles } = response.data;

      // 2. Salviamo i dati nel localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_role', JSON.stringify(roles));

      // 3. Reindirizzamento basato sul ruolo
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin-dashboard'); // Se sei il capo, vai in dashboard
      } else {
        navigate('/'); // Se sei cliente, vai alla home o agli appuntamenti
      }

    } catch (err) {
      console.error("Dettagli errore:", err);
      // Gestione errore più specifica
      if (err.response && err.response.status === 401) {
        setError("Username o Password errati.");
      } else {
        setError("Il server non risponde. Controlla Spring Boot!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800">
        <div className="text-center mb-8">
          {/* Logo o Icona opzionale */}
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            New<span className="text-amber-500">Hair</span>
          </h2>
          <p className="text-zinc-400 mt-2 font-light">Accesso Area Riservata</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-3 animate-pulse">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-widest font-bold mb-2 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-700"
                placeholder="Il tuo username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 text-xs uppercase tracking-widest font-bold mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-700"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95 uppercase tracking-widest text-sm mt-4"
          >
            Entra nel Salone
          </button>
        </form>
        
        <div className="mt-8 text-center text-zinc-600 text-xs uppercase tracking-widest font-bold">
           Dany's NewHair Quality
        </div>
      </div>
    </div>
  );
};

export default Login;