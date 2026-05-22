import React from 'react';
import Gallery from './Gallery';
import Blog from './Blog';
import './Services.css';

/**
 * Página de Servicios (Ejercicio 1).
 * Agrupa los componentes Galería (Ejercicio 3) y Blog (Ejercicio 4).
 */
function Services() {
  return (
    <section className="services-section">
      <h1 className="services-title">Servicios</h1>

      <div className="services-block">
        <h2 className="services-subtitle">Galería de Imágenes</h2>
        <Gallery />
      </div>

      <div className="services-block">
        <h2 className="services-subtitle">Blog de Publicaciones</h2>
        <Blog />
      </div>
    </section>
  );
}

export default Services;
