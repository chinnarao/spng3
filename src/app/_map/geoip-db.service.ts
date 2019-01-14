//https://developer.here.com/api-explorer/rest/geocoding_suggestions
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
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
// {"country_code":"US","country_name":"United States","city":"Whittier","postal":"90605","latitude":33.9413,"longitude":-118.0356,"IPv4":"137.25.60.99","state":"California"}
@Injectable()
export class GeoIPDbService {

    geoIPDbModel: GeoIPDbModel;
    constructor(private httpClient: HttpClient) {}

    public geoIPDbReverseGeoCode(): Observable<GeoIPDbModel> {
        return this.httpClient.get<GeoIPDbModel>(environment.map.geoIPDb.url);
    }

}