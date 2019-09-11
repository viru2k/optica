export class Comprobante {

    public id:string;
    public numero:string;
    public total_facturado:number;
    public iva:number;
    public total_facturado_iva:number;
    public fecha_alta:string;
    public usuario_alta_id:string;
    public comprobante_tipo_id:string;
    public comprobante_tipo:string;

    constructor( 
    id:string,
    numero:string,
    total_facturado:number,
    iva:number,
    total_facturado_iva:number,
    fecha_alta:string,
    usuario_alta_id:string,
    comprobante_tipo_id:string,
    comprobante_tipo:string,
        ) {

    this.id = id;
    this.numero = numero;
    this.total_facturado = total_facturado;
    this.iva = iva;
    this.total_facturado_iva = total_facturado_iva;
    this.fecha_alta = fecha_alta;
    this.usuario_alta_id = usuario_alta_id;
    this.comprobante_tipo_id = comprobante_tipo_id;
    this.comprobante_tipo = comprobante_tipo;


   }
}