import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorLayoutRoutingModule } from './administrador-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ClienteRegistrarComponent } from '../../views/cliente-registrar/cliente-registrar.component';
import { RegistroTrabajadorComponent } from '../../views/trabajador-registrar/trabajador-registrar.component';
import { TrabajadorListarComponent } from '../../views/trabajador-listar/trabajador-listar.component';
import { ObraRegistrarComponent } from '../../views/obra-registrar/obra-registrar.component';
import { ObraListarComponent } from '../../views/obra-listar/obra-listar.component';
import { ObraEditarComponent } from '../../views/obra-editar/obra-editar.component';
import { ClienteEditarComponent } from '../../views/cliente-editar/cliente-editar.component';
import { TrabajadorEditarComponent } from '../../views/trabajador-editar/trabajador-editar.component';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ClienteListarComponent } from '../../views/cliente-listar/cliente-listar.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { MaterialListarComponent } from '../../views/material-listar/material-listar.component'


@NgModule({
  declarations: [
    ClienteRegistrarComponent,
    ClienteListarComponent,
    ClienteEditarComponent,
    ObraRegistrarComponent,
    ObraListarComponent,
    ObraEditarComponent,
    RegistroTrabajadorComponent,
    TrabajadorEditarComponent,
    MaterialListarComponent,
    DashboardComponent
    
  ],
  imports: [
    CommonModule,
    AdministradorLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    GooglePlaceModule,

    
  ],
  
})
export class AdministradorLayoutModule { }
