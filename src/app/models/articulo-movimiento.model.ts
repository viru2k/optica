export class ArticuloMovimiento {

    public id:string;
    public articulo_id:string;
    public fecha_alta:string;
    public fecha_baja:string;
    public precio:number;
    public bonificacion:number;
    public estado:string;
    public sucursal_id:string;
    public sucursal_nombre:string;
    public comprobante_id:string;    
    public numero:string;
    public total_facturado:number;
    public iva:number;
    public total_facturado_iva:number;
    public fecha_alta_comprobante:string;
    public usuario_alta_id:string;
    public comprobante_tipo_id:string;
    public comprobante_tipo:string;
    public articulo_nombre:string;
    public articulo_codigo:string;
    public articulo_tipo:string;
    public cantidad:number;
    public local:string;

    constructor( 
        id:string,
        articulo_id:string,
        fecha_alta:string,
        fecha_baja:string,
        precio:number,
        bonificacion:number,
        estado:string,
        sucursal_id:string,
        sucursal_nombre:string,
        comprobante_id:string,
        numero:string,
        total_facturado:number,
        iva:number,
        total_facturado_iva:number,
        fecha_alta_comprobante:string,
        usuario_alta_id:string,
        comprobante_tipo_id:string,
        comprobante_tipo:string,
        articulo_nombre:string,
        articulo_codigo:string,
        articulo_tipo:string,
        cantidad:number,
        local:string
        ) {

        this.id = id;
        this.articulo_id = articulo_id;
        this.fecha_alta = fecha_alta;
        this.fecha_baja = fecha_baja;
        this.precio = precio;
        this.bonificacion = bonificacion;
        this.estado = estado;
        this.sucursal_id = sucursal_id;
        this.sucursal_nombre = sucursal_nombre;
        this.comprobante_id = comprobante_id;
        this.numero = numero;
        this.total_facturado = total_facturado;
        this.iva = iva;
        this.total_facturado_iva = total_facturado_iva;
        this.fecha_alta_comprobante = fecha_alta_comprobante;
        this.usuario_alta_id = usuario_alta_id;
        this.comprobante_tipo_id = comprobante_tipo_id;
        this.comprobante_tipo = comprobante_tipo;
        this.articulo_nombre = articulo_nombre;
        this.articulo_codigo = articulo_codigo;
        this.articulo_tipo = articulo_tipo;
        this.cantidad = cantidad;
        this.local = local;
   }
}