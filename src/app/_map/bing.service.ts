/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/_core/util';

//https://bingmapsv8samples.azurewebsites.net/#Autosuggest%20with%20Map
//https://www.bing.com/api/maps/mapcontrol/isdk/autosuggestuiwithoutmap?autoRedirect=false#HTML
//login: https://www.bingmapsportal.com/  live email account
//'https://www.bing.com/api/maps/mapcontrol?branch=experimental&key=YourBingMapsKey&callback=loadMapScenario'

@Injectable()
export class BingService {

  bingKey = environment.map.bing.key;
  BingMapsSuggestionsConfig = { autoDetectLocation: true, placeSuggestions: false, maxResults: 5, showBingLogo: false };
  private bingMapManager: Microsoft.Maps.AutosuggestManager;

  constructor() {}

  public typeaheadData(inputId: string, resultsId: string, callback: (results) => void): void {
    this.scriptRegister(this.autoSuggestModule.bind(this, inputId, resultsId, callback));
  }

  private scriptRegister(callback?: () => void): void {
    const apiLoaderCallback = 'bingMapCallback';
    const src = this.typeaheadUrl() + apiLoaderCallback;
    const id = "bingMapApiRegisterScriptId";
    const isSync = true;
    const isDefer = true;
    Util.scriptRegister(src, id, isSync, isDefer, apiLoaderCallback, callback);
  }

  private typeaheadUrl(): string {
    const url = environment.map.bing.url;
    const key = this.bingKey;
    const branch = environment.map.bing.branch;
    const autoCompleteurl = `${url}?branch=${branch}&key=${key}&callback=`
    return autoCompleteurl;
  }

  private autoSuggestModule(inputId: string, resultsId: string, callback: (results) => void): void {
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: () => {
            this.bingMapManager = new Microsoft.Maps.AutosuggestManager(this.BingMapsSuggestionsConfig);
            this.bingMapManager.attachAutosuggest(inputId, resultsId, callback);
        },
        credentials: this.bingKey,
        errorCallback: () => {
            console.error('Error getting address autosugesstions');
        }
    });
  }

}