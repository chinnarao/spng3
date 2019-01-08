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
  googleMap : {
      defaultLattitude: 34.153956,
      defaultLongitude: -118.263307,
      defaultZoomPercentage: 10
  },
  hereGeo: {
    autoCompleteUrl: 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
    app_id: 'wiSaJwgTMCWhOmkvEXxc',
    app_code: '6e19RoRJT_hw4Gi-8gnvHw',
  },
};

/*
* In development mode, for easier debugging, you can ignore zone related error
* stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
* below file. Don't forget to comment it out in production mode
* because it will have a performance impact when errors are thrown
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
