import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import todoRouter from './api/routes/TodoRouter';
import { DatabaseConfig } from './infrastructure/configurations/DatabaseConfig';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/todos', todoRouter);

const AppDataSource = new DataSource({
      type: 'mssql',
      host: DatabaseConfig.server,
      port: DatabaseConfig.port,
      username: DatabaseConfig.user,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: ['src/infrastructure/entities/**/*.ts'],
      synchronize: true,
      options: DatabaseConfig.options,
});

AppDataSource.initialize()
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server is running on port ${PORT}`);
                  console.log(
                        `Swagger UI available at http://localhost:${PORT}/api-docs`
                  );
            });
      })
      .catch((error) => console.error('Connection error: ', error));
