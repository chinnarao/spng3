import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

// import { environment } from '../../environments/environment';

@Injectable()
export class CustomHttpClient extends HttpClient {
    constructor(httpHandler: HttpHandler) {
        super(httpHandler);
    }

    get<T>(url: string): Observable<T> {
        return super.get<T>(url);
    }

    // get<T>(url: string): Observable<T> {
    //     return super.get<T>(url, { headers: this.getHeaders() });
    // }

    post<T>(url: string, body: any): Observable<T> {
        return super.post<T>(url, body, { headers: new HttpHeaders({'Content-Type':  'application/json'}) });
    }

    // post<T>(url: string, body: any): Observable<T> {
    //     return super.post<T>(url, body);
    // }

    // post<T>(url: string, body: any): Observable<T> {
    //     console.log(this.getHeaders());
    //     return super.post<T>(url, body, { headers: this.getHeaders() });
    // }

    // put<T>(url: string, body: string): Observable<T> {
    //     return super.put<T>(environment.apiUrl + '/' + url, body, { headers: this.getHeaders() });
    // }

    // delete<T>(url: string): Observable<T> {
    //     return super.delete<T>(environment.apiUrl + '/' + url, { headers: this.getHeaders() });
    // }

    // private getHeaders() {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const headers = new HttpHeaders()
    //             .set('Content-Type', 'application/json')
    //             .append('Access-Control-Allow-Origin', '*')
    //             .append('Authorization', 'Bearer ' + token || '')
    //             .append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //         return headers;
    //     } else {
    //         console.error('no token present, please login first.');
    //         return new HttpHeaders();
    //     }
    // }
}
