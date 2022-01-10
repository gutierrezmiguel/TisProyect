import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteLayoutRoutingModule } from './cliente-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClienteLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ClienteLayoutModule { }
