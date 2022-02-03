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

  onlineStatusCheck: any = OnlineStatusType;
  status: OnlineStatusType; //Enum provided by ngx-online-status
  offline: any;

  constructor(private onlineStatusService: OnlineStatusService, private syncService: SyncService, private http: HttpClient) {

    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;
      this.offline = (status === this.onlineStatusCheck.OFFLINE)

      if (!this.offline) {

        this.syncService.deleteOvasDB().then(
          (response =>{
            this.syncService.getOvasDB().then(
              (response => {
                this.ovas = response;
              })
            )
          })
        )
        
      }
      else {
      }

    });

    this.syncService.getOvasDB().then(
      (response => {
        this.ovas = response;
      })

    )
  }



  getOva(id_ova: number) {
    console.log(id_ova);
    let busquedaOva = this.ovas.find(ovas => ovas.idOva === id_ova);
    console.log(busquedaOva);
    return busquedaOva;
  }



}
