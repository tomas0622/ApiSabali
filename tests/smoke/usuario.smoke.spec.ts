import request from 'supertest';
import { app } from '../../src/index';

describe('Pruebas de Humo - Endpoint /api/usuario', () => {
    it('SMK-USER-001: Debería responder con 200 y un array de usuarios', async () => {
        const response = await request(app)
            .get('/api/usuario')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        // Verifica que el body es un array, sin importar si está vacío o no
        expect(Array.isArray(response.body)).toBe(true);
    });
});
