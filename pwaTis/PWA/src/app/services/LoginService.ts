
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Obra } from '../../models/Obra';


@Injectable({
  providedIn: 'root'
})

export class LoginService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  // POST credentials
  public postCredentials(credenciales:any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/oauth/login`, credenciales)
  // return this.http.post<any>(`http://127.0.0.1:8000/oauth/login`, credenciales)
  }



}
