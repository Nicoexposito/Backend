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

# ADR-001: Elección de base de datos

## Contexto  
Necesitamos una base de datos flexible y escalable para almacenar productos, usuarios, pedidos y otras entidades de una tienda online. El modelo puede crecer con nuevas funcionalidades y queremos evitar rigidez en la estructura.  

## Decisión  
Usaremos **MongoDB** como base de datos principal, ejecutada dentro de un contenedor Docker.  

## Consecuencias  
+ Gran flexibilidad para añadir nuevos campos y entidades sin modificar esquemas rígidos.  
+ Buena integración con entornos **Node.js** y herramientas modernas de e-commerce.  
+ Fácil de desplegar y gestionar con **Docker**.  
- Menos adecuado para consultas con muchas relaciones complejas.  
- Puede requerir optimización adicional para consultas masivas o agregaciones complicadas.  

# ADR-002: Estructura inicial del proyecto

## Contexto  
Debemos decidir cómo organizar el código del proyecto. Se puede trabajar con un **monorepo** (todo el backend, frontend y documentación en un único repositorio) o con **repositorios separados** (backend y frontend cada uno con el suyo). Queremos una estructura clara y sencilla para trabajar en equipo y desplegar cada componente de forma independiente.  

## Decisión  
Elegimos utilizar **repositorios separados**: un repositorio para el **backend** y otro para el **frontend**.  

## Consecuencias  
+ Mayor claridad e independencia entre el backend y el frontend.  
+ Despliegue y pipelines más sencillos y modulares.  
+ Cada equipo puede trabajar en un repositorio sin interferir con el otro.  
- Puede dificultar la gestión común de versiones y dependencias compartidas.  
- Se requiere más organización para mantener la coherencia entre los repositorios.  


