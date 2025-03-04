import dotenv from 'dotenv';

dotenv.config();

export const DatabaseConfig = {
      user: process.env.SQL_USER as string,
      password: process.env.SQL_PASSWORD as string,
      server: process.env.SQL_SERVER as string,
      database: process.env.SQL_DATABASE as string,
      options: {
            encrypt: process.env.SQL_ENCRYPT === 'true',
            trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE === 'true'
      }
};
