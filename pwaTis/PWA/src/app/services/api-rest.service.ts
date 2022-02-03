import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  public url = 'https://heroku-notifications-api.herokuapp.com';

  constructor(private http: HttpClient) {    
   }

   saveToken = (token) => {
    return this.http.post(`${this.url}/save`,
      {
        token
      }
    );
  };

}
