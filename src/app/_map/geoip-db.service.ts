//https://developer.here.com/api-explorer/rest/geocoding_suggestions
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface GeoIPDbModel {
	country_code:string,
	country_name:string,
	city:string,
	postal:string,
	latitude:number,
	longitude:number,
	IPv4:string,
	state:string
}

@Injectable()
export class GeoIPDbService {

    geoIPDbModel: GeoIPDbModel;
    constructor(private httpClient: HttpClient) {}

    public geoIPDbData(): GeoIPDbModel {
        const geoIPDB$ = this.httpClient.get<any>(environment.map.geoIPDb.url);
        geoIPDB$.subscribe(
            result => {
                console.log("GeoIPDb call successful value returned in body", result);
                this.geoIPDbModel = result;
            },
            response => {console.log("GeoIPDb call in error", response);},
            () => {console.log("The GeoIPDb call is now completed.");}
        );
        return this.geoIPDbModel;
    }

}