import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Barra de navegación principal.
 * Usa NavLink de React Router para marcar automáticamente el enlace activo.
 * @param {boolean} darkMode - Estado actual del tema
 * @param {function} toggleTheme - Función para alternar el tema
 */
function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi Proyecto React</div>

      <ul className="navbar-links">
        {/* NavLink aplica la clase "active" automáticamente cuando la ruta coincide */}
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contacto
          </NavLink>
        </li>
      </ul>

      {/* Botón de alternancia de tema (Ejercicio 5) */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
        {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </nav>
  );
}

export default Navbar;
