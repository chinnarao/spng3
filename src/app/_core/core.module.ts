import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpClient } from './custom-http-client';
import { LoggingInterceptor } from './logging-interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { LocalStorageService } from './local-storage.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [CustomHttpClient, { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        LocalStorageService, ],
    declarations: [],
})
export class CoreModule {}
