import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { StockComponent } from './pages/facturacion/stock/stock.component';
import { VentaComponent } from './pages/facturacion/venta/venta.component';
import { VentaHistoriaComponent } from './pages/facturacion/venta-historia/venta-historia.component';
import { ArticuloComponent } from './pages/mantenimiento/articulo/articulo.component';
import { TipoComprobanteComponent } from './pages/mantenimiento/comprobante/tipo-comprobante/tipo-comprobante.component';
import { PacienteComponent } from './pages/mantenimiento/paciente/paciente.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { ArticuloTipoComponent } from './pages/mantenimiento/articulo/articulo-tipo/articulo-tipo.component';
import { HistoriaClinicaComponent } from './pages/medico/historia-clinica/historia-clinica.component';







export const ROUTES: Routes = [
    { path: 'facturacion/movimiento/stock', component: StockComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'facturacion/venta', component: VentaComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'facturacion/historia/venta', component: VentaHistoriaComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },    
    { path: 'historiaclinica', component: HistoriaClinicaComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'mantenimiento/articulo', component: ArticuloComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'mantenimiento/articulo/tipo', component: ArticuloTipoComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'mantenimiento/comprobante', component: TipoComprobanteComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'mantenimiento/paciente', component: PacienteComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'mantenimiento/usuario', component: UsuarioComponent, canActivate: [AuthGuard], data: {role: 'control_total'}  },
    { path: 'inicio', component: EmptyComponent },
    { path: '404', component: NotFoundComponent },  
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

