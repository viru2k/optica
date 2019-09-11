

import { DialogService, MessageService } from 'primeng/api';

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
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
  providers: [MessageService,DialogService]
})
export class ArticuloComponent implements OnInit {

  resultSave:boolean;
    cols: any[];
    selectedItem: Articulo;
    displayDialog: boolean;
    popItem:Articulo;
    newPopItem: boolean;
    selecteditemRegistro:Articulo= null;
    // LOADING
    loading: boolean;
    
    elemento:Articulo = null;
    elementos:Articulo[] = null;
    _id:number = 0;
    
    columns: any[];
    rows: any[];
    
      constructor(private miServico:ArticuloService, private messageService: MessageService ,public dialogService: DialogService ) {
    
            this.cols = [
              { field: '', header: '',  width: '6%' },
              { field: 'nombre', header: 'Articulo',  width: '44%' },
              { field: 'codigo', header: 'Código' , width: '25%'} ,              
              { field: 'precio', header: 'Precio',  width: '10%' },
              { field: 'tipo_articulo', header: 'Tipo' , width: '10%' },
              { field: 'estado', header: 'Estado',  width: '10%' },
            
             ];
    
             
        this.columns = [
            {title: "Nombre", dataKey: "nombre"},
            {title: "Apellido", dataKey: "apellido"},            
            {title: "Fecha nacimiento", dataKey: "fecha_matricula"},
            {title: "Domicilio", dataKey: "domicilio"},
            {title: "Celular", dataKey: "telefono_cel"}
        ];
     
            }
    
      ngOnInit() {
        this.loadList();
      }
    
      accion(elementos:any){
          this.selecteditemRegistro = elementos;
      
        }
  
      
      showDialogToAdd() {
        this.popItem = new Articulo('','','','',0,'','','');
          let data:any; 
          data = this.popItem;
          const ref = this.dialogService.open(PopupArticuloEditarComponent, {
          data,
           header: 'Crear /Modificar registro', 
           width: '95%',
           height: '90%'
       });
    
       ref.onClose.subscribe((PopupArticuloEditarComponent : Articulo) => {
           if (PopupArticuloEditarComponent) {
           console.log(PopupArticuloEditarComponent);    
                this.popItem = PopupArticuloEditarComponent;
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
        this.popItem = new Articulo(event.id,event.nombre,event.codigo,event.tipo_articulo_id,event.precio,event.estado_id,event.estado,event.tipo_articulo);
                    
        let data:any; 
        console.log(this.popItem);
        data = this.popItem;
        const ref = this.dialogService.open(PopupArticuloEditarComponent, {
         data,
          header: 'Crear /Modificar registro', 
          width: '95%',
          height: '90%'
      });
    
      ref.onClose.subscribe((PopupArticuloEditarComponent:Articulo) => {
          if (PopupArticuloEditarComponent) {
          console.log(PopupArticuloEditarComponent);
          this.popItem = PopupArticuloEditarComponent;
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
            this.miServico.getArticulos()    
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
    
