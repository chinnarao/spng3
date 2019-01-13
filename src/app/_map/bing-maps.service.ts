/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/_core/util';


//https://developer.here.com/api-explorer/rest/geocoding_suggestions
//https://bingmapsv8samples.azurewebsites.net/#Autosuggest%20with%20Map

@Injectable()
export class BingMapsService {

  constructor(private httpClient: HttpClient) {}

  BingMapsSuggestionsConfig = {
    autoDetectLocation: true,
    placeSuggestions: false,
    maxResults: 5,
    showBingLogo: false
  };
  private bingMapManager: Microsoft.Maps.AutosuggestManager;
  
  public autosuggest(query: string) {

    // Do not make http request if query term is empty
    // if (query === '') {
    //     return Observable.of([]);
    // }

  //   var map:any = new Microsoft.Maps.Map('#myMap', {
  //     credentials: 'AktQDKefhl630pH0Dfe5TQJ6GRUDoT16CHPs0BNpBBJxq1u7LBlJOEdhpzQ4TN3_'
  // });

    if (query === '') {
        return of(null);//new Observable<string[]>(); of([])
    }

    const url = 'https://api.cognitive.microsoft.com/bing/v7.0/Suggestions';
    const key = '7cda2873ff154bf1bc871bfc64bde7ff';

    // Construct the request
    const headers = {'Ocp-Apim-Subscription-Key': key};
    const params = {'q': query};
    const responseType = 'json';

    return this.httpClient.get(url, {headers, params, responseType}).pipe(
        map(data => {
            console.log("44444");
            const res = <string[]>[];
            for (const term of data['suggestionGroups'][0]['searchSuggestions']){
                res.push(term['query']);
                console.log(term);
            }
            return res
        }),
        catchError(_ => {
            console.log("error102");
            console.log(_); //return throwError(err);
            return of(null);
          })
    );

    // const http$ = this.httpClient.get<string[]>(url, {headers, params, responseType}); 
    // http$.subscribe(
    //     res => console.log('HTTP response', res),
    //     err => console.log('HTTP Error', err),
    //     () => console.log('HTTP request completed.')
    // );
  }

  initApi(callback?: () => void): void {
    console.debug('Initializing bing maps injector script...');

    const apiLoaderCallback = 'bingMapCallback';
    const src = this.url() + apiLoaderCallback;
    const id = "bingMapApiRegisterScriptId";
    const isSync = true;
    const isDefer = true;
    Util.loadScript(src, id, isSync, isDefer, apiLoaderCallback, callback);
  }

  // 'https://www.bing.com/api/maps/mapcontrol?branch=experimental&key=YourBingMapsKey&callback=loadMapScenario'
  url(): string {
    const url = environment.map.bing.url;
    const key = environment.map.bing.key;
    const branch = environment.map.bing.branch;
    const autoCompleteurl = `${url}?branch=${branch}&key=${key}&callback=`
    return autoCompleteurl;
  }

  initApi1(callback?: () => void): void {
    console.debug('Initializing bing maps injector script...');

    const apiLoaderCallback = 'bingMapCallback1';

    // API will use this callback when loaded
    window[apiLoaderCallback] = callback || (() => {});

    const scriptContainer = document.createElement('script');
    scriptContainer.async = true;
    scriptContainer.defer = true;
    scriptContainer.src = this.url() + apiLoaderCallback;

    document.head.appendChild(scriptContainer);
}

  /**
    * Bootstrap bing maps ap Bootstrap bing maps api.
    * @param inputId address input id to read user input from
    * @param resultsId container id where suggestions are to be placed
    * @param callback address selection callback handler
    */
   public initSuggestionsApi(inputId: string, resultsId: string, callback: (results) => void): void {
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ1111111111111111111111");
    this.initApi1(this.initAddressSugggestions.bind(this, inputId, resultsId, callback));
  }

  private initAddressSugggestions(inputId: string, resultsId: string, callback: (results) => void): void {
    console.debug('Initializing bing maps autosuggestions...');

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: () => {
            this.bingMapManager = new Microsoft.Maps.AutosuggestManager(this.BingMapsSuggestionsConfig);
            this.bingMapManager.attachAutosuggest(inputId, resultsId, callback);
        },
        credentials: environment.map.bing.key,
        errorCallback: () => {
            console.error('Error getting address autosugesstions');
        }
    });
  }

}