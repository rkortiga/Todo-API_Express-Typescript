import { ConnectionPool } from 'mssql';
import { DatabaseConfig } from './DatabaseConfig';

async function initializeDatabase(): Promise<void> {
      const masterConfig = {...DatabaseConfig, database: 'master'};
      const pool = new ConnectionPool(masterConfig);

      try {
            await pool.connect();
            await pool.request().query(`
                  IF DB_ID('TodoDB') IS NULL 
                  BEGIN 
                    CREATE DATABASE TodoDB; 
                  END
            `);
            console.log('Database TodoDB is ready.');
      } catch (err) {
            console.error('Error initializing database:', err);
            process.exit(1);
      } finally {
            await pool.close();
      }
}

initializeDatabase();
