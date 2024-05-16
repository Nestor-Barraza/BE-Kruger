# Backend Kruger Test

Desarrollado por `Nestor Barraza`.

## Descripción

El proyecto "Backend Kruger Test" es una aplicación backend desarrollada con Node.js y TypeScript. Proporciona una API robusta y escalable para su integración con el frontend.
Requisitos previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

Node.js (versión 14 o superior)

`npm install`

Sigue estos pasos para configurar el proyecto en tu entorno local:

### Clona este repositorio en tu máquina local:

`git clone https://github.com/Nestor-Barraza/backend-kruger-test.git`

### Navega hasta el directorio del proyecto:

`cd backend-kruger-test`

### Instala las dependencias del proyecto:

`npm install`

## Configuración:

Antes de ejecutar el proyecto, debes configurar las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y proporciona los siguientes valores:

`BASE_URL=<URL_BASE>`
`CLUSTER_URL=<URL_CLUSTER>`
`JWT_SECRET=<SECRETO_JWT>`
`JWT_EXPIRES_IN=<EXPIRACION_JWT>`
`ALLOWED_ORIGINS=<ALLOWED_ORIGINS>`

Reemplaza `<URL_BASE>`, `<URL_CLUSTER>`, `<SECRETO_JWT>`, `<ALLOWED_ORIGINS>` y `<EXPIRACION_JWT>` con los valores adecuados para tu entorno.

## Ejecución del proyecto

Una vez que hayas completado la instalación y configuración, puedes ejecutar el proyecto utilizando los siguientes comandos:

### Para iniciar el servidor en modo de producción:

`npm start`

### Para iniciar el servidor en modo de desarrollo con recarga automática:

`npm run dev`
