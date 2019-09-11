export class Articulo {

    public id:string;
    public nombre:string;
    public codigo:string;
    public tipo_articulo_id:string;
    public precio:number;
    public estado_id:string;
    public estado:string;
    public tipo_articulo:string;
    constructor( 
        id:string,
        nombre:string,
        codigo:string,
        tipo_articulo_id:string,
        precio:number,
        estado_id:string,
        estado:string,
        tipo_articulo:string,
        ) {

            this.id = id;
            this.nombre = nombre;
            this.codigo = codigo;
            this.tipo_articulo_id = tipo_articulo_id;
            this.precio = precio;
            this.estado_id = estado_id;
            this.estado = estado;
            this.tipo_articulo = tipo_articulo;


   }
}