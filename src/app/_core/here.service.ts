import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HereGeo } from '../_models/here-geo.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HereService {

  constructor(private httpClient: HttpClient) {}

  public getAutoComplete(hereGeoUrl: string, query: string): Observable<HereGeo> {
    const params = { q: query, sort: 'stars', order: 'desc' };
    return this.httpClient.get<HereGeo>(hereGeoUrl + query, { observe: 'response', params: params})
      .pipe( map(res => { return res.body;}));
  }

}