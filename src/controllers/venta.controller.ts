import {Venta} from "../models/Venta";
import * as ventaDao from "../dao/ventaDao"
import { VMVentaDetalle } from "../models/VMVentaDetalle";

export const listarVentas = async () : Promise<Venta[]> => {
    try {
        let i: Venta[] = await ventaDao.listar();
        return i;
    } catch (error) {
        throw error;
    }
}

export const listarVentasDetalle = async () : Promise<VMVentaDetalle[]> => {
    try {
        let i: VMVentaDetalle[] = await ventaDao.listarDetalle();
        return i;
    } catch (error) {
        throw error;
    }
}

export const crearVenta = async (venta:VMVentaDetalle): Promise<Boolean> =>{
    try {
        return await ventaDao.Agregar(venta);
    } catch (error) {
        throw error;
    }
}

export const EliminarVenta = async (id:number): Promise<Boolean> =>{
    try {
        let i = id;
        return ventaDao.Eliminar(i);
    } catch (error) {
        throw error;
    }
}

// export const ActualizarVenta = async (ins:VMVentaDetalle, id:number): Promise<Boolean> =>{
//     try {
//         return await ventaDao.Editar(ins, id);
//     } catch (error) {
//         throw error;
//     }
// }