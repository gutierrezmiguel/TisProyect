import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OvaDetailsComponent } from '../../views/ova-details/ova-details.component';
import { OvasCarouselComponent } from '../../views/ovas-carousel/ovas-carousel.component';


export const routes: Routes = [{
  path:'',
  children:[

     {path:'details/:id_ova', component:OvaDetailsComponent},
     {path: '**', component: OvasCarouselComponent}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorLayoutRoutingModule { }
