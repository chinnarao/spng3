// import {CoreModule} from './_core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
// import {SharedModule} from './shared/shared.module';
import {LoggerModule, NgxLoggerLevel, NGXLogger} from 'ngx-logger';
// import {StackTraceOfflineErrorhandler} from './_error/stackTraceOfflineErrorhandler';
import {HttpClientModule} from '@angular/common/http';
// import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {InMemoryDataService} from './_in-memory/in-memory-data.service';
// import {MenuMdcModule} from './menu/menu.mdc.module'; // this is not required but , app.component.html is using for some reason.
// import {MenuModule} from './menu/menu.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { PagesModule } from './_pages/pages.module';
// import { HttpErrorHandler } from './_core/http-error-handler.service';
// import { SentryErrorHandler } from './_error/sentryErrorHandler';

// pending 1. if browser localstorage not supported then what?. 2. if internet offline 3. error interceptor 4.analytics.service.ts
// offline: https://github.com/cyrilletuzi/ngx-pwa-offline
// environment.apiLogglyLogURL

@NgModule({
  declarations: [ AppComponent, ],
  imports: [
    BrowserModule, AppRoutingModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    // MenuMdcModule, MenuModule,
    LoggerModule.forRoot({serverLoggingUrl: '', level: NgxLoggerLevel.INFO, serverLogLevel: NgxLoggerLevel.TRACE}),
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    LoadingBarHttpClientModule, LoadingBarRouterModule,
    ToastrModule.forRoot({timeOut: 0, preventDuplicates: true, closeButton: true, tapToDismiss: true, progressBar: true, newestOnTop: true }),
    HomeModule, PagesModule // positionClass: 'toast-bottom-full-width'
    // SharedModule, CoreModule,
  ],
  providers: [
    // HttpErrorHandler,
    NGXLogger, ToastrService,
    // {provide: ErrorHandler, useClass: StackTraceOfflineErrorhandler},
    // { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
