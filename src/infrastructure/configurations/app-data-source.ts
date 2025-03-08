import { DatabaseConfig } from './database-config';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
      type: 'mssql',
      host: DatabaseConfig.server,
      port: DatabaseConfig.port,
      username: DatabaseConfig.user,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: ['src/infrastructure/schema/**/*.ts'],
      synchronize: true,
      migrations: ['src/infrastructure/migrations/**/*.ts'],
      options: DatabaseConfig.options
});