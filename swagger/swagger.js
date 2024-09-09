import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vortex IT API",
      version: "1.0.0",
      description: "API for Node Express",
    },

    contact: {
      name: "Vortex IT",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJSDoc(options);
export default specs;
