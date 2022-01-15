import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = 'http://localhost:8080/user/'

  constructor(private http : HttpClient) { }

  getUser(id : number) : Observable<UserResponse>{
    return this.http.get<UserResponse>(this.baseUrl + id);
  }

  logIn(user:Login) : Observable<any>{
    return this.http.post<any>(this.baseUrl + 'login',user);
  }


}
