import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajadorEditarComponent } from '../../views/trabajador-editar/trabajador-editar.component';
import { TrabajadorListarComponent } from '../../views/trabajador-listar/trabajador-listar.component';
import { ObraListarComponent } from '../../views/obra-listar/obra-listar.component';
import { ObraRegistrarComponent } from '../../views/obra-registrar/obra-registrar.component';
import { ObraEditarComponent } from '../../views/obra-editar/obra-editar.component';
import { ClienteRegistrarComponent } from '../../views/cliente-registrar/cliente-registrar.component';
import { RegistroTrabajadorComponent } from '../../views/trabajador-registrar/trabajador-registrar.component';
import { ClienteListarComponent } from '../../views/cliente-listar/cliente-listar.component';
import { ClienteEditarComponent } from '../../views/cliente-editar/cliente-editar.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { MaterialListarComponent } from '../../views/material-listar/material-listar.component';


export const routes: Routes = [{
  path:'',
  children:[

     {path:'registrarObra',component: ObraRegistrarComponent},
     {path:'editarObra/:obra_id',component: ObraEditarComponent},
     {path:'listarObras',component: ObraListarComponent},

     {path:'registrarCliente',component: ClienteRegistrarComponent},
     {path:'editarCliente/:cliente_nit',component: ClienteEditarComponent},
     {path:'listarClientes',component: ClienteListarComponent},

     {path:'registrarTrabajador',component: RegistroTrabajadorComponent},
     {path:'editarTrabajador/:trabajador_cedula',component: TrabajadorEditarComponent},
     {path:'listarTrabajadores',component: TrabajadorListarComponent},
     
     {path:'listarMateriales',component: MaterialListarComponent},
     {path:'',component: MaterialListarComponent},
     
     {path: '**', redirectTo: 'dashboard'}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorLayoutRoutingModule { }
