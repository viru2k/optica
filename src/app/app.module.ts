import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import localeEsAR from '@angular/common/locales/es-AR';
import { AutofocusModule } from 'angular-autofocus-fix'; 
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

/** COMPONENTES **/
import { AppComponent } from './app.component';


/** DIRECTIVAS **/



import { ROUTES } from './app.routes';
import { NgxPopper } from 'angular-popper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MultiSelectModule } from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {SpinnerModule} from 'primeng/spinner';
import {ToastModule} from 'primeng/toast';
import { DynamicDialogModule } from "primeng/dynamicdialog";
import {ListboxModule} from 'primeng/listbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenuItem, MessageService,DialogService,SelectItem} from 'primeng/api';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ArticuloComponent } from './pages/mantenimiento/articulo/articulo.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { VentaComponent } from './pages/facturacion/venta/venta.component';
import { StockComponent } from './pages/facturacion/stock/stock.component';
import { VentaHistoriaComponent } from './pages/facturacion/venta-historia/venta-historia.component';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';
import { ArticuloTipoComponent } from './pages/mantenimiento/articulo/articulo-tipo/articulo-tipo.component';
import { TipoComprobanteComponent } from './pages/mantenimiento/comprobante/tipo-comprobante/tipo-comprobante.component';
import { PacienteComponent } from './pages/mantenimiento/paciente/paciente.component';
import { PopupPacienteComponent } from './pages/mantenimiento/paciente/popup-paciente/popup-paciente.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { PopupArticuloComponent } from './shared/components/popup-articulo/popup-articulo.component';
import { PopupComprobanteTipoComponent } from './shared/components/popup-comprobante-tipo/popup-comprobante-tipo.component';
import { PopupArticuloEditarComponent } from './shared/components/popup-articulo-editar/popup-articulo-editar.component';
import { PopupArticuloTipoComponent } from './shared/components/popup-articulo-tipo/popup-articulo-tipo.component';
import { PopupArticuloTipoEditarComponent } from './shared/components/popup-articulo-tipo-editar/popup-articulo-tipo-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ArticuloComponent,
    NavbarComponent,
    EmptyComponent,
    NotFoundComponent,
    VentaComponent,
    StockComponent,
    VentaHistoriaComponent,
    HistoriaClinicaComponent,
    ArticuloTipoComponent,
    TipoComprobanteComponent,
    PacienteComponent,
    PopupPacienteComponent,
    UsuarioComponent,
    PopupArticuloComponent,
    PopupComprobanteTipoComponent,
    PopupArticuloEditarComponent,
    PopupArticuloTipoComponent,
    PopupArticuloTipoEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    BrowserModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    TableModule,
    CardModule,
    DropdownModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    MenubarModule,
    MenuModule,
    CheckboxModule,
    SpinnerModule,
    ToastModule,
    ListboxModule,
    OverlayPanelModule,
    DynamicDialogModule,
    OrderListModule,
    InputTextareaModule,
    ScrollPanelModule,
    NgxPopper,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot( ROUTES, { useHash: true } ),
  ],
  entryComponents: [ PopupArticuloComponent,
    PopupComprobanteTipoComponent,
    PopupArticuloEditarComponent,
    PopupPacienteComponent,
    PopupArticuloTipoComponent,
    PopupArticuloTipoEditarComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },{
    provide: HTTP_INTERCEPTORS,
    useFactory: function(injector: Injector) {
        return new JwtInterceptor(injector);
    },
    multi: true,
    deps: [Injector]
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

