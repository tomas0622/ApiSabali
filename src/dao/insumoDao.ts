
import GetConnection from "../config/connection";
import { Insumo } from "../models/Insumo";
import { VMInsumoDetalleIP } from "../models/VMInsumoDetalleIP";

export const listar = async (): Promise<Insumo[]> => {
    try {
        let tsql = "SELECT * FROM Insumo";
        const pool = await GetConnection();
        let rs = await pool.query<Insumo>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const listarDetalle = async (): Promise<VMInsumoDetalleIP[]> => {
    try {
        let tsql = "SELECT I.id, I.nombre, I.descripcion, Dip.idProveedor, Dip.precioUnitario, Dip.stock FROM Insumo I INNER JOIN DetalleInsumoProveedor Dip ON I.id = Dip.idInsumo";
        const pool = await GetConnection();
        let rs = await pool.query<VMInsumoDetalleIP>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const Agregar = async (insumo: VMInsumoDetalleIP): Promise<boolean> => {
    const pool = await GetConnection();
    const transaction = pool.transaction();

    try {
        await transaction.begin();

        // Insertar en Insumo
        let insumoInsert = `
            INSERT INTO Insumo (nombre, descripcion)
            OUTPUT INSERTED.id
            VALUES ('${insumo.nombre}', '${insumo.descripcion}');
        `;

        let insumoId: number;

        try {
            const insumoResult = await transaction.request().query(insumoInsert);

            // Verifica que el resultado no esté vacío
            if (!insumoResult.recordset || insumoResult.recordset.length === 0) {
                throw new Error("No se pudo obtener el ID de el insumo insertado.");
            }

            // Obtener el ID de la venta insertada
            insumoId = insumoResult.recordset[0].id;

        } catch (error) {
            console.error("Error al insertar en Insumo:", error);
            throw error;  // Este throw activará el rollback
        }


        let detalleInsert = `INSERT INTO DetalleInsumoProveedor (idInsumo, idProveedor, precioUnitario, stock)
                                 VALUES ('${insumoId}', '${insumo.idProveedor}', '${insumo.precioUnitario}', '${insumo.stock}');`;

        try {
            await transaction.request().query(detalleInsert);
        } catch (error) {
            console.error(`Error al insertar insumo con idInsumo ${insumoId} en DetalleInsumoProveedor:`, error);
            throw error;  // Activará el rollback si hay un error
        }

        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Insumo', ${insumoId}, 'INSERT');`;
        await transaction.request().query(insertMovimiento);
        
        // Commit de la transacción
        await transaction.commit();
        return true;

    } catch (error) {
        await transaction.rollback();
        console.error("TransactionError: Transacción abortada:", error);
        throw error;
    } finally {
        pool.close();
    }
};

export const Eliminar = async (id: number): Promise<boolean> => {
    const pool = await GetConnection();
    let transaction = pool.transaction();
    await transaction.begin();

    try {
        // Eliminar detalles de la venta en DetalleVenta
        let deleteDetalleInsumoProveedor = `DELETE FROM DetalleInsumoProveedor WHERE idInsumo = '${id}';`;
        await transaction.request().query(deleteDetalleInsumoProveedor);

        // Eliminar la venta en Venta
        let deleteInsumo = `DELETE FROM Insumo WHERE id = '${id}';`;
        await transaction.request().query(deleteInsumo);

        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Insumo', ${id}, 'DELETE');`;
        await transaction.request().query(insertMovimiento);

        // Commit de la transacción
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        console.error("Error al eliminar insumo:", error);
        throw error;
    }
};

export const Editar = async (insumo: VMInsumoDetalleIP, id: number): Promise<boolean> => {
    const pool = await GetConnection();
    let transaction = pool.transaction();

    try {
        await transaction.begin();

        // Actualizar en la tabla Insumo
        let updateInsumo = `UPDATE Insumo 
                           SET nombre = '${insumo.nombre}', 
                               descripcion = '${insumo.descripcion}' 
                           WHERE id = '${id}';`;

        await transaction.request().query(updateInsumo);

        // Borrar los detalles anteriores de la venta en DetalleVenta
        let deleteDetalleVenta = `DELETE FROM DetalleInsumoProveedor WHERE idInsumo = '${id}';`;
        await transaction.request().query(deleteDetalleVenta);

        let insertDetalleInsumo = `INSERT INTO DetalleInsumoProveedor (idInsumo, idProveedor, precioUnitario, stock)
                                 VALUES ('${id}', '${insumo.idProveedor}', '${insumo.precioUnitario}', '${insumo.stock}');`;
        await transaction.request().query(insertDetalleInsumo);

        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Insumo', ${id}, 'UPDATE');`;
        await transaction.request().query(insertMovimiento);

        // Commit de la transacción
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        console.error("Error al editar venta:", error);
        throw error;
    }
};