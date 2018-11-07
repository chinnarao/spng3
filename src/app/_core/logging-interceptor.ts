import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const started = Date.now();
        let ok: string;
        // if (req.url.indexOf('44394') >= 0) { console.log(req.headers);console.log(req.url); }
        return next.handle(req).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                event => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                // Operation failed; error is an HttpErrorResponse
                error => (ok = 'failed')
            ),
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
                // nGXLogger never use, infinite loop , be care full
                ok === 'succeeded' ? console.log('%c' + msg, 'color: green') : console.log('%c' + msg, 'color: red');
            })
        );
    }
}
