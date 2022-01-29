import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    baseUrl = environment.apiBaseUrl + 'score/'

    constructor(private http: HttpClient) { }


    mergeScore(Score: any):Observable<any>{
        return this.http.post<any>(this.baseUrl + 'merge', Score);
    }


}
