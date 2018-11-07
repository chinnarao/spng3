import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
    constructor(private nGXLogger: NGXLogger, private toastrService: ToastrService) {}

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>(operation = 'operation', result = {} as T) =>
        this.handleError(serviceName, operation, result);

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
        return (err: HttpErrorResponse): Observable<T> => {
            console.error(err);
            let message =
                err.error instanceof ErrorEvent
                    ? err.error.message
                    : `server returned code ${err.status} with body "${err.error}"`;
            message = `${serviceName}: ${operation} failed: ${message}`;
            this.sendErrorToServer(message);
            // Let the app keep running by returning a safe result.
            // return of(result);
            switch (err.status) {
                case 0: {
                    if (
                        err.statusText === 'Unknown Error' ||
                        err.message === 'Http failure response for (unknown url): 0 Unknown Error'
                    ) {
                        this.toastrService.info('Server Down!');
                    }
                    break;
                }
                case 401: {
                    this.toastrService.error('Unauthorized, Please login and try again!');
                    break;
                }
                case 500: {
                    this.toastrService.error('unexpected error occurred, Please try later!');
                    break;
                }
                default: {
                    break;
                }
            }
            return throwError(err);
        };
    }

    private async sendErrorToServer(errors: string[] | string): Promise<boolean> {
        if (navigator.onLine) {
            try {
                let body;
                if (Array.isArray(errors)) {
                    body = `[${errors.join(',')}]`;
                } else {
                    body = `[${errors}]`;
                }

                const response = await fetch(`${environment.apiLogglyErrorURL}`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                });
                if (response.ok) {
                    console.log('%cLOGGLY!!', 'color: green');
                    return true;
                }
            } catch (error) {
                this.nGXLogger.log('%cLOGGLY-LOG!!', 'color: red');
            }
        }
        return false;
    }
}
