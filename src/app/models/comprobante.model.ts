import { ArticuloMovimiento } from './articulo-movimiento.model';
export class Comprobante {


    public id:string;
    public numero:string;
    public total_facturado:number;
    public iva:number;
    public total_facturado_iva:number;
    public fecha_alta:string;
    public fecha_baja:string;
    public estado:string;
    public usuario_alta_id:string;
    public comprobante_tipo_id:string;
    public comprobante_tipo:string;
    public articuloMovimiento:ArticuloMovimiento[];
    public  local:string;
    constructor( 
    id:string,
    numero:string,
    total_facturado:number,
    iva:number,
    total_facturado_iva:number,
    fecha_alta:string,
    fecha_baja:string,
    estado:string,
    usuario_alta_id:string,
    comprobante_tipo_id:string,
    comprobante_tipo:string,
    articuloMovimiento:ArticuloMovimiento[],
    local:string
        ) {

    this.id = id;
    this.numero = numero;
    this.total_facturado = total_facturado;
    this.iva = iva;
    this.total_facturado_iva = total_facturado_iva;
    this.fecha_alta = fecha_alta;
    this.fecha_baja =    fecha_baja;
    this.estado = estado;
    this.usuario_alta_id = usuario_alta_id;
    this.comprobante_tipo_id = comprobante_tipo_id;
    this.comprobante_tipo = comprobante_tipo;
    this.articuloMovimiento = articuloMovimiento;
    this.local = local;
   }
}