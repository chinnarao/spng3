/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//https://developers.google.com/maps/documentation/javascript/
// https://github.com/robisim74/angular-maps/blob/04864c37e653ab0ad93b87dc4badcb9a098061a9/src/app/app.component.ts
@Injectable() export class GoogleService {

    geocoder: google.maps.Geocoder;

    constructor() {
        this.geocoder = new google.maps.Geocoder();
    }

    /**
     * Reverse geocoding by location.
     * Wraps the Google Maps API geocoding service into an observable.
     * @param lat, @param lng are Location coordinates
     * @return An observable of GeocoderResult
     */
    geocode(lat: number, lng: number): Observable<google.maps.GeocoderResult[]> {
        const position = new google.maps.LatLng(lat, lng);
        return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ location: position }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        console.log('Geocoding service: geocoder failed due to: ' + status);
                        observer.error(status);
                    }
                })
            );
        });
    }

    /**
     * Geocoding service.
     * Wraps the Google Maps API geocoding service into an observable.
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
        return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ address: address }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        console.log(
                            'Geocoding service: geocode was not successful for the following reason: '
                            + status
                        );
                        observer.error(status);
                    }
                })
            );
        });
    }

}