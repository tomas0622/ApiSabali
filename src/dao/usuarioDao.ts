import GetConnection from "../config/connection";
import { Usuario, EUsuario } from "../models/Usuario";
import { getTestConnection } from "../../tests/connection.test";

export const listar = async (): Promise<Usuario[]> => {
    try {
        let tsql = "SELECT * FROM Usuario";
        const pool = await getTestConnection();
        let rs = await pool.query<Usuario>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const Agregar = async (usuario: EUsuario): Promise<EUsuario> => {
    try {
        let tsql = `INSERT INTO Usuario(username, contraseña, rol) 
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.contraseña, INSERTED.rol
        VALUES('${usuario.username}','${usuario.contraseña}','${usuario.rol}')`;
        
        const pool = await getTestConnection();
        let rs = await pool.query(tsql);

            console.log('Resultado de la inserción:', rs.recordset);


        if (rs.recordset.length > 0) {
            const newUsuario = rs.recordset[0]; // Obtiene el usuario recién creado
            let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Usuario', ${newUsuario.id}, 'INSERT');`;
            await pool.query(insertMovimiento);

            return newUsuario; // Devuelve el usuario creado
        }

        throw new Error('No se pudo insertar el usuario');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const Eliminar = async (id: number): Promise<boolean> => {
    try {
        let tsql = `DELETE FROM Usuario WHERE id = ${id}`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Usuario', ${id}, 'DELETE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        console.error('Error eliminando usuario: ', error);
        throw error;
    }
};

export const Editar = async (us: Usuario, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE Usuario SET username = '${us.username}', contraseña = '${us.contraseña}', rol = '${us.rol}' WHERE id = ${id};`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Usuario', ${id}, 'UPDATE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}