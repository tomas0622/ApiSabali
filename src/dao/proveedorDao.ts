
import GetConnection from "../config/connection";
import { Proveedor } from "../models/Proveedor";

export const listar = async (): Promise<Proveedor[]> => {
    try {
        let tsql = "SELECT * FROM Proveedor";
        const pool = await GetConnection();
        let rs = await pool.query<Proveedor>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const Agregar = async (proveedor: Proveedor): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO Proveedor(nombre, direccion, telefono) VALUES('${proveedor.nombre}','${proveedor.direccion}','${proveedor.telefono}')`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Proveedor', ${proveedor.id}, 'INSERT');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs  && rsM) {
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
        let tsql = `DELETE FROM Proveedor WHERE id = ${id}`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Proveedor', ${id}, 'DELETE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        console.error('Error eliminando proveedor: ', error);
        throw error;
    }
};

export const Editar = async (pro: Proveedor, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE Proveedor SET nombre = '${pro.nombre}', direccion = '${pro.direccion}', telefono = '${pro.telefono}' WHERE id = ${id};`
        const pool = await GetConnection();
        let rs = await pool.query(tsql)
        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Proveedor', ${id}, 'UPDATE');`;
        let  rsM = await pool.query(insertMovimiento);
        if (rs && rsM) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}