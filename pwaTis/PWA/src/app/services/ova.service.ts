import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ova } from '../models/ova.interface';

@Injectable({
  providedIn: 'root'
})
export class OvaService {

  public ovas: Ova[] = [];

  baseUrl = environment.apiBaseUrl + 'ova/'

  constructor(private http: HttpClient) { }

  getOvas(): Observable<Ova[]> {
    return this.http.get<Ova[]>(this.baseUrl + 'list');
  }

  setOvas(ovasList: Ova[]) {
    this.ovas = ovasList;
  }

  getOva(id_ova: number) {
    console.log(this.ovas);
    
    return this.ovas.find(ovas => ovas.id_ova = id_ova);
  }




}
