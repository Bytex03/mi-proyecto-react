import React, { useState } from 'react';
import PostCard from './PostCard';
import './Blog.css';

// Datos iniciales de ejemplo para que el blog no aparezca vacío al inicio
const POSTS_INICIALES = [
  {
    id: 1,
    titulo: 'Bienvenido al blog',
    descripcion: 'Este es el primer post del blog. Puedes crear, editar, destacar y eliminar publicaciones dinámicamente.',
    fecha: new Date().toLocaleDateString('es-ES'),
    destacado: false,
  },
];

/**
 * Componente Blog (Ejercicio 4).
 * Sistema de gestión de posts con creación, edición, eliminación y destacado.
 * Todo el estado se gestiona con useState.
 */
function Blog() {
  const [posts, setPosts] = useState(POSTS_INICIALES);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  // postEnEdicion guarda el post que se está editando (null si se está creando)
  const [postEnEdicion, setPostEnEdicion] = useState(null);
  // Contador para generar IDs únicos
  const [nextId, setNextId] = useState(2);

  /** Crea un nuevo post o actualiza uno existente al enviar el formulario */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim()) return;

    if (postEnEdicion) {
      // Modo edición: actualiza el post correspondiente
      setPosts(prev =>
        prev.map(p =>
          p.id === postEnEdicion.id
            ? { ...p, titulo: titulo.trim(), descripcion: descripcion.trim() }
            : p
        )
      );
      setPostEnEdicion(null);
    } else {
      // Modo creación: añade un nuevo post al inicio de la lista
      const nuevoPost = {
        id: nextId,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        fecha: new Date().toLocaleDateString('es-ES'),
        destacado: false,
      };
      setPosts(prev => [nuevoPost, ...prev]);
      setNextId(prev => prev + 1);
    }

    setTitulo('');
    setDescripcion('');
  };

  /** Elimina un post por su ID */
  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  /** Alterna el estado "destacado" de un post */
  const handleToggleDestacado = (id) => {
    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, destacado: !p.destacado } : p)
    );
  };

  /** Carga los datos del post en el formulario para editar */
  const handleEdit = (post) => {
    setPostEnEdicion(post);
    setTitulo(post.titulo);
    setDescripcion(post.descripcion);
  };

  /** Cancela el modo edición y limpia el formulario */
  const handleCancelarEdicion = () => {
    setPostEnEdicion(null);
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div className="blog">
      {/* Formulario para crear o editar posts */}
      <form className="blog-form" onSubmit={handleSubmit}>
        <h3 className="blog-form-title">
          {postEnEdicion ? '✏️ Editando publicación' : '➕ Nueva publicación'}
        </h3>

        <div className="blog-form-group">
          <label htmlFor="blog-titulo">Título</label>
          <input
            id="blog-titulo"
            type="text"
            placeholder="Título del post..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="blog-form-group">
          <label htmlFor="blog-desc">Descripción</label>
          <textarea
            id="blog-desc"
            placeholder="Descripción del post..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="blog-form-actions">
          <button type="submit" className="btn-submit">
            {postEnEdicion ? 'Guardar cambios' : 'Publicar'}
          </button>
          {/* El botón de cancelar solo aparece en modo edición */}
          {postEnEdicion && (
            <button type="button" className="btn-cancel" onClick={handleCancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de posts renderizada dinámicamente */}
      <div className="blog-list">
        {posts.length === 0 ? (
          <p className="blog-empty">No hay publicaciones. ¡Crea la primera!</p>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onToggleDestacado={handleToggleDestacado}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
