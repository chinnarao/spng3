import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CustomHttpClient extends HttpClient {
  constructor(httpHandler: HttpHandler) {
    super(httpHandler);
  }

  get<T>(url: string): Observable<T> {
    return super.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return super.post<T>(url, body);
  }

  put<T>(url: string, body: string): Observable<T> {
    return super.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return super.delete<T>(url);
  }
}
