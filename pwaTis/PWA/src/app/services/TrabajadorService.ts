
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Trabajador } from '../../models/Trabajador';

@Injectable({
    providedIn:'root'
})

export class TrabajadorService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
        
    public loginTrabjador():Observable<Trabajador>{
        return this.http.get<Trabajador>(`${this.apiServerUrl}/trabajadores/login/`)
    }
    public registrarTrabajador(nuevoTrabajador : Trabajador):Observable<Trabajador>{
        return this.http.post<Trabajador>(`${this.apiServerUrl}/trabajadores/`,nuevoTrabajador)
    }
    public actualizarTrabajador(trabajadorActualizado : Trabajador):Observable<Trabajador>{
        return this.http.put<Trabajador>(`${this.apiServerUrl}/trabajadores/`,trabajadorActualizado)
    }
    public obtenerTrabajadores():Observable<Trabajador[]>{
        return this.http.get<Trabajador[]>(`${this.apiServerUrl}/trabajadores/`)
    }
    public obtenerTrabajador(cedula : number): Observable<Trabajador>{
        return this.http.get<Trabajador>(`${this.apiServerUrl}/trabajadores/${cedula}`);
        
    }
    public obtenerTrabajadoresCargo(cargo : string): Observable<Trabajador[]>{
      return this.http.get<Trabajador[]>(`${this.apiServerUrl}/trabajadores/?cargo=${cargo}`);
      
  }



    
}
