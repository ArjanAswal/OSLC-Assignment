const url = process.env.SERVER_URL ?? 'http://localhost';

module.exports = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'Node.js Assignment API',
      version: '1.0',
      contact: {
        name: 'Arjan Aswal',
        email: 'arjanaswal@gmail.com',
        url: 'https://www.arjanaswal.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
      {
        url: url + '/',
        description: 'API server',
      },
    ],
  },
  apis: ['./src/routes/*', './src/models/*', './src/controllers/*'],
};
