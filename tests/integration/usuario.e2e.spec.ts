import request from 'supertest';
import { app } from '../../src/index';
import { createTestConnection, getTestConnection } from '../connection.test';

describe('Integración - Endpoint /usuarios', () => {
  let pool: any;

  beforeAll(async () => {
    // Establece la conexión a SQL Server
    pool = await createTestConnection();
  });

  afterAll(async () => {
    // Cierra la conexión después de todas las pruebas
    await pool.close();
  });

  beforeEach(async () => {
    // Limpia los registros con el mismo username antes de cada prueba
    await pool.request()
      .input('username', 'test123')
      .query('DELETE FROM Usuario WHERE username = @username');
  });

  it('INT-USER-001: Debería crear un usuario y retornar 201', async () => {
    const nuevoUsuario = {
      username: 'test123',
      contraseña: 'pass123',
      rol: 'admin',
    };

    const response = await request(app)
      .post('/api/usuario/add')
      .send(nuevoUsuario)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(nuevoUsuario.username);

    const result = await pool.request()
        .input('username', nuevoUsuario.username) // Declara el parámetro @username
        .query('SELECT * FROM Usuario WHERE username = @username'); // Ejecuta la consulta

    expect(result.recordset.length).toBe(1);
    const usuarioGuardado = result.recordset[0];
    expect(usuarioGuardado.username).toBe(nuevoUsuario.username);
    expect(usuarioGuardado.rol).toBe(nuevoUsuario.rol);
    expect(usuarioGuardado.contraseña).toBe(nuevoUsuario.contraseña);
  });
});