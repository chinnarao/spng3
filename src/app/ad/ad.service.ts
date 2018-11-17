import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { CustomHttpClient } from "../_core/custom-http-client";
import { Observable } from "rxjs";
import { NGXLogger } from "ngx-logger";
import { AdModel, AdSearchModel } from "../_models/ad.models";
import {
  HttpErrorHandler,
  HandleError
} from "../_core/http-error-handler.service";

@Injectable()
export class AdService {
  private handleError: HandleError;

  constructor(
    private logger: NGXLogger,
    private http: CustomHttpClient,
    httpErrorHandler: HttpErrorHandler,
    private _http: HttpClient
  ) {
    this.handleError = httpErrorHandler.createHandleError("AdService");
  }

  getAllAds(): Observable<AdModel[]> {
    const url = "https://localhost:44394/api/ad/getallads";
    return this.http
      .get<AdModel[]>(url)
      .pipe(catchError(this.handleError<AdModel[]>("getAllAds", [])));
  }

  getAdDetail(adId: string): Observable<AdModel> {
    const url = `https://localhost:44394/api/ad/GetAdDetail/${adId}`;
    return this.http
      .get<AdModel>(url)
      .pipe(catchError(this.handleError<any>("getAdDetail", [])));
  }

  createAd(ad: AdModel): Observable<AdModel> {
    const url = "https://localhost:44394/api/ad/CreateAd";
    // console.log(ad);
    return this.http
      .post<AdModel>(url, JSON.stringify(ad))
      .pipe(catchError(this.handleError<any>("createAd", [])));
  }

  getAllUniqueTags(): Observable<string[]> {
    const url = "https://localhost:44394/api/ad/GetAllUniqueTags";
    return this.http
      .get<string[]>(url)
      .pipe(catchError(this.handleError<string[]>("getAllUniqueTags", [])));
  }

  updateAd(ad: AdModel): Observable<AdModel> {
    const url = "https://localhost:44394/api/ad/UpdateAd";
    return this.http
      .post<AdModel>(url, ad)
      .pipe(catchError(this.handleError<any>("updateAd", [])));
  }

  searchAds(searchCriteria: AdSearchModel): Observable<any> {
    const url = "https://localhost:44394/api/ad/SearchAds";
    return this.http
      .post<any>(url, searchCriteria)
      .pipe(catchError(this.handleError<any>("searchAds", [])));
  }

  //http://localhost:4200/assets/data/user.json

  // getUsers(): void {
  //   console.log('tttttttttttttttttttttttttttttttttttttttt');
  //   this._http.get<any>("http://localhost:4200/assets/data/user.json").subscribe( res => console.log(res), err => console.error(err));
  // }
}
