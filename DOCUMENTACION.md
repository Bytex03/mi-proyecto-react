# Documentación Técnica — Mi Proyecto React

**Autor:** Pedro  
**Fecha:** Mayo 2026  
**Asignatura:** Desarrollo Web en Entorno Cliente — Alternancia

---

## 1. Introducción

Este proyecto es una aplicación web de página única (SPA) desarrollada con **React 18** que
implementa los cinco ejercicios planteados en la unidad de Alternancia. El objetivo es
demostrar el uso de componentes, estado, eventos, routing y despliegue en un entorno de
trabajo profesional.

---

## 2. Arquitectura de la aplicación

### 2.1 Tipo de aplicación

La aplicación sigue el patrón **SPA (Single Page Application)**. Toda la lógica de navegación
se gestiona en el lado del cliente usando React Router, sin recargas de página entre secciones.

### 2.2 Estructura de carpetas

```
mi-proyecto/
├── public/
│   ├── index.html          ← Punto de entrada HTML
│   └── .htaccess           ← Redirección SPA para servidor Apache (InfinityFree)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Barra de navegación con React Router y botón de tema
│   │   ├── Navbar.css
│   │   ├── Home.jsx         ← Página de inicio (Ejercicio 1)
│   │   ├── Home.css
│   │   ├── Services.jsx     ← Página de servicios, agrupa Galería y Blog (Ejercicio 1)
│   │   ├── Services.css
│   │   ├── Gallery.jsx      ← Galería interactiva de imágenes (Ejercicio 3)
│   │   ├── Gallery.css
│   │   ├── Blog.jsx         ← Sistema de publicaciones dinámicas (Ejercicio 4)
│   │   ├── Blog.css
│   │   ├── PostCard.jsx     ← Tarjeta individual de publicación del blog
│   │   ├── PostCard.css
│   │   ├── Contact.jsx      ← Formulario con validación (Ejercicio 2)
│   │   └── Contact.css
│   ├── App.jsx              ← Componente raíz, gestiona tema y rutas
│   ├── App.css
│   ├── index.js             ← Punto de entrada de React
│   └── index.css            ← Variables CSS globales y reset (Ejercicio 5)
├── package.json             ← Dependencias y scripts npm
├── DOCUMENTACION.md         ← Este documento
└── GUIA_DESPLIEGUE.md       ← Guía paso a paso para GitHub, Vercel e InfinityFree
```

### 2.3 Flujo de datos

```
App.jsx
 ├── Estado: darkMode (boolean)
 ├── BrowserRouter
 │    ├── Navbar  ← recibe darkMode + toggleTheme vía props
 │    └── Routes
 │         ├── / → Home
 │         ├── /servicios → Services
 │         │    ├── Gallery   ← estado interno: selectedImage
 │         │    └── Blog      ← estado interno: posts[], form fields
 │         │         └── PostCard × N  ← recibe post + callbacks
 │         └── /contacto → Contact  ← estado interno: form, errors, touched
```

---

## 3. Sistema de routing (Ejercicio 1)

Se utiliza **React Router v6** con el componente `BrowserRouter` y las rutas definidas
en `App.jsx`:

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Pantalla de bienvenida con descripción del proyecto |
| `/servicios` | `Services` | Galería de imágenes y Blog de publicaciones |
| `/contacto` | `Contact` | Formulario de contacto con validación |

La navegación entre secciones **no recarga la página**. El componente `NavLink` de React
Router aplica automáticamente la clase CSS `active` al enlace de la ruta actual, proporcionando
el indicador visual requerido.

---

## 4. Descripción de componentes

### 4.1 `App.jsx`
Componente raíz. Gestiona el estado global del tema (`darkMode`) y contiene la definición de
rutas con `BrowserRouter`. Al cambiar el tema añade/quita la clase `dark` del `document.body`,
lo que activa las variables CSS del tema oscuro definidas en `index.css`.

### 4.2 `Navbar.jsx`
Barra de navegación fija en la parte superior. Usa `NavLink` de React Router para marcar la
sección activa. Contiene el botón de cambio de tema (Ejercicio 5) que recibe las props
`darkMode` y `toggleTheme` desde `App`.

### 4.3 `Home.jsx`
Página de bienvenida (Ejercicio 1). Componente puramente presentacional sin estado. Muestra
el título, descripción del proyecto, tarjetas de funcionalidades y lista de tecnologías.

### 4.4 `Services.jsx`
Contenedor de la sección Servicios (Ejercicio 1). No tiene estado propio; simplemente organiza
y renderiza los componentes `Gallery` y `Blog`.

### 4.5 `Gallery.jsx` — Ejercicio 3
Galería de imágenes interactiva. Estado interno: `selectedImage` (objeto con src, alt, label).

- Renderiza la imagen principal a partir del estado.
- Genera las miniaturas dinámicamente con `.map()` sobre el array `IMAGES`.
- Al hacer clic en una miniatura, llama a `setSelectedImage(img)`.
- La miniatura activa se resalta visualmente con la clase CSS `active` usando un ternario:
  ```jsx
  className={`gallery-thumb-btn ${selectedImage.id === img.id ? 'active' : ''}`}
  ```

