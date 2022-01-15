import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OvasCarouselComponent } from '../../views/ovas-carousel/ovas-carousel.component';


export const routes: Routes = [{
  path:'',
  children:[

     {path:'registrarObra',component: OvasCarouselComponent},
     
     {path: '**', component: OvasCarouselComponent}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorLayoutRoutingModule { }
