import React from 'react';
import './Home.css';

/**
 * Página de inicio (Ejercicio 1).
 * Muestra una pantalla de bienvenida con la descripción del proyecto.
 */
function Home() {
  return (
    <section className="home-section">
      <div className="home-hero">
        <h1 className="home-title">Bienvenido a Mi Proyecto React</h1>
        <p className="home-subtitle">
          Aplicación web desarrollada con React como parte de los ejercicios de Alternancia.
        </p>
      </div>

      <div className="home-cards">
        <div className="home-card">
          <span className="card-icon">🧭</span>
          <h3>Navegación SPA</h3>
          <p>Rutas dinámicas con React Router sin recargar la página.</p>
        </div>
        <div className="home-card">
          <span className="card-icon">🖼️</span>
          <h3>Galería Interactiva</h3>
          <p>Galería de imágenes con selección dinámica y resaltado visual.</p>
        </div>
        <div className="home-card">
          <span className="card-icon">📝</span>
          <h3>Blog Dinámico</h3>
          <p>Sistema de publicaciones creadas en tiempo real desde un formulario.</p>
        </div>
        <div className="home-card">
          <span className="card-icon">✅</span>
          <h3>Formulario Validado</h3>
          <p>Contacto con validaciones en tiempo real y gestión de estado.</p>
        </div>
        <div className="home-card">
          <span className="card-icon">🌙</span>
          <h3>Modo Oscuro</h3>
          <p>Cambio de tema dinámico mediante variables CSS y estado React.</p>
        </div>
      </div>

      <div className="home-tech">
        <h2>Tecnologías utilizadas</h2>
        <ul>
          <li><strong>React 18</strong> — Biblioteca principal de UI</li>
          <li><strong>React Router v6</strong> — Navegación SPA</li>
          <li><strong>useState / useEffect</strong> — Gestión de estado y efectos</li>
          <li><strong>CSS Variables</strong> — Sistema de temas claro/oscuro</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