### 4.6 `Blog.jsx` — Ejercicio 4
Sistema de gestión de posts. Estado interno: `posts[]`, campos del formulario (`titulo`,
`descripcion`), `postEnEdicion` y `nextId`.

**Funcionalidades implementadas:**
- **Crear post:** rellena el formulario y pulsa "Publicar". El nuevo post se añade al inicio de la lista.
- **Editar post:** el botón "Editar" carga los datos en el formulario. Al guardar, actualiza el post existente.
- **Eliminar post:** filtra el array eliminando el post por su `id`.
- **Destacar post:** alterna la propiedad `destacado` del post, que añade un borde dorado y un badge.

### 4.7 `PostCard.jsx`
Componente de presentación para cada publicación del blog. Recibe el objeto `post` y tres
callbacks: `onDelete`, `onToggleDestacado`, `onEdit`. Aplica clases CSS condicionales para el
estado destacado.

### 4.8 `Contact.jsx` — Ejercicio 2
Formulario de contacto con validación en tiempo real. Estado interno: `form`, `errors`,
`touched`, `enviado`.

**Eventos gestionados:**
- `onChange` — actualiza el valor del campo y revalida si ya fue tocado.
- `onBlur` — marca el campo como tocado y ejecuta la validación.
- `onSubmit` — valida todos los campos y bloquea el envío si hay errores.

**Validaciones implementadas:**
| Campo | Validaciones |
|---|---|
| Nombre | Obligatorio, mínimo 2 caracteres |
| Email | Obligatorio, formato válido con regex |
| Mensaje | Obligatorio, mínimo 10 caracteres |

**Indicadores visuales:** cada campo muestra borde verde + "✓ Correcto" cuando es válido,
o borde rojo + mensaje de error cuando es inválido y ha sido tocado.

---

## 5. Sistema de temas claro/oscuro (Ejercicio 5)

El sistema de temas se implementa con **variables CSS** definidas en `index.css` y **estado
React** en `App.jsx`.

### Definición de variables

```css
/* Tema claro (por defecto) */
:root {
  --bg-primary: #ffffff;
  --accent: #4a6fa5;
  --text-primary: #1a1a2e;
  /* ... */
}

/* Tema oscuro — activado cuando body tiene clase "dark" */
body.dark {
  --bg-primary: #0d0d1a;
  --accent: #6b93d6;
  --text-primary: #e8eaf0;
  /* ... */
}
```

### Mecanismo de cambio

```jsx
// En App.jsx
const toggleTheme = () => {
  setDarkMode(prev => {
    const next = !prev;
    document.body.classList.toggle('dark', next);
    return next;
  });
};
```

Todos los componentes consumen las variables CSS. Al añadir/quitar la clase `dark` del `body`,
**toda la interfaz cambia de tema sin recargar la página**.

---

## 6. Gestión de estado

| Componente | Estado | Descripción |
|---|---|---|
| `App` | `darkMode` | Tema actual (claro/oscuro) |
| `Gallery` | `selectedImage` | Imagen activa en la galería |
| `Blog` | `posts[]`, `titulo`, `descripcion`, `postEnEdicion`, `nextId` | Posts y formulario del blog |
| `Contact` | `form`, `errors`, `touched`, `enviado` | Datos, errores y estado del formulario |

---

## 7. Instalación y ejecución en local

### Requisitos previos
- **Node.js** v18 o superior — https://nodejs.org
- **npm** (incluido con Node.js)
- **Git** — https://git-scm.com

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/TU-USUARIO/mi-proyecto-react.git
cd mi-proyecto-react

# 2. Instala las dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm start
# La aplicación abre en http://localhost:3000
```

### Generar build de producción

```bash
npm run build
# Genera la carpeta build/ con los archivos optimizados
```

---

## 8. Despliegue

Para instrucciones detalladas paso a paso (GitHub, Vercel e InfinityFree) consulta el
archivo **`GUIA_DESPLIEGUE.md`** incluido en este repositorio.

### Resumen rápido

| Entorno | Método | URL |
|---|---|---|
| Desarrollo local | `npm start` | http://localhost:3000 |
| Producción (Vercel) | Push a `main` → despliegue automático | https://mi-proyecto-react-xxxx.vercel.app |
| Producción (InfinityFree) | `npm run build` + subida manual por FTP | https://miproyecto.rf.gd |

---

## 9. Control de versiones

El proyecto usa **Git + GitHub** con una rama por ejercicio:

```
main
 ├── feature/ejercicio1_router
 ├── feature/ejercicio2_formulario
 ├── feature/ejercicio3_galeria
 ├── feature/ejercicio4_blog
 └── feature/ejercicio5_dark-mode
```

Cada rama se integra en `main` mediante **Pull Request**, dejando un historial claro y
trazable del desarrollo incremental.

---

## 10. Dependencias

| Paquete | Versión | Uso |
|---|---|---|
| `react` | ^18.2.0 | Biblioteca principal de UI |
| `react-dom` | ^18.2.0 | Renderizado en el DOM |
| `react-router-dom` | ^6.22.0 | Navegación SPA |
| `react-scripts` | 5.0.1 | Scripts de desarrollo y build (CRA) |
