import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

dotenv.config();

const port = process.env.PORT || 3000;

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
                        url: `http://localhost:${port}`,
                        description: 'Development server',
                  },
            ],
      },
      apis: [
            './src/api/**/*.ts',
            './src/domain/entities/**/*.ts',
            './src/domain/dtos/**/*.ts'
      ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
