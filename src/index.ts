import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import todoRouter from './api/routes/todo-router';
import { AppDataSource } from './infrastructure/configurations/app-data-source';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/todos', todoRouter);

AppDataSource.initialize()
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server is running on port ${PORT}`);
                  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
            });
      })
      .catch((error) => console.error('Connection error: ', error));