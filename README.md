# Backend de la botiga de samarretes de futbol.
**Descripció:**
Hola, soc en Nico i aquesta és la meva botiga de samarretes de futbol.
Versió 0.1 Alpha
Estat: Working 

## Tecnologies:
- **Backend:** Node.js
- **Base de dades:** MongoDB

## Programari:
- Node
- Git
- Docker
- Docker Compose
- Postman
- Docker Compass / TablePlus

# MongoDB a Docker
## Clona el repositori:
   git clone https://github.com/Nicoexposito/Backend.git

## Executem MongoDB amb Docker:
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest

## Comprovem l’estat del contenidor:
docker ps
  
## Connecta’t a MongoDB:
mongodb://admin:admin123@localhost:27017


## Sessió 1: Configuració inicial de l’entorn

En aquesta primera sessió es va preparar tot l’entorn de desenvolupament:

- Instal·lació i configuració de **Node.js** utilitzant **nvm** (Node Version Manager).
- Configuració inicial de l’entorn de treball a **Visual Studio Code (VSCode)**.
- Creació del repositori a **GitHub** i inicialització del projecte.
- Inici del fitxer `README.md` per documentar el progrés i les decisions del projecte.

## Sessió 2: Configuració de Docker i base de dades

Durant aquesta sessió es va treballar en la virtualització de serveis i la gestió de la base de dades:

- Instal·lació de **Docker Desktop** i **Docker Compose**.
- Creació i configuració dels contenidors de:
  - **MongoDB** com a base de dades principal.
  - **Mongo Express** com a interfície gràfica per gestionar les dades.
- Verificació del correcte funcionament i connexió entre serveis.

## Sessió 3: Disseny del domini i anàlisi del sistema

En aquesta etapa es va definir l’estructura conceptual de l’e-commerce:

- Identificació de les **entitats principals** del sistema (productes, usuaris, comandes, etc.).
- Definició d’**atributs i relacions** entre les entitats.
- Creació del **diagrama de domini (conceptual)** amb les seves **cardinalitats**.
- Emmagatzematge del diagrama en una carpeta específica dins del repositori.
- Elaboració de **dos ADRs (Architecture Decision Records)** documentant decisions clau del disseny.

## Sessió 4: Inici del backend i modelatge de dades

En aquesta sessió es va iniciar el desenvolupament del backend de l’API:

- Configuració del projecte **Node.js** amb **Express**.
- Definició dels **esquemes de dades** utilitzant **MongoDB**.
- Implementació de **validacions bàsiques** per a les dades d’entrada.
- Creació i prova d’**índexs** a les col·leccions per millorar el rendiment.

## Sessió 5: Capes, controladors i serveis

- En aquesta sessió es va aplicar l’**arquitectura en capes** al backend per millorar l’organització del codi.
- Es va crear l’estructura de carpetes `routes`, `controllers`, `services` i `models`.
- Es van implementar els **endpoints CRUD** per a l’entitat **Producte** i es va **refactoritzar `index.js`** per integrar el sistema de rutes.
- Finalment, es va comprovar el correcte funcionament de l’API utilitzant **Postman**.

## Sessió 6: Testing amb Postman i validació a MongoDB

En aquesta sessió es va verificar el correcte funcionament del CRUD de productes:
- Instal·lació de **Postman Agent Desktop** per al testing de l’API.
- Execució de les operacions CRUD a Postman:
  - **POST**: Creació de productes.
  - **GET**: Llistat de tots els productes.
  - **GET by ID**: Consulta de producte per identificador.
  - **PUT**: Actualització de productes.
  - **DELETE**: Eliminació de productes.
- Verificació a **MongoDB** (Mongo Express) del resultat de cada operació CRUD.
- Documentació amb captures de pantalla de les peticions i respostes.
