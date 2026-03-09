import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importazione Componenti
import Navbar from './components/Navbar';

// Importazione Pagine
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments'; // <--- AGGIUNTO QUESTO

// Componente per proteggere le rotte
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        {/* La Navbar rimane fissa in alto */}
        <Navbar />
        
        <main>
          <Routes>
            {/* Rotte Pubbliche */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Rotte Protette (Richiedono Login) */}
            <Route 
              path="/book" 
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/my-appointments" 
              element={
                <PrivateRoute>
                  <MyAppointments />
                </PrivateRoute>
              } 
            />
            
            {/* Rotta Admin */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />

            {/* Redirect per rotte errate */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;