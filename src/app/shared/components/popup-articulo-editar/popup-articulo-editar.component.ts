import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/components/common/api';
import { MessageService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import swal from 'sweetalert2';
import { Articulo } from './../../../models/articulo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PopupArticuloTipoComponent } from '../popup-articulo-tipo/popup-articulo-tipo.component';

@Component({
  selector: 'app-popup-articulo-editar',
  templateUrl: './popup-articulo-editar.component.html',
  styleUrls: ['./popup-articulo-editar.component.scss'],
  providers: [MessageService,DialogService]
})
export class PopupArticuloEditarComponent implements OnInit {
  popItem:Articulo;
  es:any;
  updateDataForm: FormGroup;
  checked: boolean = false;
  constructor(public config: DynamicDialogConfig, private messageService: MessageService ,public dialogService: DialogService, public ref: DynamicDialogRef) { 
    
  }

  ngOnInit() {
    console.log(this.config.data);
    this.updateDataForm = new FormGroup({
      'codigo': new FormControl(''),
      'estado': new FormControl('EN STOCK'),      
      'estado_id': new FormControl('1'),
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'precio': new FormControl('0'),
      'tipo_articulo': new FormControl(''),
      'tipo_articulo_id': new FormControl(''),
  });
    if(this.config.data.id !=''){
      this.updateDataForm.patchValue(this.config.data);
    }
    
  }


  buscarTipoArticulo(){
  
      let data:any; 
      const ref = this.dialogService.open(PopupArticuloTipoComponent, {
      data,
       header: 'Tipo articulo', 
       width: '50%',
       height: '80%'
   });

   ref.onClose.subscribe((PopupArticuloTipoComponent:any) => {
       if (PopupArticuloTipoComponent) {
       console.log(PopupArticuloTipoComponent);
            this.updateDataForm.patchValue({tipo_articulo_id: PopupArticuloTipoComponent.id});
            this.updateDataForm.patchValue({tipo_articulo: PopupArticuloTipoComponent.tipo_articulo});
       }
   });
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
