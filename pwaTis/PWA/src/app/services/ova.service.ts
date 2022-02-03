import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ova } from '../models/ova.interface';
import { SyncService } from './sync.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

@Injectable({
  providedIn: 'root'
})
export class OvaService {

  public ovas: Ova[] = [];

  baseUrl = environment.apiBaseUrl + 'ova/'


  constructor( private syncService: SyncService, private http: HttpClient) {

    this.getOnlineOvas()

    if(!this.ovas){
      this.syncService.getOvasDB().then(
         (response =>{
          this.ovas = response
         })
      );
    }

    

  }

   getOnlineOvas() {
    this.syncService.getOvas().subscribe(
      (response: Ova[]) => {
        this.ovas = response
        //console.log(this.ovas);
        
      }
    )
  }


  async getOva(id_ova: number) {
    this.ovas = await this.syncService.getOvasDB();
    //console.log(id_ova);
    let busquedaOva = this.ovas.find(ovas => ovas.idOva === id_ova);
    //console.log(busquedaOva);
    return busquedaOva;
  }



}
