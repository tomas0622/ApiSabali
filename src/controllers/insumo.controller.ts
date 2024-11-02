import {Insumo} from "../models/Insumo";
import * as insumoDao from "../dao/insumoDao"
import { VMInsumoDetalleIP } from "../models/VMInsumoDetalleIP";

export const listarInsumos = async () : Promise<Insumo[]> => {
    try {
        let i: Insumo[] = await insumoDao.listar();
        return i;
    } catch (error) {
        throw error;
    }
}

export const listarInsumosDetallados = async () : Promise<VMInsumoDetalleIP[]> => {
    try {
        let i: VMInsumoDetalleIP[] = await insumoDao.listarDetalle();
        return i;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const crearInsumo = async (insumo:VMInsumoDetalleIP): Promise<Boolean> =>{
    try {
        return await insumoDao.Agregar(insumo);
    } catch (error) {
        throw error;
    }
}

export const EliminarInsumo = async (id:number): Promise<Boolean> =>{
    try {
        let i = id;
        return insumoDao.Eliminar(i);
    } catch (error) {
        throw error;
    }
}

export const ActualizarInsumo = async (ins:VMInsumoDetalleIP, id:number): Promise<Boolean> =>{
    try {
        return await insumoDao.Editar(ins, id);
    } catch (error) {
        throw error;
    }
}