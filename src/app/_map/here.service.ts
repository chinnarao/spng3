//https://developer.here.com/api-explorer/rest/geocoding_suggestions
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HereGeo } from '../_models/here-geo.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HereService {

  constructor(private httpClient: HttpClient) {}

  //https://api.github.com/search/repositories?q=a&sort=stars&order=desc
  //https://theinfogrid.com/tech/developers/angular/ng-material-autocomplete-http-lookup/
  //https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=wiSaJwgTMCWhOmkvEXxc&app_code=6e19RoRJT_hw4Gi-8gnvHw&query=460+w+doran+st
  //http://photon.komoot.de/api/?q=460%20w%20doran%20st%20glendale
  hereGeoUrl(): string {
    const autoCompleteUrl = environment.map.here.autoCompleteUrl;
    const app_id = environment.map.here.app_id;
    const app_code = environment.map.here.app_code;
    let url = `${autoCompleteUrl}?app_id=${app_id}&app_code=${app_code}&query=`
    return url;
  }

  public getAutoComplete(query: string): Observable<HereGeo> {
    const url = this.hereGeoUrl() + query;
    const params = { q: query, sort: 'stars', order: 'desc' };
    return this.httpClient.get<HereGeo>(url, { observe: 'response', params: params})
      .pipe( map(res => { return res.body;}));
  }

}