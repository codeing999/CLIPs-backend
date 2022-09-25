const swaggerAutogen = require("swagger-autogen")();
const swaggerJsdoc = require("swagger-jsdoc");

const doc = {
  info: {
    title: "API",
    description: "CLIPs API",
  },
  servers: [
    {
      url: "localhost:3000",
    },
  ],
  schemes: ["http"],
//   securityDefinitions: {
//     bearerAuth: {
//       type: "http",
//       scheme: "bearer",
//       in: "header",
//       bearerFormat: "JWT",
//     },
//   },
};

const specs = swaggereJsdoc(doc)
const outputFile = "./swagger-output.json";
const endpointsFiles = ["../app.js"];

swaggerAutogen(outputFile, endpointsFiles, specs);
