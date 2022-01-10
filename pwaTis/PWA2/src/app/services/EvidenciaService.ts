
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Evidencia } from '../../models/Evidencia';
import { Material } from '../../models/Material';
import { Obra } from '../../models/Obra';

@Injectable({
    providedIn:'root'
})



export class EvidenciaService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    
    
    public obtenerEvidenciasObra(obra: number):Observable<Evidencia[]>{
        return this.http.get<Evidencia[]>(`${this.apiServerUrl}/obras/avances/?obra_id=${obra}`)
    }

    public obtenerEvidenciasPorEstadoObra(obra: number,opcion: string):Observable<any[]>{
        console.log(obra);
        console.log(opcion);
        
        return this.http.get<any[]>(`${this.apiServerUrl}/obras/avances/?obra_id=${obra}&aprobado=${opcion}`)
    }

    public registrarEvidencia(nuevaEvidencia: Evidencia):Observable<Evidencia>{
        return this.http.post<Evidencia>(`${this.apiServerUrl}/obras/avances/`,nuevaEvidencia)
    }


    
}
