import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorLayoutRoutingModule } from './administrador-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { OvasCarouselComponent } from '../../views/ovas-carousel/ovas-carousel.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OvaDetailsComponent } from '../../views/ova-details/ova-details.component';

@NgModule({
  declarations: [
    OvasCarouselComponent,
    DashboardComponent,
    OvaDetailsComponent
    
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
    NgbModule,
    NgbCarouselModule,
    

    
  ],
  
})
export class AdministradorLayoutModule { }
