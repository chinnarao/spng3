import { LocalStorageState } from './local-storage.state';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpClient } from "./custom-http-client";
import { LoggingInterceptor } from "./logging-interceptor";
import { JwtInterceptor } from "./jwt.interceptor";
import { LocalStorageService } from "./local-storage.service";
import { SharedService } from './shared.service';
import { XhrService } from './xhr.service';
import { HereService } from './here.service';

const PROVIDERS = [
  CustomHttpClient,
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  LocalStorageService, LocalStorageState, SharedService, XhrService, HereService
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [PROVIDERS]
    };
  }
}
