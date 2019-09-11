
import { DialogService, MessageService, DynamicDialogRef } from 'primeng/api';

import { Component, OnInit, PipeTransform } from '@angular/core';
import { OverlayPanel} from 'primeng/overlaypanel';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  formatDate } from '@angular/common';
import swal from 'sweetalert2';




import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PopupArticuloEditarComponent } from './../../../../shared/components/popup-articulo-editar/popup-articulo-editar.component';

import { ArticuloService } from './../../../../services/articulo.service';
import { PopupArticuloTipoEditarComponent } from '../../../../shared/components/popup-articulo-tipo-editar/popup-articulo-tipo-editar.component';
import { ArticuloTipo } from './../../../../models/articulo_tipo.model';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-articulo-tipo',
  templateUrl: './articulo-tipo.component.html',
  styleUrls: ['./articulo-tipo.component.scss'],
  providers: [MessageService,DialogService]
})
export class ArticuloTipoComponent implements OnInit {

 
  resultSave:boolean;
    cols: any[];
    selectedItem: ArticuloTipo = null;
    displayDialog: boolean;
    popItem:ArticuloTipo;
    newPopItem: boolean;
    selecteditemRegistro:ArticuloTipo= null;
    // LOADING
    loading: boolean;
    
    elemento:ArticuloTipo = null;
    elementos:ArticuloTipo[] = null;
    _id:number = 0;
    
    columns: any[];
    rows: any[];
    
      constructor(private miServico:ArticuloService, private messageService: MessageService ,public dialogService: DialogService ) {
    
            this.cols = [
              { field: '', header: '',  width: '6%' },
              { field: 'tipo_articulo', header: 'Tipo',  width: '94%'},

             ];
    
             
       
     
            }
    
            ngOnInit() {
              this.loadList();
            }
          
            accion(elementos:any){
                this.selecteditemRegistro = elementos;
            
              }
        
            
            showDialogToAdd() {
              this.popItem = new ArticuloTipo('','');
                let data:any; 
                data = this.popItem;
                const ref = this.dialogService.open(PopupArticuloTipoEditarComponent, {
                data,
                 header: 'Crear /Modificar registro', 
                 width: '95%',
                 height: '90%'
             });
          
             ref.onClose.subscribe((PopupArticuloTipoEditarComponent : ArticuloTipo) => {
                 if (PopupArticuloTipoEditarComponent) {
                 console.log(PopupArticuloTipoEditarComponent);    
                      this.popItem = PopupArticuloTipoEditarComponent;
                 if( this.nuevoItem()){
                  swal({
                    toast: false,
                    type: 'success',
                    title: 'Exito',
                    text: 'Se creo el articulo con éxito',
                    showConfirmButton: false,
                    timer: 2000
                  });
                   } 
                 }
             });
          
          }
          
          showDialogToUpdate(event) {
              console.log(event);
              this.popItem = new ArticuloTipo(event.id,event.articulo_tipo);
                          
              let data:any; 
              console.log(this.popItem);
              data = event;
              const ref = this.dialogService.open(PopupArticuloTipoEditarComponent, {
               data,
                header: 'Crear /Modificar registro', 
                width: '95%',
                height: '90%'
            });
          
            ref.onClose.subscribe((PopupArticuloTipoEditarComponent: ArticuloTipo) => {
                if (PopupArticuloTipoEditarComponent) {
                console.log(PopupArticuloTipoEditarComponent);
                this.popItem = PopupArticuloTipoEditarComponent;
               if( this.actualizarDatos()){
                swal({
                  toast: false,
                  type: 'success',
                  title: 'Exito',
                  text: 'Se modifico el árticulo con éxito',
                  showConfirmButton: false,
                  timer: 2000
                });
               }
                }
            });
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
                  this.miServico.actualizarArticuloTipo(this.popItem, this.popItem.id)
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
                  this.miServico.setArticuloTipo(this.popItem)
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
          
              /** ACCIONES */
          
              imprimirTodos(){
          
              }
          
              imprimirRenglon(){
                //  this.throwAlert("success","Se creo el registro con éxito","");
              }
          
          
              
               
          
              generarPdf(){
                  var a:any;
                  var doc = new jsPDF('l', 'pt');
                  
                  doc.autoTable(this.columns, this.elementos,
                      {
                          margin: {horizontal: 7},
                          bodyStyles: {valign: 'top'},
                          styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                          columnStyles: {text: {columnWidth: 'auto'}}
                      }
                      );
                  doc.save("table.pdf");    
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
          
      