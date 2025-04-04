import request from 'supertest';
import { app } from '../../src/index';
import { createTestConnection, getTestConnection } from '../connection.test';

describe('Pruebas de Humo - Endpoint /api/usuario', () => {
    beforeAll(async () => {
        // Inicializa la conexión a la base de datos antes de las pruebas
        await createTestConnection();
    });

    afterAll(async () => {
        // Cierra la conexión a la base de datos después de las pruebas
        const pool = getTestConnection();
        await pool.close();
    });

    it('SMK-USER-001: Debería responder con 200 y un array de usuarios', async () => {
        const response = await request(app)
            .get('/api/usuario')
            .set('Accept', 'application/json');

        // Verifica que el endpoint responde con 200
        expect(response.status).toBe(200);

        // Verifica que el body es un array, sin importar si está vacío o no
        expect(Array.isArray(response.body)).toBe(true);
    });
});