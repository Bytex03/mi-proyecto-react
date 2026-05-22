import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import './App.css';

/**
 * Componente raíz de la aplicación.
 * Gestiona el tema global (claro/oscuro) y define el sistema de rutas.
 */
function App() {
  // Estado del tema: false = claro, true = oscuro
  const [darkMode, setDarkMode] = useState(false);

  // Alterna el tema cambiando la clase del body
  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      document.body.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <BrowserRouter>
      {/* Navbar recibe la función y estado del tema para mostrar el botón */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
