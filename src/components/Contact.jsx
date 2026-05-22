import React, { useState } from 'react';
import './Contact.css';

// Estado inicial del formulario
const INITIAL_FORM = { nombre: '', email: '', mensaje: '' };
// Estado inicial de errores (vacío = sin errores)
const INITIAL_ERRORS = { nombre: '', email: '', mensaje: '' };

/**
 * Valida un campo individual del formulario.
 * @param {string} name - Nombre del campo
 * @param {string} value - Valor actual del campo
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
function validateField(name, value) {
  switch (name) {
    case 'nombre':
      if (!value.trim()) return 'El nombre es obligatorio.';
      if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    case 'email':
      if (!value.trim()) return 'El email es obligatorio.';
      // Expresión regular básica para validar formato de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Introduce un email válido.';
      return '';
    case 'mensaje':
      if (!value.trim()) return 'El mensaje es obligatorio.';
      if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
      return '';
    default:
      return '';
  }
}

/**
 * Componente Contact — Formulario con validación (Ejercicio 2).
 * Gestiona estado con useState, valida en tiempo real (onChange/onBlur)
 * y bloquea el envío si hay errores.
 */
function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  // touched registra qué campos han sido tocados para mostrar errores solo en ellos
  const [touched, setTouched] = useState({ nombre: false, email: false, mensaje: false });
  const [enviado, setEnviado] = useState(false);

  /** Actualiza el valor del campo y valida en tiempo real */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Validar solo si el campo ya fue tocado
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  /** Marca el campo como tocado y valida al perder el foco */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  /** Valida todos los campos y, si son válidos, "envía" el formulario */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Marcar todos como tocados para mostrar todos los errores
    setTouched({ nombre: true, email: true, mensaje: true });
    const newErrors = {
      nombre: validateField('nombre', form.nombre),
      email: validateField('email', form.email),
      mensaje: validateField('mensaje', form.mensaje),
    };
    setErrors(newErrors);
    // Bloquear envío si algún campo tiene error
    const hasErrors = Object.values(newErrors).some(err => err !== '');
    if (hasErrors) return;

    // Envío exitoso: mostrar mensaje y limpiar
    setEnviado(true);
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTouched({ nombre: false, email: false, mensaje: false });
    // Ocultar el mensaje de éxito tras 4 segundos
    setTimeout(() => setEnviado(false), 4000);
  };

  /** Devuelve la clase CSS del campo según su estado de validación */
  const getFieldClass = (name) => {
    if (!touched[name]) return 'form-input';
    return errors[name] ? 'form-input invalid' : 'form-input valid';
  };

  return (
    <section className="contact-section">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-subtitle">
        Rellena el formulario y nos pondremos en contacto contigo.
      </p>

      {/* Mensaje de éxito — renderizado condicional */}
      {enviado && (
        <div className="alert-success" role="alert">
          ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre <span className="required">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre completo"
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClass('nombre')}
            aria-describedby="nombre-error"
          />
          {/* Indicador visual de validez */}
          {touched.nombre && !errors.nombre && (
            <span className="field-ok">✓ Correcto</span>
          )}
          {touched.nombre && errors.nombre && (
            <span id="nombre-error" className="field-error" role="alert">
              {errors.nombre}
            </span>
          )}
        </div>

        {/* Campo Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClass('email')}
            aria-describedby="email-error"
          />
          {touched.email && !errors.email && (
            <span className="field-ok">✓ Correcto</span>
          )}
          {touched.email && errors.email && (
            <span id="email-error" className="field-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Campo Mensaje */}
        <div className="form-group">
          <label htmlFor="mensaje">
            Mensaje <span className="required">*</span>
            <span className="char-count">({form.mensaje.length} / mín. 10 caracteres)</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            value={form.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldClass('mensaje')}
            rows={5}
            aria-describedby="mensaje-error"
          />
          {touched.mensaje && !errors.mensaje && (
            <span className="field-ok">✓ Correcto</span>
          )}
          {touched.mensaje && errors.mensaje && (
            <span id="mensaje-error" className="field-error" role="alert">
              {errors.mensaje}
            </span>
          )}
        </div>

        <button type="submit" className="btn-enviar">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}

export default Contact;
