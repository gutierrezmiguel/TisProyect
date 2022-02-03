import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  baseUrl  = environment.apiBaseUrl + 'user/'


 


  
  constructor(private onlineStatusService: OnlineStatusService,private http : HttpClient) { 
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {



  });
  }



  getUser(id : number) : Observable<UserResponse>{
    return this.http.get<UserResponse>(this.baseUrl + id);
  }

  

  registerUser(user:User): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'create',user);
  }


}
