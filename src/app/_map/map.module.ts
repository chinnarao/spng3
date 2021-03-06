import { HereService } from './here.service';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { LocationCurrentService } from "./location-current.service";
import { MapTilerService } from './map-tiler.service';
import { BingService } from './bing.service';
import { GeoIPDbService } from './geoip-db.service';
import { EsriService } from './esri.service';
import { GoogleService } from './google.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: []
})
export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [LocationCurrentService, HereService, BingService, MapTilerService, GeoIPDbService, EsriService, GoogleService]
    };
  }
}
