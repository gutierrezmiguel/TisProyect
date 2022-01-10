import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OvasListComponent } from '../../views/ovas-list/ovas-list.component';
import { OvasLayoutRoutingModule } from './ovas-layout-routing.module';



@NgModule({
  declarations: [OvasListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OvasLayoutRoutingModule
    
  ]
})
export class OvasLayoutModule { }
