import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { calendarioIdioma } from './../../../config/config';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/components/common/api';
import { ArticuloService } from './../../../services/articulo.service';
import { formatDate, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ArticuloMovimiento } from './../../../models/articulo-movimiento.model';

@Component({
  selector: 'app-venta-historia',
  templateUrl: './venta-historia.component.html',
  styleUrls: ['./venta-historia.component.scss'], 
  providers: [MessageService,DialogService]
})
export class VentaHistoriaComponent implements OnInit {
  loading: boolean;
  cols: any[];
  selectedItem: ArticuloMovimiento;
  selecteditems:ArticuloMovimiento[] = [];
  newPopItem: boolean;
  resultSave:boolean;
  es:any;
  displayDialog: boolean;
  elemento:ArticuloMovimiento = null;
  elementos:ArticuloMovimiento[] = [];
  elementosFiltrados:ArticuloMovimiento[] = null;
  fechaDesde:Date;
  fechaHasta:Date;
  DateForm:FormGroup;
  userData:any;
  total:number;
  cont:number = 0;
  cantidad:number =0;
  total_facturado:number=0;
  total_seleccionado:number=0;
  total_final:number=0;

  constructor(private service:ArticuloService,private messageService: MessageService ,public dialogService: DialogService) {

    this.cols = [
              
      { field: 'accion', header: 'Accion' , width: '6%'} ,
      { field: 'tipo', header: 'Comprobante',  width: '15%' },
      { field: 'numero', header: 'Número',  width: '15%' },
      { field: 'fecha_alta', header: 'Fecha',  width: '10%' },
      { field: 'codigo', header: 'Código',  width: '15%' },
      { field: 'nombre', header: 'Articulo',  width: '30%' },
      {field: 'tipo_articulo', header: 'Tipo' , width: '24%' },
      { field: 'precio', header: 'Precio',  width: '10%' },     
      { field: 'cantidad', header: 'Cantidad',  width: '10%' },  
      { field: 'total_facturado', header: 'Total',  width: '10%' },  
      { field: 'local', header: 'Local',  width: '10%' },  
      
     ];   

     this.DateForm = new FormGroup({
      'fecha_desde': new FormControl('', Validators.required),       
      'fecha_hasta': new FormControl('', Validators.required),
     
      });

   }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma;
    this.fechaHasta = new Date();
    this.fechaDesde = new Date();
    this.DateForm.patchValue({fecha_desde: this.fechaDesde});
    this.DateForm.patchValue({fecha_hasta: this.fechaHasta});
  }

  actualizarFechaDesde(event){
    console.log(event);
    this.fechaDesde = event;
    console.log(new Date(this.fechaDesde));
  }


  actualizarFechahasta(event){
    console.log(event);
    this.fechaHasta = event;
    console.log(new Date(this.fechaHasta));
  }

  

  buscarByFecha(){
    let _fechaDesde = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm:ss', 'en');
    let _fechaHasta = formatDate(this.fechaHasta, 'dd/MM/yyyy HH:mm:ss', 'en');

    try {
     
  this.service.getMovimientoByComprobanteFecha(_fechaDesde, _fechaHasta, this.userData['local'])
  .subscribe(resp => {
    console.log(resp);    
  
      this.loading = false;
      this.elementos = resp;
      this.sumarValores(resp);
  },
  error => { // error path
      console.log(error.message);
      console.log(error.status);
      
   });    
} catch (error) {
//  this.throwAlert('error','error','Error: '+error.status+'  Error al cargar los registros',error.message);
}  
    
  }

  filtered(event){
    console.log(event.filteredValue);
    this.elementosFiltrados  = event.filteredValue;  
    this.sumarValores(this.elementosFiltrados);
}


sumarValoresSeleccionados(vals:any){
  // SUMO LO FILTRADO
  console.log(vals);
  this.total_seleccionado = 0;
  
  let i:number;
  let total_facturado = 0;
  let total_original = 0;
  let total_categoria = 0;
  let cantidad_practica = 0;
for(i=0;i<vals.length;i++){

total_facturado = total_facturado+ Number(vals[i]['total_facturado']);
}
this.total_seleccionado = total_facturado+ total_categoria;
}

sumarValores(vals:any){
let i:number;
//console.log(vals[1]['valor_facturado']);
console.log(vals !== undefined);
this.total_facturado = 0;

this.total_final=0;
for(i=0;i<vals.length;i++){
 
  this.total_facturado = this.total_facturado+ Number(vals[i]['total_facturado']);
  
}
this.total_final =   this.total_facturado;
console.log(this.total_facturado);
}

}
