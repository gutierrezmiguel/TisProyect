import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Score {

    baseUrl = environment.apiBaseUrl + 'score/'

    constructor(private http: HttpClient) { }

    getScoreOva(id_ova): Observable<Number> {
        return this.http.get<Number>(this.baseUrl + `avg/${id_ova}`);
    }

    mergeScore(Score: any):Observable<any>{
        return this.http.post<any>(this.baseUrl + 'merge', Score);
    }

    getScoreByUserAndOva(id_ova,id_user): Observable<Number>{
        return this.http.get<Number>(this.baseUrl +`${id_ova}`+`/${id_user}` )
    }


}
