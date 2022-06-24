// Swagger doc configuration
const swaggerConfig = {
    options: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "FoundMe Card API",
                version: "2.0.0",
                description: "FoundMe API for all lovely customers!",
            },
            servers: [{ url: `http://localhost:${process.env.PORT || 8080}` }],
        },
        apis: ["../routes/*.js"],
    },
};

export default swaggerConfig;
