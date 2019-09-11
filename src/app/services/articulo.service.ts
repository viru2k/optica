
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS, PARAMS } from '../config/config';
import { User } from '../models/user.model';
import { UsuarioModulo } from '../models/user-modulo.model';
import { Injectable } from '@angular/core';
import { Comprobante } from './../models/comprobante.model';
import { Articulo } from './../models/articulo.model';
import { ArticuloTipo } from '../models/articulo_tipo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {


  private url:string  = URL_SERVICIOS;

  constructor(public http: HttpClient) { }

  getMovimientoByComprobanteNro(id:number){
    return this.http.get<Comprobante[]>(this.url+'facturacion/comprobante/by/numero?id='+id);
  }

  getMovimientoByComprobanteFecha(fecha_desde:String, fecha_hasta:string){
    return this.http.get<Comprobante[]>(this.url+'facturacion/comprobante/tipo');
  }

  getComprobanteTipo(){
    return this.http.get<Comprobante[]>(this.url+'facturacion/comprobante/tipo');
  }
    
  crearComprobante(comprobante:Comprobante){
    return this.http.post<any>(this.url+'facturacion/comprobante',comprobante);
  }
    
  actualizarComprobante(comprobante:Comprobante, id:string){
    return this.http.put<any>(this.url+'facturacion/comprobante/'+id, comprobante);
  }

  actualizarMovimientoComprobante(comprobante:Comprobante, id:string){
    return this.http.put<any>(this.url+'facturacion/comprobante/movimiento/'+id, comprobante);
  }

  getArticuloTipo(){
    return this.http.get<ArticuloTipo[]>(this.url+'articulo/tipo');
  }

  setArticuloTipo(articulo:ArticuloTipo){
    return this.http.post<any>(this.url+'articulo/tipo', articulo);
  }

  actualizarArticuloTipo(articulo:ArticuloTipo, id:string){
    return this.http.put<any>(this.url+'articulo/tipo/'+id, articulo);
  }

  getArticulosActivo(id:number){
    return this.http.get<Articulo[]>(this.url+'articulo/activo');
  }

  getArticulos(){
    return this.http.get<Articulo[]>(this.url+'articulo');
  }

  setArticulo(articulo:Articulo){
    return this.http.post<any>(this.url+'articulo', articulo);
  }

  actualizarArticulo(articulo:Articulo, id:string){
    return this.http.put<any>(this.url+'articulo/'+id, articulo);
  }


}
