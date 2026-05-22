# Guía de Despliegue — Pasos que debes hacer tú

Esta guía cubre los pasos manuales que no se pueden automatizar: instalar Node.js,
subir commits a GitHub, conectar con Vercel y desplegar por FTP en InfinityFree.

---

## 1. Instalar Node.js (requisito previo)

1. Ve a **https://nodejs.org** y descarga la versión **LTS** (la recomendada).
2. Ejecuta el instalador y acepta las opciones por defecto.
3. Abre una nueva ventana de PowerShell o CMD y verifica:
   ```
   node --version
   npm --version
   ```
   Deberías ver algo como `v20.x.x` y `10.x.x`.

---

## 2. Instalar dependencias y arrancar en local

```powershell
# Entra en la carpeta del proyecto
cd "C:\Users\Pedro\Desktop\REACT\mi-proyecto"

# Instala todas las dependencias (react, react-router-dom, etc.)
npm install

# Arranca el servidor de desarrollo (abre http://localhost:3000)
npm start
```

> La aplicación se recargará automáticamente cada vez que guardes un cambio.

---

## 3. Generar el build de producción

```powershell
npm run build
```

Esto crea la carpeta `build/` con los archivos estáticos optimizados listos para subir a cualquier servidor.

---

## 4. Control de versiones con GitHub

### 4.1 Crear el repositorio en GitHub

1. Ve a **https://github.com** e inicia sesión.
2. Haz clic en **"New repository"** (botón verde arriba a la derecha).
3. Ponle nombre, por ejemplo `mi-proyecto-react`.
4. Déjalo en **Public** y **NO** marques "Initialize this repository".
5. Haz clic en **"Create repository"**.

### 4.2 Inicializar Git y primer commit

```powershell
cd "C:\Users\Pedro\Desktop\REACT\mi-proyecto"

git init
git branch -M main

# Añade el repositorio remoto (sustituye TU-USUARIO por tu nombre de GitHub)
git remote add origin https://github.com/TU-USUARIO/mi-proyecto-react.git

# Primer commit
git add .
git commit -m "feat: estructura inicial del proyecto React"
git push -u origin main
```

### 4.3 Flujo de trabajo por ejercicio (ramas y Pull Requests)

El enunciado exige commits organizados por ejercicio. Sigue este flujo:

```powershell
# Crear rama para un ejercicio
git checkout -b feature/ejercicio1_router

# ... haces cambios ...

git add .
git commit -m "feat(router): añade React Router con rutas Inicio, Servicios, Contacto"
git push origin feature/ejercicio1_router
```

Luego en GitHub:
1. Ve a tu repositorio → pestaña **"Pull requests"** → **"New pull request"**.
2. Selecciona `base: main` ← `compare: feature/ejercicio1_router`.
3. Escribe una descripción y haz clic en **"Create pull request"**.
4. Haz clic en **"Merge pull request"** → **"Confirm merge"**.

Repite para cada ejercicio con sus ramas:

| Ejercicio | Nombre de rama sugerido |
|---|---|
| Ejercicio 1 — React Router | `feature/ejercicio1_router` |
| Ejercicio 2 — Formulario validación | `feature/ejercicio2_formulario` |
| Ejercicio 3 — Galería imágenes | `feature/ejercicio3_galeria` |
| Ejercicio 4 — Blog dinámico | `feature/ejercicio4_blog` |
| Ejercicio 5 — Modo oscuro | `feature/ejercicio5_dark-mode` |

---

## 5. Despliegue en Vercel (automático desde GitHub)

1. Ve a **https://vercel.com** y crea una cuenta (puedes usar tu cuenta de GitHub).
2. En el dashboard haz clic en **"Add New… → Project"**.
3. Selecciona **"Import Git Repository"** y elige `mi-proyecto-react`.
4. Vercel detectará automáticamente que es un proyecto Create React App.
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Haz clic en **"Deploy"**.
6. En 1-2 minutos tendrás una URL pública tipo `https://mi-proyecto-react-xxxx.vercel.app`.

> A partir de ahora, cada `git push` a `main` desplegará automáticamente la nueva versión.

---

## 6. Despliegue manual por FTP en InfinityFree

### 6.1 Crear cuenta en InfinityFree

1. Ve a **https://www.infinityfree.com** y haz clic en **"Register"**.
2. Verifica tu email y crea una cuenta gratuita.
3. Desde el panel, crea un **"Hosting Account"** (elige un subdominio gratuito, p. ej. `miproyecto.rf.gd`).
4. Espera unos minutos a que se active.

### 6.2 Obtener credenciales FTP

1. Desde el panel de InfinityFree, entra en tu cuenta de hosting.
2. Ve a la sección **"FTP Accounts"** (o el panel de control).
3. Anota los datos:
   - **FTP Host:** algo como `ftpupload.net`
   - **FTP Username:** tu usuario (p. ej. `epiz_XXXXXXX`)
   - **FTP Password:** la que pusiste al crear la cuenta
   - **Directorio remoto:** `/htdocs`

### 6.3 Subir los archivos

**Opción A — Con FileZilla (recomendado):**

1. Descarga **FileZilla** en https://filezilla-project.org.
2. Ábrelo y rellena arriba:
   - **Host:** el FTP Host de InfinityFree
   - **Username / Password:** los de FTP
   - **Port:** 21
3. Haz clic en **"Quickconnect"**.
4. En el panel izquierdo (local) navega hasta `C:\Users\Pedro\Desktop\REACT\mi-proyecto\build\`.
5. En el panel derecho (remoto) entra en la carpeta `/htdocs`.
6. Selecciona **todos los archivos** de `build/` y arrástralos al panel derecho.
7. Espera a que la transferencia termine.

**Opción B — Desde PowerShell (sin software extra):**

```powershell
# Instala el módulo WinSCP (solo la primera vez)
Install-Module -Name WinSCP -Scope CurrentUser

# Conecta y sube archivos
$session = New-Object WinSCP.Session
$session.Open("ftp://USUARIO:CONTRASEÑA@ftpupload.net/")
$session.PutFiles("C:\Users\Pedro\Desktop\REACT\mi-proyecto\build\*", "/htdocs/").Check()
$session.Dispose()
```

### 6.4 Configurar rutas para SPA (importante)

Como React Router usa rutas del lado del cliente, InfinityFree necesita un archivo `.htaccess`
para redirigir todas las peticiones al `index.html`.

Crea el archivo `C:\Users\Pedro\Desktop\REACT\mi-proyecto\public\.htaccess` con este contenido:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

Luego vuelve a ejecutar `npm run build` y sube el `build/` con FileZilla como antes.

---

## Resumen de URLs a entregar

| Elemento | URL |
|---|---|
| Repositorio GitHub | `https://github.com/TU-USUARIO/mi-proyecto-react` |
| Despliegue Vercel | `https://mi-proyecto-react-xxxx.vercel.app` |
| Despliegue InfinityFree | `https://miproyecto.rf.gd` (el subdominio que elegiste) |
