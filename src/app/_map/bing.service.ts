/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/_core/util';

//https://bingmapsv8samples.azurewebsites.net/#Autosuggest%20with%20Map
//https://www.bing.com/api/maps/mapcontrol/isdk/autosuggestuiwithoutmap?autoRedirect=false#HTML
//login: https://www.bingmapsportal.com/  live email account
//'https://www.bing.com/api/maps/mapcontrol?branch=experimental&key=YourBingMapsKey&callback=loadMapScenario'

export interface BingAddressModel {
  addressLine: string, // houseNumber and street name
  adminDistrict: string, // state name
  countryRegion: string, // country name
  district: string,      // county name or distring name
  formattedAddress: string, // full address
  locality: string,         // not accurate, near land mark or big area or region
  postalCode: string       // zip code 
}

    // "addressLine": "711 W Wilson Ave",
    // "adminDistrict": "CA",
    // "countryRegion": "United States",
    // "district": "Los Angeles Co.",
    // "formattedAddress": "711 W Wilson Ave, Glendale, CA 91203",
    // "locality": "Vineyard",
    // "postalCode": "91203"
    // //================================================================
    // "addressLine": "Microsoft Way",
    // "adminDistrict": "WA",
    // "countryRegion": "United States",
    // "district": "King Co.",
    // "formattedAddress": "Microsoft Way, Redmond, WA 98052",
    // "locality": "Overlake",
    // "postalCode": "98052"

@Injectable()
export class BingService {

  bingKey = environment.map.bing.key;
  BingMapsSuggestionsConfig = { autoDetectLocation: true, placeSuggestions: false, maxResults: 5, showBingLogo: false };
  private bingMapManager: Microsoft.Maps.AutosuggestManager;

  constructor() {}

  public typeaheadData(inputId: string, resultsId: string, callback: (results) => void): void {
    this.scriptRegisterForTypeahead(this.autoSuggestModule.bind(this, inputId, resultsId, callback));
  }

  private scriptRegisterForTypeahead(callback?: () => void): void {
    const apiLoaderCallback = 'BingTypeadheadCallback';
    const src = this.url() + apiLoaderCallback;
    const id = "BingTypeaheadRegisterScriptId";
    const isSync = true;
    const isDefer = true;
    Util.scriptRegister(src, id, isSync, isDefer, apiLoaderCallback, callback);
  }

  private url(): string {
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

  private scriptRegisterForSearch(callback?: () => void): void {
    const apiLoaderCallback = 'BingSearchCallback';
    const src = this.url() + apiLoaderCallback;
    const id = "BingSearchRegisterScriptId";
    const isSync = true;
    const isDefer = true;
    Util.scriptRegister(src, id, isSync, isDefer, apiLoaderCallback, callback);
  }

  public searchData(latitude: number, longitude: number, callback: (answer, userData) => void): void {
    this.scriptRegisterForSearch(this.searchModule.bind(this, latitude, longitude, callback));
  }

  private searchModule(latitude: number, longitude: number, callback: (answer, userData) => void): void {

    var ele = document.createElement("div");
    ele.setAttribute("id","myMap");
    var map = new Microsoft.Maps.Map(ele, {});

    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
      var searchManager = new Microsoft.Maps.Search.SearchManager(map);
      var reverseGeocodeRequestOptions = {
          location: new Microsoft.Maps.Location(latitude, longitude),
          callback: callback,
        };
      searchManager.reverseGeocode(reverseGeocodeRequestOptions);
    });
  }

}