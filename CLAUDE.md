# Contexto del proyecto — Mi Proyecto React

## Qué es este proyecto
Aplicación React creada para los ejercicios de Alternancia (asignatura Desarrollo Web Entorno Cliente).
Todos los archivos fuente ya están creados y listos. Solo falta instalar dependencias y arrancar.

## Estado actual
- [x] Todos los archivos del proyecto creados (22 archivos)
- [x] Node.js instalado por el usuario
- [ ] `npm install` ejecutado (pendiente — hay que hacerlo la primera vez)
- [ ] App arrancada con `npm start`
- [ ] Repositorio GitHub creado y commits subidos
- [ ] Despliegue en Vercel
- [ ] Despliegue en InfinityFree por FTP

## Comandos para arrancar

```powershell
cd "C:\Users\Pedro\Desktop\REACT\mi-proyecto"
npm install       # solo la primera vez
npm start         # abre http://localhost:3000
```

## Ejercicios implementados

| # | Ejercicio | Componente principal |
|---|---|---|
| 1 | Navegación con React Router | `Navbar.jsx`, rutas en `App.jsx` |
| 2 | Formulario con validación | `Contact.jsx` |
| 3 | Galería de imágenes interactiva | `Gallery.jsx` |
| 4 | Sistema de posts dinámicos (blog) | `Blog.jsx` + `PostCard.jsx` |
| 5 | Modo oscuro/claro con variables CSS | `index.css` + `App.jsx` |

## Documentación generada
- `GUIA_DESPLIEGUE.md` — pasos para GitHub, Vercel e InfinityFree
- `DOCUMENTACION.md` — documentación técnica completa del proyecto

## Próximos pasos (en orden)
1. Cerrar y reabrir VS Code para que Node.js quede en el PATH
2. Ejecutar `npm install` en la carpeta del proyecto
3. Ejecutar `npm start` y comprobar que la app funciona en el navegador
4. Crear repositorio en GitHub y subir el código (ver `GUIA_DESPLIEGUE.md`)
5. Conectar el repo con Vercel para el despliegue automático
6. Crear cuenta en InfinityFree y subir el `build/` por FTP

## Notas importantes
- El proyecto usa **React 18** + **React Router v6**
- Las variables CSS del tema oscuro están en `src/index.css` en el selector `body.dark`
- Para que las rutas funcionen en InfinityFree hay que crear `public/.htaccess` (ver `GUIA_DESPLIEGUE.md`)
- Node.js no estaba instalado al crear el proyecto, por eso los archivos se crearon manualmente
