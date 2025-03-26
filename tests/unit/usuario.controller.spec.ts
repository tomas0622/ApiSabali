import { crearUsuario } from "../../src/controllers/usuario.controller";
import * as usuarioDao from "../../src/dao/usuarioDao";
import { Usuario } from "../../src/models/Usuario";

jest.mock('../../src/dao/usuarioDao');

describe('Pruebas Unitarias - crearUsuario', () => {
    it('UT-USER-001: Debería retornar true al crear un usuario con datos válidos', async () => {
        // Arrange: Configuramos los datos de prueba.
        const usuarioNuevo: Usuario = {id: 0, username: 'juan123', contraseña: 'pass123', rol: 'admin'};

        // Simulamos que la función Agregar del DAO retorna true.
        (usuarioDao.Agregar as jest.Mock).mockResolvedValue(true);

        // Act: Llamamos a la función crearUsuario del controlador.
        const resultado = await crearUsuario(usuarioNuevo);

        // Assert: Verificamos que el resultado sea true y que se haya llamado a Agregar con los datos correctos.
        expect(resultado).toBe(true);
        expect(usuarioDao.Agregar).toHaveBeenCalledWith(usuarioNuevo);

    });

    it('UT-USER-002: Debería lanzar un error si falla la creación del usuario', async () => {
        // Arrange: Configuramos un usuario de prueba.
        const usuarioNuevo: Usuario = { id: 0, username: 'juan123', contraseña: 'pass123', rol: 'admin' };
        const errorMessage = 'Fallo al agregar usuario';

        //Simulamos que la función Agregar lanza un error.
        (usuarioDao.Agregar as jest.Mock).mockRejectedValue(new Error(errorMessage));

        // Act & Assert: Verificamos que al llamar a crearUsuario se lance el error esperado.
        await expect(crearUsuario(usuarioNuevo)).rejects.toThrow(errorMessage);
    });
});
