import sql, { ConnectionPool } from 'mssql';

let pool: ConnectionPool;

export const createTestConnection = async (): Promise<ConnectionPool> => {
  if (!pool) {
    pool = await sql.connect({
      user: 'sa', // Usuario de SQL Server
      password: 'Tomas0622*', // Contraseña de SQL Server
      database: 'SabaliFlow', // Base de datos que usarás para pruebas
      server: 'localhost', // Dirección del servidor SQL Server
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    });
  }
  return pool;
};

export const getTestConnection = (): ConnectionPool => {
  if (!pool) {
    throw new Error('La conexión no ha sido inicializada. Llama a createTestConnection primero.');
  }
  return pool;
};