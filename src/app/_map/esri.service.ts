import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface esriAddressModel {
    Match_addr: string;
    LongLabel: string;
    ShortLabel: string;
    Addr_type: string;
    Type: string;
    PlaceName: string;
    AddNum: string;
    Address: string;
    Block: string;
    Sector: string;
    Neighborhood: string;
    District: string;
    City: string;
    MetroArea: string;
    Subregion: string;
    Region: string;
    Territory: string;
    Postal: string;
    PostalExt: string;
    CountryCode: string;
}

//https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm#ESRI_SECTION1_0E738E9A0EFB49B2B56DD240AFFF46BF
//http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=-118.0356,33.9413
//x: longitude, y: latitude

@Injectable()
export class EsriService {

  constructor(private httpClient: HttpClient) {}

  public esriReverseGeoCode(latitude:number, longitude:number): Observable<any> {
    const url = environment.map.esri.url + [longitude, latitude].join(",");
    return this.httpClient.get<any>(url);
  }

}