const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'LMS API DOCUMENT.',
      description: '백엔드에서 사용하는 api는 표시되지 않습니다. 프론트에서 call가능한 api만 표시됩니다.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // 요청 URL
      },
    ],
  },
  apis: ['routes/customerApiRoute.js', 'routes/jobsApiRoute.js', 'models/Customer.js'], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
