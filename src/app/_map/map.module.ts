import { BingMapsService } from './bing-maps.service';
import { HereService } from './here.service';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { GeoLocationService } from "./geo-location.service";

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
      providers: [GeoLocationService, HereService, BingMapsService]
    };
  }
}
