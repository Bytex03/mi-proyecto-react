import React, { useState } from 'react';
import './Gallery.css';

/**
 * Lista de imágenes de la galería.
 * Usamos URLs de Unsplash (imágenes libres) como ejemplo.
 */
const IMAGES = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/mountain/800/500',
    thumb: 'https://picsum.photos/seed/mountain/200/130',
    alt: 'Montaña nevada',
    label: 'Montaña',
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/forest/800/500',
    thumb: 'https://picsum.photos/seed/forest/200/130',
    alt: 'Bosque verde',
    label: 'Bosque',
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/ocean/800/500',
    thumb: 'https://picsum.photos/seed/ocean/200/130',
    alt: 'Océano azul',
    label: 'Océano',
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/city/800/500',
    thumb: 'https://picsum.photos/seed/city/200/130',
    alt: 'Ciudad nocturna',
    label: 'Ciudad',
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/desert/800/500',
    thumb: 'https://picsum.photos/seed/desert/200/130',
    alt: 'Desierto al atardecer',
    label: 'Desierto',
  },
];

/**
 * Componente Galería (Ejercicio 3).
 * Muestra una imagen principal y miniaturas seleccionables.
 * Al hacer clic en una miniatura, se actualiza la imagen principal dinámicamente.
 */
function Gallery() {
  // Estado que almacena la imagen actualmente seleccionada
  const [selectedImage, setSelectedImage] = useState(IMAGES[0]);

  return (
    <div className="gallery">
      {/* Imagen principal — se actualiza cuando cambia selectedImage */}
      <div className="gallery-main">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="gallery-main-img"
        />
        <p className="gallery-main-label">{selectedImage.label}</p>
      </div>

      {/* Miniaturas — renderizado dinámico con .map() */}
      <div className="gallery-thumbs">
        {IMAGES.map(img => (
          <button
            key={img.id}
            className={`gallery-thumb-btn ${selectedImage.id === img.id ? 'active' : ''}`}
            onClick={() => setSelectedImage(img)}
            aria-label={`Ver imagen: ${img.label}`}
          >
            <img
              src={img.thumb}
              alt={img.alt}
              className="gallery-thumb-img"
            />
            <span className="gallery-thumb-label">{img.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
