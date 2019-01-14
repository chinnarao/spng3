import { HereService } from './here.service';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { GeoLocationService } from "./geo-location.service";
import { MapTilerService } from './map-tiler.service';
import { BingService } from './bing.service';

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
      providers: [GeoLocationService, HereService, BingService, MapTilerService]
    };
  }
}
