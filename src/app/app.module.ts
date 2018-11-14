import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoggerModule, NgxLoggerLevel, NGXLogger } from "ngx-logger";
import { HttpClientModule } from "@angular/common/http";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { HomeModule } from "./home/home.module";
import { PagesModule } from "./_pages/pages.module";
import { HeaderModule } from "./header/header.module";
import { LocalStorageService } from "./_core/local-storage.service";
import { CoreModule } from "./_core/core.module";
import { HttpErrorHandler } from "./_core/http-error-handler.service";
import { MdcModule } from "./_core/mdc-module";
import { MaterialModule } from "./_core/material-module";
// import { SentryErrorHandler } from './_error/sentryErrorHandler';
// import {SharedModule} from './shared/shared.module';
// import {StackTraceOfflineErrorhandler} from './_error/stackTraceOfflineErrorhandler';
// import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {InMemoryDataService} from './_in-memory/in-memory-data.service';
// import { environment } from 'src/environments/environment';

// pending 1. if browser localstorage not supported then what?. 2. if internet offline 3. error interceptor 4.analytics.service.ts
// offline: https://github.com/cyrilletuzi/ngx-pwa-offline
// environment.apiLogglyLogURL

const PROVIDERS = [
  NGXLogger,
  ToastrService,
  LocalStorageService,
  HttpErrorHandler
  // {provide: ErrorHandler, useClass: StackTraceOfflineErrorhandler},
  // { provide: ErrorHandler, useClass: SentryErrorHandler }
];

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  LoggerModule.forRoot({
    serverLoggingUrl: "",
    level: NgxLoggerLevel.INFO,
    serverLogLevel: NgxLoggerLevel.TRACE
  }),
  LoadingBarHttpClientModule,
  LoadingBarRouterModule,
  ToastrModule.forRoot({
    timeOut: 0,
    preventDuplicates: true,
    closeButton: true,
    tapToDismiss: true,
    progressBar: true,
    newestOnTop: true
  }),
  HomeModule,
  PagesModule,
  MdcModule,
  MaterialModule,
  HeaderModule,
  CoreModule.forRoot()
  // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [IMPORTS],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
