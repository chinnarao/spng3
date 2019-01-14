// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:4200', // angular application url
  apiUrl: 'http://localhost:50128', // this is dotnet api url for web api
  apiLogURL: 'https://localhost:44324/api/log/log', // own log web api log url
  apiErrorURL: 'https://localhost:44324/api/log/error', // own log web api error url  //'application/json'
  apiLogglyLogURL: 'http://logs-01.loggly.com/inputs/1cd084d9-e1f7-4a52-bf8f-ad639cfb24d1/tag/spnglog/',
  apiLogglyErrorURL: 'http://logs-01.loggly.com/inputs/1cd084d9-e1f7-4a52-bf8f-ad639cfb24d1/tag/spngerror/',
  firebaseConfig: {
      apiKey: 'AIzaSyAYt2q8UGS0SpvcfNUCqE8QIfuVAi2xQB0',
      authDomain: 'scooppagesdev1.firebaseapp.com',
      databaseURL: 'https://scooppagesdev1.firebaseio.com',
      projectId: 'scooppagesdev1',
      storageBucket: 'scooppagesdev1.appspot.com',
      messagingSenderId: '633429318654',
  },
  map: {
    whichGeoCodeReverseWithLatLon: "bing",
    whichGeoCodeReverseWithoutLatLon: "geoIPDb",
    whichTypeaheadApi: "bing",
    bing:{
      url: 'https://www.bing.com/api/maps/mapcontrol',
      branch: 'experimental',
      key:          'AuZK107sn3Zl--InWSe139TSeFGHCyJciqUloRApHqGD98O9M55Nmn1i9G0zdfEI',
      key_others1:  'AgPn8P9gDiOFuiw33ebWeLKdx29J1Z-dNh3PqN03rsgLvu4bTQZwiDvQuwxFhqcZ',
      key_others2:  'AktQDKefhl630pH0Dfe5TQJ6GRUDoT16CHPs0BNpBBJxq1u7LBlJOEdhpzQ4TN3_',
      key_others3:  'Ap0AObt84NcDaUThCeWOj52ZqUHv6k4TJhjLibR-DghC-semgoj-0uPbIi8r0E4j',
      key_others4:  'Av_ZYW1QE7oZPoRV_0Lgdmc93z6Km8TYzRRQI3RaoB5aRkT91oOsn7KTLo2TIcWQ',
      autoSuggest: "https://github.com/AniMysore74/bing-autosuggest-angular/blob/master/src/app/services/bing-service.ts",
    },
    google: {},
    here: {
      autoCompleteUrl: 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
      app_id: 'wiSaJwgTMCWhOmkvEXxc',
      app_code: '6e19RoRJT_hw4Gi-8gnvHw',
    },
    mapTiler:{
      key: '1f5ewga5zToMPWGAnuFf',
      url: 'https://geocoder.tilehosting.com'
    },
    geoIPDb: {
      url: "https://geoip-db.com/json/dd367f80-17d5-11e9-8dde-63ec6a7ac566",
    },
    esri:{
      url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=",
      key: "you can use key but later",
    }
  }
};

/*
* In development mode, for easier debugging, you can ignore zone related error
* stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
* below file. Don't forget to comment it out in production mode
* because it will have a performance impact when errors are thrown
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
