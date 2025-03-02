import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
      definition: {
            openapi: '3.0.0',
            info: {
                  title: 'Todo API',
                  version: '1.0.0',
                  description: 'A simple CRUD Todo API using Express and TypeScript',
            },
            servers: [
                  {
                        url: 'http://localhost:3000',
                        description: 'Development server',
                  },
            ],
      },
      // Path to the API docs
            apis: ['./src/api/**/*.ts', './src/domain/entities/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
