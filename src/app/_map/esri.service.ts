import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface esriAddress {
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

  typeaheadUrl(): string {
    const autoCompleteUrl = environment.map.here.autoCompleteUrl;
    const app_id = environment.map.here.app_id;
    const app_code = environment.map.here.app_code;
    let url = `${autoCompleteUrl}?app_id=${app_id}&app_code=${app_code}&query=`
    return url;
  }

  public typeaheadData(query: string): Observable<any> {
    query = query.toLowerCase();
    const url = this.typeaheadUrl() + query;
    const params = { q: query, sort: 'stars', order: 'desc' };
    return this.httpClient.get<any>(url, { observe: 'response', params: params})
      .pipe( map(res => { console.log(res.body); return res.body;}));
  }

}