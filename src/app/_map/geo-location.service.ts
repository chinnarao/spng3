import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const GEOLOCATION_ERRORS = {
  "errors.location.unsupportedBrowser": "Browser does not support location services",
  "errors.location.permissionDenied": "You have rejected access to your location",
  "errors.location.positionUnavailable": "Unable to determine your location",
  "errors.location.timeout": "Service timeout has been reached"
};

//https://www.w3schools.com/html/html5_geolocation.asp

@Injectable()
export class GeoLocationService {

  errorMsg : string;
  // Default = {
  //   latitude : 18.5793,
  //   longitude : 18.5793,
  //   center: true,
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // };

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
                  GEOLOCATION_ERRORS["errors.location.permissionDenied"]
                );
                break;
              case 2:
                observer.error(
                  GEOLOCATION_ERRORS["errors.location.positionUnavailable"]
                );
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS["errors.location.timeout"]);
                break;
            }
          },
          geoLocationOptions
        );
      } else {
        observer.error(
          GEOLOCATION_ERRORS["errors.location.unsupportedBrowser"]
        );
      }
    });
  }

  getLocationJs() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else { 
      this.errorMsg = "Geolocation is not supported by this browser.";
    }
  }
  
 showPosition(position) {
  this.errorMsg = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  //var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";
  //document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
  }
  
  showError(error) {
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
  }

}

// export let geolocationServiceInjectables: Array<any> = [
//   { provide: GeoLocationService, useClass: GeoLocationService }
// ];
