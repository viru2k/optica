
import { DialogService, MessageService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

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
import { Comprobante } from './../../../models/comprobante.model';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-popup-comprobante-tipo',
  templateUrl: './popup-comprobante-tipo.component.html',
  styleUrls: ['./popup-comprobante-tipo.component.scss']
})
export class PopupComprobanteTipoComponent implements OnInit {

  
  resultSave:boolean;
    cols: any[];
    selectedItem: Articulo;
    displayDialog: boolean;
    popItem:Articulo;
    newPopItem: boolean;
    selecteditemRegistro:Articulo= null;
    // LOADING
    loading: boolean;
    
    elemento:Comprobante = null;
    elementos:Comprobante[] = null;
    _id:number = 0;
    
    columns: any[];
    rows: any[];
    
      constructor(private miServico:ArticuloService, private messageService: MessageService ,public dialogService: DialogService,public ref: DynamicDialogRef, public config: DynamicDialogConfig ) {
    
            this.cols = [              
              { field: 'tipo', header: 'Tipo',  width: '40%' },
              { field: 'proximo_numero', header: 'Proximo nº' , width: '30%'} ,              
              { field: 'ultimo_numero', header: 'Ultomo nº',  width: '30%' },
                    
            
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
  
        onRowSelect(event) {  
          this.selectedItem = event.data;
          console.log(this.selectedItem);
          this.ref.close(this.selectedItem);
      }
    
      /** CARGA LA LISTA **/
    
      loadList(){
        
        this.loading = true;
        try {
            this.miServico.getComprobanteTipo()    
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