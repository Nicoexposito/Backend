# Backend de la tienda de camisetas de fútbol.
**Descripcion:**
Hola, soy Nico y esta es mi tienda de camisetas de futbol.
Version 0.1 Alpha
Estado: Working 

## Tecnologías:
- **Backend:** Node.js
- **Base de datos:** MongoDB

## Software:
- Node
- Git
- Docker
- Docker Compose
- Postman
- Docker Compass / TablePlus

# MongoDB a Docker
## Clona el repositori:
   git clone https://github.com/usuari/projecte-mongodb-docker.git

## Executem MongoDB amb Docker:
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest

## Comprovem el estat del contenidor:
docker ps
  
## Connecta’t a MongoDB:
mongodb://admin:admin123@localhost:27017


## Sesión 1: Configuración inicial del entorno

En esta primera sesión se preparó todo el entorno de desarrollo:

- Instalación y configuración de **Node.js** utilizando **nvm** (Node Version Manager).
- Configuración inicial del entorno de trabajo en **Visual Studio Code (VSCode)**.
- Creación del repositorio en **GitHub** e inicialización del proyecto.
- Inicio del archivo `README.md` para documentar el progreso y las decisiones del proyecto.

## Sesión 2: Configuración de Docker y base de datos

Durante esta sesión se trabajó en la virtualización de servicios y la gestión de la base de datos:

- Instalación de **Docker Desktop** y **Docker Compose**.
- Creación y configuración de los contenedores de:
  - **MongoDB** como base de datos principal.
  - **Mongo Express** como interfaz gráfica para gestionar los datos.
- Verificación del correcto funcionamiento y conexión entre servicios.

## Sesión 3: Diseño del dominio y análisis del sistema

En esta etapa se definió la estructura conceptual del e-commerce:

- Identificación de las **entidades principales** del sistema (productos, usuarios, pedidos, etc.).
- Definición de **atributos y relaciones** entre las entidades.
- Creación del **diagrama de dominio (conceptual)** con sus **cardinalidades**.
- Almacenamiento del diagrama en una carpeta específica dentro del repositorio.
- Elaboración de **dos ADRs (Architecture Decision Records)** documentando decisiones clave del diseño.

## Sesión 4: Inicio del backend y modelado de datos

En esta sesión se inició el desarrollo del backend de la API:

- Configuración del proyecto **Node.js** con **Express**.
- Definición de los **esquemas de datos** utilizando **MongoDB**.
- Implementación de **validaciones básicas** para los datos de entrada.
- Creación y prueba de **índices** en las colecciones para mejorar el rendimiento.

