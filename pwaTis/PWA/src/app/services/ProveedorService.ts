
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Proveedor } from '../../models/Proveedor';

@Injectable({
    providedIn:'root'
})

export class ProveedorService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    
    
    public obtenerProveedoresMaterial(material: number):Observable<Proveedor[]>{
        return this.http.get<Proveedor[]>(`${this.apiServerUrl}/proveedores/${material}`)
    }



    
}
