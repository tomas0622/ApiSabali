
import GetConnection from "../config/connection";
import { Venta } from "../models/Venta";
import { VMVentaDetalle } from "../models/VMVentaDetalle";

export const listar = async (): Promise<Venta[]> => {
    try {
        let tsql = "SELECT * FROM Venta";
        const pool = await GetConnection();
        let rs = await pool.query<Venta>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const listarDetalle = async (): Promise<VMVentaDetalle[]> => {
    try {
        let tsql = "SELECT v.id AS id, c.id AS idCliente, c.nombre AS nombreCliente,u.id AS idUsuario,u.username AS usernameUsuario,i.id AS idInsumo,i.nombre AS nombreInsumo,dv.cantidad AS cantidad,v.fecha AS fecha,v.totalVenta AS totalVenta, v.isCredito AS isCredito FROM Venta v JOIN Cliente c ON v.idCliente = c.id JOIN Usuario u ON v.idUsuario = u.id JOIN DetalleVenta dv ON v.id = dv.idVenta JOIN Insumo i ON dv.idInsumo = i.id;";
        const pool = await GetConnection();
        let rs = await pool.query<VMVentaDetalle>(tsql)
        if (rs) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const Agregar = async (venta: VMVentaDetalle): Promise<boolean> => {
    const pool = await GetConnection();
    const transaction = pool.transaction();

    try {
        await transaction.begin();

        // Insertar en Venta
        let ventaInsert = `
            INSERT INTO Venta (idCliente, idUsuario, fecha, totalVenta, isCredito)
            OUTPUT INSERTED.id
            VALUES ('${venta.cliente.id}', '${venta.usuario.id}', '${venta.fecha}', '${venta.totalVenta}', '${venta.isCredito ? 1 : 0}');
        `;

        let ventaId: number;

        try {
            const ventaResult = await transaction.request().query(ventaInsert);

            // Verifica que el resultado no esté vacío
            if (!ventaResult.recordset || ventaResult.recordset.length === 0) {
                throw new Error("No se pudo obtener el ID de la venta insertada.");
            }

            // Obtener el ID de la venta insertada
            ventaId = ventaResult.recordset[0].id;

        } catch (error) {
            console.error("Error al insertar en Ventaaaa:", error);
            throw error;  // Este throw activará el rollback
        }

        // Insertar cada insumo en DetalleVenta
        for (const insumoDetalle of venta.insumo) {
            let detalleInsert = `INSERT INTO DetalleVenta (idVenta, idInsumo, cantidad)
                                 VALUES ('${ventaId}', '${insumoDetalle.id}', '${venta.cantidad}');`;

            try {
                await transaction.request().query(detalleInsert);
            } catch (error) {
                console.error(`Error al insertar insumo con idInsumo ${insumoDetalle.id} en DetalleVenta:`, error);
                throw error;  // Activará el rollback si hay un error
            }
        }

        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Venta', ${ventaId}, 'INSERT');`;
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
        let deleteDetalleVenta = `DELETE FROM DetalleVenta WHERE idVenta = '${id}';`;
        await transaction.request().query(deleteDetalleVenta);

        // Eliminar la venta en Venta
        let deleteVenta = `DELETE FROM Venta WHERE id = '${id}';`;
        await transaction.request().query(deleteVenta);

        let insertMovimiento = `INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES ('Venta', ${id}, 'DELETE');`;
        await transaction.request().query(insertMovimiento);

        // Commit de la transacción
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        console.error("Error al eliminar venta:", error);
        throw error;
    }
};


// export const Editar = async (venta: VMVentaDetalle): Promise<boolean> => {
//     const pool = await GetConnection();
//     let transaction = pool.transaction();
//     await transaction.begin();

//     try {
//         // Actualizar en la tabla Venta
//         let updateVenta = `UPDATE Venta 
//                            SET idCliente = '${venta.cliente.id}', 
//                                idUsuario = '${venta.usuario.id}', 
//                                fecha = '${venta.fecha.toISOString()}', 
//                                totalVenta = '${venta.totalVenta}',
//                                isCredito = '${venta.isCredito ? 1 : 0}'
//                            WHERE id = '${venta.id}';`;

//         await transaction.request().query(updateVenta);

//         // Borrar los detalles anteriores de la venta en DetalleVenta
//         let deleteDetalleVenta = `DELETE FROM DetalleVenta WHERE idVenta = '${venta.id}';`;
//         await transaction.request().query(deleteDetalleVenta);

//         // Insertar los nuevos detalles en DetalleVenta
//         for (const insumoDetalle of venta.insumo) {
//             let insertDetalleVenta = `INSERT INTO DetalleVenta (idVenta, idInsumo, cantidad)
//                                       VALUES ('${venta.id}', '${insumoDetalle.id}', '${venta.cantidad}');`;
//             await transaction.request().query(insertDetalleVenta);
//         }

//         // Commit de la transacción
//         await transaction.commit();
//         return true;
//     } catch (error) {
//         await transaction.rollback();
//         console.error("Error al editar venta:", error);
//         throw error;
//     }
// };
