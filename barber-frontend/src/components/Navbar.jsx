import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Calendar, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center text-white">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-amber-500">
        <Scissors size={24} />
        <span>NewHair</span>
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/book" className="flex items-center gap-1 hover:text-amber-500 transition">
          <Calendar size={20} />
          <span>Prenota</span>
        </Link>
        
        {token ? (
          <button onClick={handleLogout} className="flex items-center gap-1 bg-red-900/20 text-red-500 px-3 py-1 rounded hover:bg-red-900/40 transition">
            <LogOut size={20} />
            <span>Esci</span>
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-1 bg-amber-500 text-black px-4 py-2 rounded font-bold hover:bg-amber-400 transition">
            <User size={20} />
            <span>Accedi</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;