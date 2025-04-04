import {Usuario} from "../models/Usuario";
import * as usuarioDao from "../dao/usuarioDao"

export const listarUsuarios = async () : Promise<Usuario[]> => {
    try {
        let i: Usuario[] = await usuarioDao.listar();
        return i;
    } catch (error) {
        throw error;
    }
}

export const crearUsuario = async (usuario:Usuario): Promise<Usuario> =>{
    try {
        return await usuarioDao.Agregar(usuario);
    } catch (error) {
        throw error;
    }
}

export const EliminarUsuario = async (id:number): Promise<Boolean> =>{
    try {
        let i = id;
        return usuarioDao.Eliminar(i);
    } catch (error) {
        throw error;
    }
}

export const ActualizarUsuario = async (ins:Usuario, id:number): Promise<Boolean> =>{
    try {
        return await usuarioDao.Editar(ins, id);
    } catch (error) {
        throw error;
    }
}