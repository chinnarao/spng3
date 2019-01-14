import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface MapTilerModel101 {
  alternative_names: string;
  boundingbox?: (number)[] | null;
  city: string;
  class: string;
  country: string;
  country_code: string;
  county: string;
  display_name: string;
  housenumbers: string;
  id: number;
  importance: number;
  lat: number;
  lon: number;
  name: string;
  name_suffix: string;
  osm_id: string;
  osm_type: string;
  place_rank: number;
  rank: number;
  state: string;
  street: string;
  type: string;
  wikidata: string;
  wikipedia: string;
}

//tchinnarao@gmail.com
//https://geocoder.tilehosting.com/q/[query].js?key=1f5ewga5zToMPWGAnuFf
//https://geocoder.tilehosting.com/[country_code]/q/[query].js?key=1f5ewga5zToMPWGAnuFf
@Injectable()
export class MapTilerService {

  constructor(private httpClient: HttpClient) {}

  public typeaheadData(query: string): Observable<any> {
    const url = this.typeaheadUrl(query);
    return this.httpClient.get<any>(url).pipe( map(res => res.results));
  }

  typeaheadUrl(query: string): string {
    const url = environment.map.mapTiler.url;
    const key = environment.map.mapTiler.key;
    query = encodeURI(query);
    const autoCompleteurl = `${url}/q/${query}.js?key=${key}`;
    return autoCompleteurl;
  }

}