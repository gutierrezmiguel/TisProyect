import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ova } from '../models/ova.interface';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root'
})
export class OvaService {

  public ovas: Ova[] = [];

  baseUrl = environment.apiBaseUrl + 'ova/'

  constructor(private syncService: SyncService ,private http: HttpClient) { 
    this.syncService.getOvasDB().then(
      (response =>{
        this.ovas = response;
      })
      
    )
  }




  getOva(id_ova: number) {
    console.log(id_ova);
    let busquedaOva =  this.ovas.find(ovas => ovas.idOva === id_ova);
    console.log(busquedaOva);
    return busquedaOva;
  }

 

}
