import { DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

import { Component, OnInit, PipeTransform } from '@angular/core';
import { OverlayPanel} from 'primeng/overlaypanel';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { calendarioIdioma } from './../../../config/config';
import { ArticuloService } from './../../../services/articulo.service';
import { PopupArticuloEditarComponent } from '../../../shared/components/popup-articulo-editar/popup-articulo-editar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ArticuloTipo } from './../../../models/articulo_tipo.model';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-popup-articulo-tipo-editar',
  templateUrl: './popup-articulo-tipo-editar.component.html',
  styleUrls: ['./popup-articulo-tipo-editar.component.scss'],
  providers: [MessageService,DialogService]
})
export class PopupArticuloTipoEditarComponent implements OnInit {
  opItem:ArticuloTipo;
  es:any;
  updateDataForm: FormGroup;
  checked: boolean = false;
  constructor(public config: DynamicDialogConfig, private messageService: MessageService ,public dialogService: DialogService, public ref: DynamicDialogRef) { 
    
  }

  ngOnInit() {
    console.log(this.config.data);
    this.updateDataForm = new FormGroup({
      'id': new FormControl(''),
      'tipo_articulo': new FormControl(''),
  });
    if(this.config.data){
      this.updateDataForm.patchValue(this.config.data);
    }
    
  }



  guardarDatos(){
    this.config.data = this.updateDataForm.value;
    console.log(this.config.data);
    this.ref.close(this.updateDataForm.value);
  }

  throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
    let tipoerror:string;
  
    if(estado== 'success'){
        swal({
            type: 'success',
            title: 'Exito',
            text: mensaje
          })
    }
  
  
  
    if(estado== 'warning'){
      swal({
          type: 'warning',
          title: 'Cuidado!',
          text: mensaje
        })
  }
    if(estado== 'error'){
      if(errorNumero =='422'){
          mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
      }
      if(errorNumero =='400 '){
          mensaje ='Bad Request ';
      }
      if(errorNumero =='404'){
          mensaje ='No encontrado ';
      }
      if(errorNumero =='401'){
          mensaje ='Sin autorización';
      }
      if(errorNumero =='403'){
          mensaje =' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
      }
      if(errorNumero =='405'){
          mensaje ='Método no permitido';
      }
      if(errorNumero =='500'){
          mensaje ='Error interno en el servidor';
      }
      if(errorNumero =='503'){
          mensaje ='Servidor no disponible';
      }
      if(errorNumero =='502'){
          mensaje ='Bad gateway';
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
