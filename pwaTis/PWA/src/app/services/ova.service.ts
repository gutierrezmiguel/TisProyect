import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ova } from '../models/ova.interface';

@Injectable({
  providedIn: 'root'
})
export class OvaService {

  baseUrl  = environment.apiBaseUrl + 'ova/'

  constructor(private http : HttpClient) { }

  getOvas() : Observable<Ova[]>{
    return this.http.get<Ova[]>(this.baseUrl + 'list');
  }

  getOva(id_ova : number) : Observable<Ova>{
    return this.http.get<Ova>(this.baseUrl + id_ova);
  }


}
