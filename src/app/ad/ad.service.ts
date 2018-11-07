import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { CustomHttpClient } from '../_core/custom-http-client';
import { Observable, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { HttpHeaders } from '@angular/common/http';
import { AdModel } from '../_models/ad.model';
import { environment } from 'src/environments/environment';
import { HttpErrorHandler, HandleError } from '../_core/http-error-handler.service';
import { AdSortFilterPageOptionsModel } from '../_models/ad-sort-filter-page-options.model';

@Injectable()
export class AdService {

  private handleError: HandleError;

  constructor(private logger: NGXLogger, private http: CustomHttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AdService');
  }

  getAllAds(): Observable<AdModel[]> {
    const url = 'https://localhost:44394/api/ad/getallads';
    return this.http.get<AdModel[]>(url).pipe(catchError(this.handleError<AdModel[]>('getAllAds', [])));
  }

  getAdDetail(adId: string): Observable<AdModel> {
    const url = `https://localhost:44394/api/ad/GetAdDetail/${adId}`;
    return this.http.get<AdModel>(url).pipe(catchError(this.handleError<any>('getAdDetail', [])));
  }

  createAd(ad: AdModel): Observable<AdModel> {
    const url = 'https://localhost:44394/api/ad/CreateAd';
    // console.log(ad);
    return this.http.post<AdModel>(url, JSON.stringify(ad)).pipe(catchError(this.handleError<any>('createAd', [])));
  }

  getAllUniqueTags(): Observable<string[]> {
    const url = 'https://localhost:44394/api/ad/GetAllUniqueTags';
    return this.http.get<string[]>(url).pipe(catchError(this.handleError<string[]>('getAllUniqueTags', [])));
  }

  updateAd(ad: AdModel): Observable<AdModel> {
    const url = 'https://localhost:44394/api/ad/UpdateAd';
    return this.http.post<AdModel>(url, ad).pipe(catchError(this.handleError<any>('updateAd', [])));
  }

  searchAds(searchCriteria: AdSortFilterPageOptionsModel): Observable<AdModel> {
    const url = 'https://localhost:44394/api/ad/SearchAds';
    return this.http.post<AdModel>(url, searchCriteria).pipe(catchError(this.handleError<any>('searchAds', [])));
  }
}
