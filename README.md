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

# ADR-001: Elecció de base de dades

## Context  
Necessitem una base de dades flexible i escalable per emmagatzemar productes, usuaris, comandes i altres entitats d’una botiga online. El model pot créixer amb noves funcionalitats (com valoracions, wishlist, enviaments, etc.), i volem evitar rigidesa en l’estructura.  

## Decisió  
Farem servir **MongoDB** com a base de dades principal, executada dins un contenidor Docker.  

## Conseqüències  
+ Gran flexibilitat per afegir nous camps i entitats sense modificar esquemes rígids.  
+ Bona integració amb entorns **Node.js/Express** i eines modernes d’e-commerce.  
+ Fàcil de desplegar i gestionar amb **Docker**.  
- Menys adequat per a consultes amb moltes relacions complexes.  
- Pot requerir optimització extra per consultes massives o agregacions complicades.  


