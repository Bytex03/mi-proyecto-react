import React from 'react';
import './PostCard.css';

/**
 * Componente PostCard (Ejercicio 4).
 * Representa una tarjeta de publicación individual del blog.
 * @param {object} post - Datos del post: id, titulo, descripcion, fecha, destacado
 * @param {function} onDelete - Callback para eliminar el post
 * @param {function} onToggleDestacado - Callback para marcar/desmarcar como destacado
 * @param {function} onEdit - Callback para iniciar la edición del post
 */
function PostCard({ post, onDelete, onToggleDestacado, onEdit }) {
  return (
    <article className={`post-card ${post.destacado ? 'destacado' : ''}`}>
      {/* Indicador visual si el post está destacado */}
      {post.destacado && <span className="post-badge">⭐ Destacado</span>}

      <h3 className="post-title">{post.titulo}</h3>
      <p className="post-desc">{post.descripcion}</p>
      <p className="post-date">Publicado: {post.fecha}</p>

      <div className="post-actions">
        <button
          className="btn-action btn-edit"
          onClick={() => onEdit(post)}
          aria-label="Editar publicación"
        >
          ✏️ Editar
        </button>
        <button
          className="btn-action btn-star"
          onClick={() => onToggleDestacado(post.id)}
          aria-label={post.destacado ? 'Quitar destacado' : 'Destacar publicación'}
        >
          {post.destacado ? '★ Quitar' : '☆ Destacar'}
        </button>
        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(post.id)}
          aria-label="Eliminar publicación"
        >
          🗑️ Eliminar
        </button>
      </div>
    </article>
  );
}

export default PostCard;
