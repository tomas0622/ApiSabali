import { Cliente } from "./Cliente";
import { Usuario } from "./Usuario";
import { VMInsumoDetalleIP } from "./VMInsumoDetalleIP";

export interface VMVentaDetalle {
    id: number;
    cliente: {id:number, nombre:string};
    usuario: {id:number, username:string};
    insumo: VMInsumoDetalleIP[];
    cantidad: number;
    fecha: Date;
    totalVenta: number;
    isCredito: boolean;
}