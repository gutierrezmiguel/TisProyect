import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OvasListComponent } from "../../views/ovas-list/ovas-list.component";

export const routes: Routes = [{
  path:'',
  children:[

     {path:'OvasList',component: OvasListComponent},

     {path: '**', redirectTo: 'dashboard'}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OvasLayoutRoutingModule { }