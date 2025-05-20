# 🌳 DevTree (en desarrollo)

DevTree será un clon de Linktree: una plataforma que permitirá a los usuarios crear una página pública con enlaces personalizados a sus redes sociales y contenido.

Actualmente, este proyecto está en desarrollo.

---

## 🧠 Descripción del proyecto

El objetivo es construir una aplicación fullstack con autenticación, creación de perfiles, subida de imágenes y ordenamiento dinámico de enlaces.

Permitirá:

- Registro e inicio de sesión
- Personalización de perfil (nombre, foto, descripción)
- Agregar enlaces a redes sociales
- Compartir una página pública con tu "devtree"

---

## 📦 Stack Tecnológico (planeado)

- **Frontend:** React, Tailwind CSS, React Router (posiblemente migrar a Next.js en futuros proyectos)
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB con Mongoose
- **Gestión de datos:** React Query
- **Autenticación:** JWT (JSON Web Token)
- **Almacenamiento de imágenes:** Cloudinary


## 💻 Backend

El backend se desarrollará en un **repositorio separado**, utilizando Node.js y Express. Proporcionará una API RESTful para interactuar con el frontend.
> 🔗 [https://github.com/fernandohuerta824/devtree](https://github.com/fernandohuerta824/devtree)

## 💻 Frontend

En este repositorio se desarrollará el frontend de la aplicación utilizando React y Tailwind CSS. Se encargará de la interfaz de usuario y la interacción con la API del backend. Para el routing se utilizará React Router, y para la conexión con el backend se utilizará TanStack Query. El frontend permitirá a los usuarios registrarse, iniciar sesión, personalizar su perfil y agregar enlaces a sus redes sociales. Ademas de acceder y/o compartir su "devtree" con otras personas.

_

## 🚀 Instalación
1. Clona el repositorio:
   ```bash
   git clone
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables necesarias. Puedes usar el archivo `.env.example` como referencia.

   
4. Inicializa el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

6. Para interactuar con la API del backend, asegúrate de que el servidor del backend esté corriendo en `http://localhost:8080` 



## 🚧 Estado Actual (RoadMap)


- [x] Inicializar el repositorio
- [x] Configurar el entorno de desarrollo
- [x] Configurar Tailwind CSS
- [x] Crear la estructura básica de la aplicación
- [x] Implementar el registro de usuarios
- [ ] Implementar el inicio de sesión
- [ ] Implementar la personalización del perfil
- [ ] Implementar la subida de imágenes

-- Se andarán más tareas a medida que avance el desarrollo --

 
## 📂 Estructura del proyecto

```bash
├── public/                # Archivos estáticos
├── src/                   # Código fuente de la aplicación
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── hooks/              # Hooks personalizados
│   ├── services/          # Servicios para interactuar con la API
│   ├── utils/             # Utilidades y funciones auxiliares
│   ├── App.jsx            # Componente principal de la aplicación
│   ├── router.jsx         # Configuración de rutas con React Router
│   ├── index.jsx          # Punto de entrada de la aplicación
│   └── index.css          # Estilos globales y configuración de Tailwind CSS
├── tailwind.config.js      # Configuración de Tailwind CSS
├── postcss.config.js       # Configuración de PostCSS
├── eslint.config.js         # Configuración de ESLint


## 🧑🏾 Autor
- **Fernando Huerta** - [https://github.com/fernandohuerta824]




