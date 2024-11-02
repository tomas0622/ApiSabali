import {Proveedor} from "../models/Proveedor";
import * as proveedorDao from "../dao/proveedorDao"

export const listarProveedores = async () : Promise<Proveedor[]> => {
    try {
        let i: Proveedor[] = await proveedorDao.listar();
        return i;
    } catch (error) {
        throw error;
    }
}

export const crearProveedor = async (proveedor:Proveedor): Promise<Boolean> =>{
    try {
        return await proveedorDao.Agregar(proveedor);
    } catch (error) {
        throw error;
    }
}

export const EliminarProveedor = async (id:number): Promise<Boolean> =>{
    try {
        let i = id;
        return proveedorDao.Eliminar(i);
    } catch (error) {
        throw error;
    }
}

export const ActualizarProveedor = async (pro:Proveedor, id:number): Promise<Boolean> =>{
    try {
        return await proveedorDao.Editar(pro, id);
    } catch (error) {
        throw error;
    }
}