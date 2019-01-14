//https://developer.here.com/api-explorer/rest/geocoding_suggestions
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface HereModel {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: HereAddressModel;
  matchLevel: string;
}

export interface HereAddressModel {
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

@Injectable()
export class HereService {

  constructor(private httpClient: HttpClient) {}

  //https://api.github.com/search/repositories?q=a&sort=stars&order=desc
  //https://theinfogrid.com/tech/developers/angular/ng-material-autocomplete-http-lookup/
  //https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=wiSaJwgTMCWhOmkvEXxc&app_code=6e19RoRJT_hw4Gi-8gnvHw&query=460+w+doran+st
  //http://photon.komoot.de/api/?q=460%20w%20doran%20st%20glendale
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