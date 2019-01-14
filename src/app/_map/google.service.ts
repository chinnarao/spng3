import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

//https://github.com/sam18093ui/UI/blob/fea1e141ba8483032ee5f9531a1b9b044f2f7e55/gooogleemaps.ts

@Injectable()
export class GoogleService {

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