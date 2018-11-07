import { Injectable } from '@angular/core';
import { CustomHttpClient } from '../_core/custom-http-client';

@Injectable()
export class ArticleService {

  constructor(private http: CustomHttpClient, private http1: CustomHttpClient) {}
}
