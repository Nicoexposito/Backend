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



