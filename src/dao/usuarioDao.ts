
import GetConnection from "../config/connection";
import { Usuario } from "../models/Usuario";

export const listar = async (): Promise<Usuario[]> => {
    try {
        let tsql = "SELECT * FROM Usuario";
        const pool = await GetConnection();
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

export const Agregar = async (usuario: Usuario): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO Usuario(username, contraseña, rol) VALUES('${usuario.username}','${usuario.contraseña}','${usuario.rol}')`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Usuario', ${usuario.id}, 'INSERT');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

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