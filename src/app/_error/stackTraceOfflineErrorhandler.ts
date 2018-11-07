import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { ClientErrorService } from './clientError.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

// https://github.com/ralscha/blog/blob/master/ngerrorhandler/client/src/app/app.global.errorhandler.ts
// https://github.com/loggly/loggly-castor

@Injectable()
export class StackTraceOfflineErrorhandler implements ErrorHandler {
    private isRetryRunning = false;

    constructor(private readonly clientErrorService: ClientErrorService, private injector: Injector) {
        this.sendStoredErrors();
        window.addEventListener('online', () => this.sendStoredErrors());
    }
    private get toastr(): ToastrService {
        return this.injector.get(ToastrService);
    }
    async handleError(error) {
        console.error(error);
        this.toastr.error('An unexpected error has occurred.');
        const userAgent = {
            language: navigator.language,
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            connectionDownlink: navigator['connection'].downlink,
            connectionEffectiveType: navigator['connection'].effectiveType,
        };
        const stackTrace = await StackTrace.fromError(error, { offline: true });
        const body = JSON.stringify({ ts: Date.now(), userAgent, stackTrace });

        const wasOK = await this.sendError(body);
        if (!wasOK) {
            this.clientErrorService.store(body);
            setTimeout(() => this.sendStoredErrors(), 60_000);
        }
    }

    private async sendStoredErrors() {
        if (this.isRetryRunning) {
            return;
        }

        let attempts = 1;
        const retry = async () => {
            const errors = await this.clientErrorService.getAll();
            if (errors.length === 0) {
                return;
            }

            const wasOK = await this.sendError(errors.map(error => error.error));
            if (wasOK) {
                await this.clientErrorService.delete(errors.map(error => error.id));
                this.isRetryRunning = false;
                return;
            }

            this.isRetryRunning = true;
            if (attempts < 32) {
                attempts = attempts * 2;
            }
            setTimeout(retry, attempts * 60_000);
        };

        await retry();
    }

    private async sendError(errors: string[] | string): Promise<boolean> {
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
                    console.log('%cLOGGLY!', 'color: green');
                    return true;
                }
            } catch (error) {
                this.toastr.error('LOGGLY!');
                console.log('%cLOGGLY!', 'color: red');
            }
        }

        return false;
    }
}
