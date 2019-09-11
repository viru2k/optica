
import { DialogService, MessageService } from 'primeng/api';

import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  formatDate } from '@angular/common';
import swal from 'sweetalert2';

import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [MessageService,DialogService]
})
export class UsuarioComponent implements OnInit {

  
  resultSave:boolean;
  cols: any[];
  selectedItem: User;
  displayDialog: boolean;
  popItem:User;
  newPopItem: boolean;
  // LOADING
  loading: boolean;
  
  elemento:User = null;
  elementos:User[] = null;
  _id:number = 0;
  
  columns: any[];
  rows: any[];
  
    constructor(private miServico:UserService, private messageService: MessageService ,public dialogService: DialogService ) {
  
          this.cols = [
              { field: 'nombreyapellido', header: 'Apellido y nombre' },
              {field: 'name', header: 'usuario' },                                                                      
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
  
  
    
    showDialogToAdd() {
      /* this.popItem = new Medico("","","",new Date(),"","","","","","","","",[],'');
        let data:any; 
        data = this.popItem;
        const ref = this.dialogService.open(PopupMedicoEditComponent, {
        data,
         header: 'Crear /Modificar registro', 
         width: '95%',
         height: '90%'
     });
  
     ref.onClose.subscribe((PopupMedicoComponent:Medico) => {
         if (PopupMedicoComponent) {
         console.log(PopupMedicoComponent);    
              this.popItem = PopupMedicoComponent;
         if( this.nuevoItem()){
            this.throwAlert("success","Se creo el registro con éxito","","");
           } 
         }
     }); */
  
  }
  
  showDialogToUpdate(event) {
    /*   console.log(event);
      this.popItem = new Medico(event.data.apellido,event.data.nombre,event.data.domicilio,event.data.fecha_matricula,event.data.telefono, event.data.telefono_cel,
          event.data.email,event.data.email_laboral,event.data.cuit, event.data.ing_brutos,event.data.usuario_id,event.data.id,event.data.ObraSocial,event.data.codgo_old);
                  
      let data:any; 
      console.log(this.popItem);
      data = this.popItem;
      const ref = this.dialogService.open(PopupMedicoEditComponent, {
       data,
        header: 'Crear /Modificar registro', 
        width: '95%',
        height: '90%'
    });
  
    ref.onClose.subscribe((PopupMedicoComponent:Medico) => {
        if (PopupMedicoComponent) {
        console.log(PopupMedicoComponent);
        this.popItem = PopupMedicoComponent;
       if( this.actualizarDatos()){
        this.throwAlert("success","Se modifico el registro con éxito","","");
       }
        }
    }); */
  }
  
    /** CARGA LA LISTA **/
  
    loadList(){
      
      this.loading = true;
      try {
          this.miServico.getItems()    
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
          this.miServico.putItem(this.popItem, this.popItem.id)
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
     
   /*    try { 
          this.miServico.postItem(this.popItem)
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
      return this.resultSave; */
          
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
  