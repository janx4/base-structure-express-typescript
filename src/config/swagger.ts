// Swagger doc configuration
const swaggerConfig = {
    options: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API",
                version: "2.0.0",
                description: "...",
            },
            servers: [{ url: `http://localhost:${process.env.PORT || 8888}` }],
        },
        apis: ["../routes/*.js"],
    },
};

export default swaggerConfig;
