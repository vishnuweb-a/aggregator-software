import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Auth API",
            version: "1.0.0",
            description: "Authentication API docs"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: [
        "./src/routes/*.js"
    ]
};

const specs = swaggerJsdoc(options);

export {
    swaggerUi,
    specs
};