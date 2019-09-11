
import { DialogService, MessageService, DynamicDialogRef } from 'primeng/api';

import { Component, OnInit, PipeTransform } from '@angular/core';
import { OverlayPanel} from 'primeng/overlaypanel';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { calendarioIdioma } from './../../../config/config';
import { ArticuloService } from './../../../services/articulo.service';
import { Articulo } from './../../../models/articulo.model';
import { PopupArticuloEditarComponent } from '../../../shared/components/popup-articulo-editar/popup-articulo-editar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ArticuloTipo } from './../../../models/articulo_tipo.model';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-popup-articulo-tipo',
  templateUrl: './popup-articulo-tipo.component.html',
  styleUrls: ['./popup-articulo-tipo.component.scss']
})
export class PopupArticuloTipoComponent implements OnInit {

 
  resultSave:boolean;
    cols: any[];
    selectedItem: ArticuloTipo = null;
    displayDialog: boolean;
    popItem:Articulo;
    newPopItem: boolean;
    selecteditemRegistro:ArticuloTipo= null;
    // LOADING
    loading: boolean;
    
    elemento:ArticuloTipo = null;
    elementos:ArticuloTipo[] = null;
    _id:number = 0;
    
    columns: any[];
    rows: any[];
    
      constructor(private miServico:ArticuloService, private messageService: MessageService ,public dialogService: DialogService,public ref: DynamicDialogRef ) {
    
            this.cols = [
              { field: 'tipo_articulo', header: 'Tipo'},

             ];
    
             
       
     
            }
    
      ngOnInit() {
        this.loadList();
      }
    
      onSelected(){
        console.log(this.selectedItem);
        this.ref.close(this.selectedItem);
      }
  
      /** CARGA LA LISTA **/
    
      loadList(){
        
        this.loading = true;
        try {
            this.miServico.getArticuloTipo()    
            .subscribe(resp => {
            this.elementos = resp;                 
                this.loading = false;
                console.log(resp);
            },
            error => { // error path
                console.log(error.message);
                console.log(error.status);
                this.throwAlert("error","Error: "+error.status+"  Error al cargar los registros",error.message, error.status);
             });    
        } catch (error) {
        this.throwAlert("error","Error al cargar los registros",error,error.status);
        }  
    }
     
    
    
    
    
    actualizarDatos(){
              
        try { 
            console.log(this.popItem);
          //  console.log(this.popItem.id);
            this.miServico.actualizarArticulo(this.popItem, this.popItem.id)
            .subscribe(resp => {
            this.elemento = resp;
            console.log(this.elemento);    
            this.loading = false;
            this.loadList();
            this.resultSave = true;
            },   
            error => { // error path
                console.log(error.message);
           //     console.log(error.status);
                this.throwAlert("error","Error: "+error.status,"  Error al insertar los registros",error.status);
                this.resultSave = false;
     });    
        } catch (error) {
            this.throwAlert("error","Error al cargar los registros",error,error.status);
        }
        return this.resultSave;
    }
    
    
    nuevoItem(){ 
       
        try { 
            this.miServico.setArticulo(this.popItem)
            .subscribe(resp => {
            this.elemento = resp;
            console.log(this.elemento);    
            this.loading = false;                  
            this.loadList();
            this.resultSave = true;
            },
            error => { // error path
                console.log(error.message);
                console.log(error.status);
                this.throwAlert("error","Error: "+error.status,  "Error al cargar los registros",error.status);
                this.resultSave = false;
              });    
        } catch (error) {
            this.throwAlert("error","Error al cargar los registros",error,error.status);
        }
        return this.resultSave;
            
    }
    
    
    
        
         
    
       
    
        throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
            let tipoerror:string;
    
            if(estado== "success"){
                swal({
                    type: 'success',
                    title: 'Exito',
                    text: mensaje
                  })
            }
    
            if(errorNumero =="422"){
              mensaje ="Los datos que esta tratando de guardar son iguales a los que ya poseia";
              swal({   
                  type: 'warning',
                  title: 'Atención..',
                  text: mensaje,
                  footer: motivo
                })
          }
            
            if((estado== "error")&&(errorNumero!="422")){
              if(errorNumero =="422"){
                  mensaje ="Los datos que esta tratando de guardar son iguales a los que ya poseia";
              }
              if(errorNumero =="400 "){
                  mensaje ="Bad Request ";
              }
              if(errorNumero =="404"){
                  mensaje ="No encontrado ";
              }
              if(errorNumero =="401"){
                  mensaje ="Sin autorización";
              }
              if(errorNumero =="403"){
                  mensaje =" Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ";
              }
              if(errorNumero =="405"){
                  mensaje ="Método no permitido";
              }
              if(errorNumero =="500"){
                  mensaje ="Error interno en el servidor";
              }
              if(errorNumero =="503"){
                  mensaje ="Servidor no disponible";
              }
              if(errorNumero =="502"){
                  mensaje ="Bad gateway";
              }
              
                swal({   
                    type: 'error',
                    title: 'Oops...',
                    text: mensaje,
                    footer: motivo
                  })
            }
    
    
        }
    }
    
