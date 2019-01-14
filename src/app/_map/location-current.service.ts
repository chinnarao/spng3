import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//https://www.w3schools.com/html/html5_geolocation.asp

//https://www.codingame.com/playgrounds/3799/html-geolocation
// export interface Position {
//   coords: Coordinates, 
//   timestamp: number
// }

// export interface Coordinates {
//   latitude:number,
//   longitude:number,
//   accuracy:number,
//   // altitude?:number,
//   // altitudeAccuracy?:number
//   // heading?:string,
//   // speed?:number
// }

@Injectable()
export class LocationCurrentService {

  errorMsg : string;

  GEOLOCATION_ERRORS = {
    "errors.location.unsupportedBrowser": "Browser does not support location services",
    "errors.location.permissionDenied": "You have rejected access to your location",
    "errors.location.positionUnavailable": "Unable to determine your location",
    "errors.location.timeout": "Service timeout has been reached"
  };

  constructor(){}

  public getLocationRxJs(geoLocationOptions?: any): Observable<any> {
    geoLocationOptions = geoLocationOptions || { timeout: 5000 };
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
            observer.complete();
          },
          error => {
            switch (error.code) {
              case 1:
                observer.error(
                  this.GEOLOCATION_ERRORS["errors.location.permissionDenied"]
                );
                break;
              case 2:
                observer.error(
                  this.GEOLOCATION_ERRORS["errors.location.positionUnavailable"]
                );
                break;
              case 3:
                observer.error(this.GEOLOCATION_ERRORS["errors.location.timeout"]);
                break;
            }
          },
          geoLocationOptions
        );
      } else {
        observer.error(
          this.GEOLOCATION_ERRORS["errors.location.unsupportedBrowser"]
        );
      }
    });
  }

  public getLocationJs() {
    if (window && window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else { 
      this.errorMsg = "Geolocation is not supported by this browser.";
    }
  }
  
  private showPosition(position) {
    const lat = position.coords.latitude ;
    const lon = position.coords.longitude;
  }
  
  private showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.errorMsg = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        this.errorMsg = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        this.errorMsg = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        this.errorMsg = "An unknown error occurred."
        break;
    }
    console.log(this.errorMsg);
  }

}
