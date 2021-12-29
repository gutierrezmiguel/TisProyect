import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OvasPanelRoutingModule } from './ovas-panel-routing.module';
import { OvasPanelComponent } from './ovas-panel.component';


@NgModule({
  declarations: [
    OvasPanelComponent
  ],
  imports: [
    CommonModule,
    OvasPanelRoutingModule
  ]
})
export class OvasPanelModule { }
