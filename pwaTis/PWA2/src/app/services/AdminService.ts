
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Trabajador } from '../../models/Trabajador';

@Injectable({
    providedIn:'root'
})

export class AdminService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
        
    



    
}
