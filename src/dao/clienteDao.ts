import GetConnection from "../config/connection";
import { Cliente } from "../models/Cliente";

export const listar = async (): Promise<Cliente[]> => {
    try {
        let tsql = "SELECT * FROM Cliente";
        const pool = await GetConnection();
        let rs = await pool.query<Cliente>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const Agregar = async (cliente: Cliente): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO Cliente(nombre, primerApellido, segundoApellido, direccion, telefono) VALUES('${cliente.nombre}','${cliente.primerApellido}','${cliente.segundoApellido}','${cliente.direccion}','${cliente.telefono}')`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Cliente', ${cliente.id}, 'INSERT');`;
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
        let tsql = `DELETE FROM Cliente WHERE id = ${id}`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Cliente', ${id}, 'DELETE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        console.error('Error eliminando cliente: ', error);
        throw error;
    }
};

export const Editar = async (cl: Cliente, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE Cliente SET nombre = '${cl.nombre}', primerApellido = '${cl.primerApellido}', segundoApellido = '${cl.segundoApellido}',  direccion = '${cl.direccion}', telefono = '${cl.telefono}' WHERE id = ${id};`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Cliente', ${id}, 'UPDATE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

export const ObtenerUltimosMovimientos = async (): Promise<any[]> => {
    const pool = await GetConnection();
    const query = `SELECT TOP 5 * FROM Movimiento ORDER BY fecha DESC;`;
    const result = await pool.query(query);
    return result.recordset;
};