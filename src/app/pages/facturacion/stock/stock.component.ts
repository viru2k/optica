import { Component, OnInit,Output, EventEmitter,ViewChild, PipeTransform, ElementRef, OnDestroy } from '@angular/core';
import { formatDate, CurrencyPipe, DecimalPipe } from '@angular/common';
import { config } from 'rxjs';
import swal from 'sweetalert2';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticuloMovimiento } from './../../../models/articulo-movimiento.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ArticuloService } from '../../../services/articulo.service';
import { calendarioIdioma } from './../../../config/config';
import { PopupArticuloComponent } from 'src/app/shared/components/popup-articulo/popup-articulo.component';
import { Articulo } from './../../../models/articulo.model';
import { PopupComprobanteTipoComponent } from './../../../shared/components/popup-comprobante-tipo/popup-comprobante-tipo.component';
import { Comprobante } from './../../../models/comprobante.model';




@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'], 
  providers: [MessageService,DialogService]
})
export class StockComponent implements OnInit {

  cols: any[];
  selectedItem: ArticuloMovimiento;
  newPopItem: boolean;
  resultSave:boolean;
  es:any;
  displayDialog: boolean;
  // LOADING
  loading: boolean;
  updateDataForm: FormGroup;
  formObraSocial: FormGroup;
  elemento:ArticuloMovimiento = null;
  elementos:ArticuloMovimiento[] = [];
  elementosFiltrados:ArticuloMovimiento[] = null;
  selecteditems:ArticuloMovimiento[] = [];
  comprobante:Comprobante;
  selecteditemRegistro:ArticuloMovimiento= null;
  fechaDesde:Date;
  DateForm:FormGroup;
  userData:any;
  total:number;
  cont:number = 0;
  cantidad:number =0;

  constructor(private service:ArticuloService,private messageService: MessageService ,public dialogService: DialogService  ) { 
    this.cols = [
              
      { field: 'accion', header: 'Accion' , width: '6%'} ,
      { field: 'articulo_codigo', header: '',  width: '15%' },
      { field: 'articulo_nombre', header: 'Articulo',  width: '30%' },
      {field: 'articulo_tipo', header: 'Tipo' , width: '24%' },
      { field: 'precio', header: 'Precio',  width: '10%' },     
      { field: 'cantidad', header: 'Cantidad',  width: '10%' },  
      { field: 'total_facturado', header: 'Total',  width: '10%' },  
      
     ];     

     this.DateForm = new FormGroup({
      'fecha_desde': new FormControl('', Validators.required),       
      'tipo': new FormControl(''),
      'tipo_id': new FormControl(''),  
      'proximo_numero': new FormControl(''), 
     
      });


  }

  ngOnInit() {
     this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma;
    this.fechaDesde = new Date();
    this.DateForm.patchValue({fecha_desde: this.fechaDesde});
 
    
  }

  actualizarFechaDesde(event){
    console.log(event);
    this.fechaDesde = event;
    console.log(new Date(this.fechaDesde));
  }


  buscarComprobante(){



    let data:any; 
    data = this.selecteditemRegistro;
     const ref = this.dialogService.open(PopupComprobanteTipoComponent, {
    data,
     header: 'Buscar comprobante', 
     width: '98%',
     height: '90%'
    });
  
    ref.onClose.subscribe((PopupComprobanteTipoComponent:any) => {
        if (PopupComprobanteTipoComponent) {
          console.log(PopupComprobanteTipoComponent);    
          this.DateForm.patchValue({tipo: PopupComprobanteTipoComponent.tipo});
          this.DateForm.patchValue({tipo_id: PopupComprobanteTipoComponent.id});
          this.DateForm.patchValue({proximo_numero: PopupComprobanteTipoComponent.proximo_numero});
        
         
        }
    }); 
    
  }

