/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/_core/util';

//https://bingmapsv8samples.azurewebsites.net/#Autosuggest%20with%20Map

@Injectable()
export class BingMapsService {

  BingMapsSuggestionsConfig = { autoDetectLocation: true, placeSuggestions: false, maxResults: 5, showBingLogo: false };
  private bingMapManager: Microsoft.Maps.AutosuggestManager;

  constructor(private httpClient: HttpClient) {}

  private initApi(callback?: () => void): void {
    const apiLoaderCallback = 'bingMapCallback';
    const src = this.url() + apiLoaderCallback;
    const id = "bingMapApiRegisterScriptId";
    const isSync = true;
    const isDefer = true;
    Util.loadScript(src, id, isSync, isDefer, apiLoaderCallback, callback);
  }

  //'https://www.bing.com/api/maps/mapcontrol?branch=experimental&key=YourBingMapsKey&callback=loadMapScenario'
  url(): string {
    const url = environment.map.bing.url;
    const key = environment.map.bing.key;
    const branch = environment.map.bing.branch;
    const autoCompleteurl = `${url}?branch=${branch}&key=${key}&callback=`
    return autoCompleteurl;
  }

   public initSuggestionsApi(inputId: string, resultsId: string, callback: (results) => void): void {
    this.initApi(this.initAddressSugggestions.bind(this, inputId, resultsId, callback));
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