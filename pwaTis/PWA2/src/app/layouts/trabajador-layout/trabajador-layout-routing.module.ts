import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenciaListarComponent } from '../../views/evidencia-listar/evidencia-listar.component';
import { EvidenciaRegistrarComponent } from '../../views/evidencia-registrar/evidencia-registrar.component';
import { MapaComponent } from '../../views/mapa/mapa.component';
import { MaterialComprarComponent } from '../../views/material-comprar/material-comprar.component';
import { MaterialListarComponent } from '../../views/material-listar/material-listar.component';
import { MaterialSolicitarComponent } from '../../views/material-solicitar/material-solicitar.component';
import { MaterialSolicitudesComponent } from '../../views/material-solicitudes/material-solicitudes.component';
import { ObraListarMaterialComponent } from '../../views/obra-listar-material/obra-listar-material.component';
import { ObraListarComponent } from '../../views/obra-listar/obra-listar.component'; 
import { TrabajadorListarComponent } from '../../views/trabajador-listar/trabajador-listar.component';

export const routes: Routes = [{
  path:'',
  children:[

    //Rutas para operarios
      {path:'',component: EvidenciaRegistrarComponent},
     {path:'registrarEvidencia',component: EvidenciaRegistrarComponent},
     

    //Rutas para jefe de almacen
     {path:'listarSolicitudesMateriales',component: MaterialSolicitudesComponent},
     {path:'comprarMaterial/:material_id/:material_nombre',component: MaterialComprarComponent},
     {path:'listarMateriales',component: MaterialListarComponent},


     //Rutas para jefe de obra
     {path:'listarEvidencias',component: EvidenciaListarComponent},
     {path:'listarTrabajadores',component: TrabajadorListarComponent},
     {path:'solicitarMaterial',component: MaterialSolicitarComponent},
     {path:'evidencia',component: MapaComponent},

     {path: '**', redirectTo: 'dashboard'}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajadorLayoutRoutingModule { }
