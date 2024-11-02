import {Cliente} from "../models/Cliente";
import * as clienteDao from "../dao/clienteDao"
import { Movimiento } from "../models/Movimiento";

export const listarClientes = async () : Promise<Cliente[]> => {
    try {
        let i: Cliente[] = await clienteDao.listar();
        return i;
    } catch (error) {
        throw error;
    }
}

export const crearCliente = async (cliente:Cliente): Promise<Boolean> =>{
    try {
        return await clienteDao.Agregar(cliente);
    } catch (error) {
        throw error;
    }
}

export const EliminarCliente = async (id:number): Promise<Boolean> =>{
    try {
        let i = id;
        return clienteDao.Eliminar(i);
    } catch (error) {
        throw error;
    }
}

export const ActualizarCliente = async (cl:Cliente, id:number): Promise<Boolean> =>{
    try {
        return await clienteDao.Editar(cl, id);
    } catch (error) {
        throw error;
    }
}

export const GetMovimientos = async (): Promise<Movimiento[]> =>{
    try {
        let i: Movimiento[] = await clienteDao.ObtenerUltimosMovimientos();
        return i;
    } catch (error) {
        throw error;
    }
}