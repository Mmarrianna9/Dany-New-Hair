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
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data);
      navigate('/');
    } catch (err) {
        console.error("Dettagli errore:", err);
      setError("Credenziali non valide. Riprova.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Bentornato</h2>
          <p className="text-zinc-400 mt-2">Accedi per gestire i tuoi appuntamenti</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-500" size={20} />
              <input 
                type="text"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition"
                placeholder="Inserisci username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-zinc-500" size={20} />
              <input 
                type="password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg transition transform active:scale-95">
            Entra in NewHair
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;