  GuardarComprobante(){
    let _fechaDesde = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm', 'en');
    
    let total:number = 0;
    for(let i=0;i < this.elementos.length;i++){
      total = total + Number(this.elementos[i]['total_facturado']);
    }

    console.log(this.comprobante);
    try {
          this.comprobante = new Comprobante('0',this.DateForm.value.proximo_numero,total,0,0,_fechaDesde,'','ACTIVO',this.userData['id'],this.DateForm.value.tipo_id, this.DateForm.value.tipo,this.elementos);
      this.service.crearComprobante(this.comprobante)
      .subscribe(resp => {
        console.log(resp);    
        this.DateForm.patchValue({tipo: resp[0].tipo});
        this.DateForm.patchValue({tipo_id: resp[0].id});
        this.DateForm.patchValue({proximo_numero: resp[0].proximo_numero});
          this.loading = false;
          this.elementos = [];
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          
       });    
  } catch (error) {
    //  this.throwAlert('error','error','Error: '+error.status+'  Error al cargar los registros',error.message);
  }  

  }

  agregarArticulo(){
    let data:any; 
    data = this.selecteditemRegistro;
     const ref = this.dialogService.open(PopupArticuloComponent, {
    data,
     header: 'Agregar articulo', 
     width: '98%',
     height: '90%'
    });
  
    ref.onClose.subscribe((PopupArticuloComponent:ArticuloMovimiento) => {
      let _fechaDesde = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm', 'en');
     
        if (PopupArticuloComponent) {
          console.log(PopupArticuloComponent);    
         this.cont++;
         this.cantidad++;
         PopupArticuloComponent.id = String(this.cont);
         PopupArticuloComponent.fecha_alta = _fechaDesde;
         let movimiento:ArticuloMovimiento;
         movimiento= PopupArticuloComponent;
      this.elementos.push(movimiento);
        console.log(this.elementos);
         this.sumarValores();
        }
    }); 

  }

  filtered(event){
    console.log(event.filteredValue);
    this.elementosFiltrados  = event.filteredValue;  
    this.sumarValores();
}

editarRegistro(){
  let data:any; 
  data = this.selecteditemRegistro;
  /* const ref = this.dialogService.open(PopupOperacionCobroRegistroEditarComponent, {
  data,
   header: 'Editar registro', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((PopupOperacionCobroRegistroEditarComponent:OperacionCobroDetalle) => {
      if (PopupOperacionCobroRegistroEditarComponent) {
        console.log(PopupOperacionCobroRegistroEditarComponent);    
        this.popItemOperacionCobro = PopupOperacionCobroRegistroEditarComponent;
      //  this.formObraSocial.patchValue({id: this.popItemObraSocial.id});
       // this.formObraSocial.patchValue({nombre: this.popItemObraSocial.nombre});
       
      }
  }); */
}


eliminarRegistro(){
  this.elementos = this.elementos.filter(item => item !== this.selecteditemRegistro);
  this.cantidad--;

}


accion(event:ArticuloMovimiento,overlaypanel: OverlayPanel,elementos:ArticuloMovimiento){
  if(elementos){
    this.selecteditemRegistro = elementos;
  }

    console.log(this.selecteditemRegistro);
    overlaypanel.toggle(event);
  }

sumarValores(){
  let i:number;
  //console.log(vals[1]['valor_facturado']);

  /* this.total_facturado = 0;
  this.total_original = 0;
  this.total_categoria = 0;
  this.cantidad_practica = 0;
  this.total_final=0;
  for(i=0;i<vals.length;i++){
      this.total_original = this.total_original+ Number(vals[i]['valor_original']);
      this.total_facturado = this.total_facturado+ Number(vals[i]['valor_facturado']);
      this.total_categoria = this.total_categoria+ Number(vals[i]['categorizacion']);
      
  }
  this.total_final =   this.total_facturado+ this.total_categoria;
  this.cantidad_practica = vals.length;
  console.log(this.total_facturado); */
this.total = 0;

for(i=0;i < this.elementos.length;i++){

}
}

}
