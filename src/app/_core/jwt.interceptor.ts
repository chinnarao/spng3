import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localStorageService:  LocalStorageService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.get(Constants.token);
        if (token !== 'null') {
            // set('Cache-Control', 'no-cache').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token).set('Content-type', 'application/json') });
        }
        return next.handle(request);
    }
}
