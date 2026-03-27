const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "Documentació de l'API del projecte e-commerce"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desenvolupament"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Token JWT obtingut al fer login"
                }
            },
            schemas: {
                Usuari: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "ID únic de l'usuari" },
                        nom: { type: "string", description: "Nom de l'usuari" },
                        primerCognom: { type: "string", description: "Primer cognom" },
                        segonCognom: { type: "string", description: "Segon cognom" },
                        email: { type: "string", format: "email", description: "Correu electrònic" },
                        contrasenya: { type: "string", description: "Contrasenya (mínim 6 caràcters)" },
                        telefon: { type: "string", description: "Telèfon (9 dígits)" },
                        rol: { type: "string", enum: ["client", "admin"], description: "Rol de l'usuari" },
                        estat: { type: "string", enum: ["actiu", "inactiu"], description: "Estat de l'usuari" }
                    }
                },
                Producte: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "ID únic del producte" },
                        name: {
                            type: "object",
                            properties: {
                                en: { type: "string", description: "Nom en anglès" },
                                es: { type: "string", description: "Nom en espanyol" }
                            }
                        },
                        equip: { type: "string", description: "Equip de futbol" },
                        color: {
                            type: "object",
                            properties: {
                                en: { type: "string", description: "Color en anglès" },
                                es: { type: "string", description: "Color en espanyol" }
                            }
                        },
                        talla: { type: "string", enum: ["XS", "S", "M", "L", "XL"], description: "Talla" },
                        preu: { type: "string", description: "Preu del producte" },
                        stock: { type: "number", description: "Estoc disponible" },
                        imageSrc: { type: "string", description: "URL de la imatge" },
                        imageAlt: { type: "string", description: "Text alternatiu de la imatge" },
                        liga: { type: "string", description: "Lliga" },
                        marca: { type: "string", description: "Marca" },
                        colorPrincipal: { type: "string", description: "Color principal" },
                        descripcio: { type: "string", description: "Descripció del producte" }
                    }
                },
                CartItem: {
                    type: "object",
                    properties: {
                        productId: { type: "string", description: "ID del producte" },
                        quantity: { type: "number", description: "Quantitat", minimum: 1 },
                        addedAt: { type: "string", format: "date-time", description: "Data d'afegir" }
                    }
                },
                Cart: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        sessionId: { type: "string", description: "ID de sessió" },
                        items: {
                            type: "array",
                            items: { "$ref": "#/components/schemas/CartItem" }
                        }
                    }
                },
                VentaItem: {
                    type: "object",
                    properties: {
                        productId: { type: "string", description: "ID del producte" },
                        nom: { type: "string", description: "Nom del producte" },
                        quantitat: { type: "number", description: "Quantitat" },
                        preu: { type: "number", description: "Preu unitari" },
                        talla: { type: "string", enum: ["XS", "S", "M", "L", "XL"], description: "Talla" }
                    }
                },
                Venta: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        userId: { type: "string", description: "ID de l'usuari" },
                        items: {
                            type: "array",
                            items: { "$ref": "#/components/schemas/VentaItem" }
                        },
                        total: { type: "number", description: "Total de la venta" },
                        estat: {
                            type: "string",
                            enum: ["pendent", "completada", "enviada", "entregada", "cancel·lada"],
                            description: "Estat de la venta"
                        },
                        metodePagament: {
                            type: "string",
                            enum: ["targeta", "paypal", "transferencia", "altres"],
                            description: "Mètode de pagament"
                        },
                        adreca: {
                            type: "object",
                            properties: {
                                carrer: { type: "string" },
                                ciutat: { type: "string" },
                                codiPostal: { type: "string" },
                                pais: { type: "string" }
                            }
                        }
                    }
                },
                Comanda: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        dataComanda: { type: "string", format: "date-time", description: "Data de la comanda" },
                        estat: {
                            type: "string",
                            enum: ["pendent", "enviada", "entregada", "cancel·lada"],
                            description: "Estat de la comanda"
                        },
                        quantitat_total: { type: "number", description: "Quantitat total" }
                    }
                },
                Pagament: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        metode: { type: "string", enum: ["targeta"], description: "Mètode de pagament" },
                        estat: {
                            type: "string",
                            enum: ["acceptat", "rebutjat", "pendent"],
                            description: "Estat del pagament"
                        },
                        dataPagament: { type: "string", format: "date-time", description: "Data del pagament" }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;