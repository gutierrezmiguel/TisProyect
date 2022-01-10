
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Obra } from '../../models/Obra';


@Injectable({
    providedIn: 'root'
})

export class ObraService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public registrarTrabajadorObra(trabajadoresParticipanObras:any):Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/obras/trabajadores/`,trabajadoresParticipanObras)
    }

    //todas las obras
    public obtenerObras():Observable<Obra[]>{
        return this.http.get<Obra[]>(`${this.apiServerUrl}/obras/?all=1`)
    }

    //actualiza una obra
    public actualizarObra(ObraActualizada : Obra):Observable<Obra>{
        return this.http.put<Obra>(`${this.apiServerUrl}/obras/`,ObraActualizada)
    }

    //registra una obra
    public registrarObra(nuevaObra: Obra):Observable<Obra>{
        return this.http.post<Obra>(`${this.apiServerUrl}/obras/`,nuevaObra)
    }

    //obtiene una obra por id
    public obtenerObra(obra_id: number):Observable<Obra>{
      return this.http.get<Obra>(`${this.apiServerUrl}/obras/?id=${obra_id}`)
    }

    //obtiene una obra por fase
    public obtenerObraFase(fase : number): Observable<Obra>{
        return this.http.get<Obra>(`${this.apiServerUrl}/obras/?fase=${fase}`);

    }


}
