import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//https://www.w3schools.com/html/html5_geolocation.asp
//https://www.codingame.com/playgrounds/3799/html-geolocation

@Injectable()
export class LocationCurrentService {

  GEOLOCATION_ERRORS = {
    "errors.location.unsupportedBrowser": "Browser does not support location services",
    "errors.location.permissionDenied": "You have rejected access to your location",
    "errors.location.positionUnavailable": "Unable to determine your location",
    "errors.location.timeout": "Service timeout has been reached"
  };

  constructor(){}

  public getLocationRxJs(): Observable<any> {
    
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          successCallback => {
            observer.next(successCallback);
            observer.complete();
          },
          errorCallback => {
            switch (errorCallback.code) {
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
          { timeout: 5000 }
        );
      } else {
        observer.error(
          this.GEOLOCATION_ERRORS["errors.location.unsupportedBrowser"]
        );
      }
    }); 

  }

  public getLocationJs(positionCallback?: (position: any) => void) {
    if (window && window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionCallback, this.showError);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  private showError(error) {
    let errorMsg : string;
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        errorMsg = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        errorMsg = "An unknown error occurred."
        break;
    }
    console.log(errorMsg);
  }

}
