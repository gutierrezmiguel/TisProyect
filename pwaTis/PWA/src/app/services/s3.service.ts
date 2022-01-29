import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class S3Service {

    baseUrl = environment.apiBaseUrl + 's3/'

    constructor(private http: HttpClient) { }


    downloadFile(key: string):Observable<Blob>{
        return this.http.get(this.baseUrl + `download/${key}` ,{ responseType: 'blob' });
    }


}
