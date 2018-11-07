import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

// Sentry.init({
//     dsn: 'https://2c8280f86b3e46efbf6e6efd907201bd@sentry.io/1313303',
// });

Sentry.init({
    dsn: 'https://3e93735e443347428d633d3719d3f295@sentry.io/1313352',
    maxBreadcrumbs: 50,
    debug: true,
  });

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor() {}
    handleError(error) {
        console.error(error.originalError || error);
        Sentry.captureException(error.originalError || error);
        console.log('%cSENTRY', 'color: green');
        throw error;
    }
}
