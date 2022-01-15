
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Cliente } from '../../models/Cliente';

@Injectable({
    providedIn:'root'
})

export class ClienteService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
        
    public loginTrabjador():Observable<Cliente>{
        return this.http.get<Cliente>(`${this.apiServerUrl}/clientes/login/`)
    }
    public registrarCliente(nuevoCliente : Cliente):Observable<Cliente>{
        return this.http.post<Cliente>(`${this.apiServerUrl}/clientes/`,nuevoCliente)
    }
    public actualizarCliente(clienteActualizado : Cliente):Observable<Cliente>{
        return this.http.put<Cliente>(`${this.apiServerUrl}/clientes/`,clienteActualizado)
    }
    public obtenerClientes():Observable<Cliente[]>{
        return this.http.get<Cliente[]>(`${this.apiServerUrl}/clientes/?all=1`)
    }
    public obtenerCliente(nit : number): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.apiServerUrl}/clientes/?numero_nit=${nit}`);

    }


    
}
