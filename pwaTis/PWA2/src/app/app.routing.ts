import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AdministradorLayoutComponent } from './layouts/administrador-layout/administrador-layout.component';
import { ClienteLayoutComponent } from './layouts/cliente-layout/cliente-layout.component';
import { TrabajadorLayoutComponent } from './layouts/trabajador-layout/trabajador-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { MapaComponent } from './views/mapa/mapa.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'mapa',
    component: MapaComponent,
    data: {
      title: 'Mapa'
    }
  },
  {
    path: 'admin',
    component: AdministradorLayoutComponent,
    loadChildren: () => import('./layouts/administrador-layout/administrador-layout.module').then(m => m.AdministradorLayoutModule)

  },
  {
    path: 'cliente',
    component: ClienteLayoutComponent,
    loadChildren: () => import('./layouts/cliente-layout/cliente-layout.module').then(m => m.ClienteLayoutModule)

  },
  {
    path: 'trabajador',
    component: TrabajadorLayoutComponent,
    loadChildren: () => import('./layouts/trabajador-layout/trabajador-layout.module').then(m => m.TrabajadorLayoutModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
