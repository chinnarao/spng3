import { LatLon } from './../../_models/ad.models';
import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AdModel } from "src/app/_models/ad.models";
import lookup from "src/assets/data/lookup.json";
import { Constants, GeoCodeReverseWithLatLonEnum } from "src/app/_core/constants";
import { Observable, of } from "rxjs";
import { map, startWith, debounceTime, switchMap, catchError } from "rxjs/operators";
import { Util } from "src/app/_core/util";
import { range } from "src/app/_core/validators";
import { LocationCurrentService } from "src/app/_map/location-current.service";
import { HandleError, HttpErrorHandler } from "src/app/_core/http-error-handler.service";
import { KeyValueDescription } from "src/app/_models/ad-lookup.models";
import { HereService, HereModel } from "src/app/_map/here.service";
import { BingService } from "src/app/_map/bing.service";
import { MapTilerService, MapTilerModel } from "src/app/_map/map-tiler.service";
import { GeoIPDbService, GeoIPDbModel } from "src/app/_map/geoip-db.service";
import { EsriService, esriAddressModel } from "src/app/_map/esri.service";
import { environment } from 'src/environments/environment';

@Injectable()
export class AdCreateFormService {
  form: FormGroup;
  categories = lookup.categoryOptionsBy;
  conditions = lookup.conditionOptionsBy;
  LatLon: LatLon = new LatLon();
  temp = "this is temp";

  private handleError: HandleError;

  FIELD_MSG_REQ = Constants.FIELD_MSG_REQ;
  FIELD_MSG_MIN = Constants.FIELD_MSG_MIN;
  FIELD_HINT_DISPLAYDAYS = Constants.FIELD_HINT_DISPLAYDAYS;
  FIELD_HINT_PHONECOUNTRYCODE = Constants.FIELD_HINT_PHONECOUNTRYCODE;
  FIELD_HINT_PHONENUMBER = Constants.FIELD_HINT_PHONENUMBER;
  FIELD_HINT_ITEMCOST = Constants.FIELD_HINT_ITEMCOST;
  FIELD_HINT_ITEMCURRENCYCODE = Constants.FIELD_HINT_ITEMCURRENCYCODE;
  DAYS_TO_DISPLAY = Constants.DAYS_TO_DISPLAY;

  constructor(private fb: FormBuilder, private locationCurrentService : LocationCurrentService, private hereService: HereService, 
    httpErrorHandler: HttpErrorHandler, private bingService: BingService, private mapTilerService: MapTilerService,
    private geoIPDbService: GeoIPDbService, private esriService: EsriService) {
    this.handleError = httpErrorHandler.createHandleError("AdCreateFormService");
    this.form = this.AdForm;
    this.form.patchValue(this.AdFormDefaultData);
  }

  GetDefaultForm(ad: AdModel) {
    this.form = this.fb.group(
      {
        userSocialAvatarUrl: [null, Validators.required],
        userSocialProviderName: [null, Validators.required],
        conditionName: [null, Validators.required],
        category: [ad.category, Validators.required],
        title: [
          null,
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(500),
            Validators.required
          ])
        ],
        content: [
          null,
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(8000),
            Validators.required
          ])
        ],
        displayDays: [ad.adDisplayDays, Validators.required], // should allow only digits // 1 to 255
        userIdOrEmail: [null, Validators.required],
        phoneCountryCode: [null], // should allow only digits
        phoneNumber: [null], // should allow only digits
        itemCurrencyCode: [null],
        itemCost: [ad.itemCost, Validators.required], // 0 means free or donation, plan: this is not mandate but if 0 should warn , are you forget cost?
        addressStreet: [null],
        addressPartiesMeetingLandmark: [null],
        addressCity: [null],
        addressState: [null],
        addressZipCode: [null],
        addressCountryCode: [null],
        addressCountryName: [null],
        longitude: [ad.addressLongitude],
        latitude: [ad.addressLatitude],
        address: [null],
      }
    );
    return this.form;
  }


  loadDefaults(): void {
    //this.form.patchValue(null);
  }

  resetForm() {
    // while (this.pizzasArray.length) {
    //   this.pizzasArray.removeAt(0);
    // }

    this.form.reset();
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.validateAllFormFields(this.form);
      return false;
    }
    return true;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  
  get AdForm(): FormGroup {
    this.form = this.fb.group(
      {
        condition: [null, Validators.required],
        category: [null, Validators.required],
        title: [
          null,
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(500),
            Validators.required
          ])
        ],
        content: [
          null,
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(8000),
            Validators.required
          ])
        ],
        adDisplayDays: [null, [Validators.required, range(1,255)]],
        phoneCountryCode: [null], 
        phoneNumber: [null], 
        itemCurrencyCode: [null],
        itemCost: [null],
        addressStreet: [null],
        addressCity: [null],
        addressState: [null],
        addressZipCode: [null],
        addressCountryName: [null],
        addressLongitude: [null],
        addressLatitude: [null],
        address: [''],
      }
    );
    return this.form;
  } 

  //Number('123'); +'123'; parseInt('123'); parseFloat('123.45')
  get AdFormDefaultData() : AdModel {
    let m: AdModel = new AdModel();
    m.adDisplayDays = +this.DAYS_TO_DISPLAY; 
    m.category = this.categories[0];
    m.condition = this.conditions[0];
    return m;
  }

  callback_BingLocationSelected(result){
    console.log("Bing Map Loaded successfully! and script registered successfully.");
    console.log(result);
  }
  typeaheadBing(): void {
    this.bingService.typeaheadData("#bingTypeaheadInput","#bingTypeaheadDivContainer", this.callback_BingLocationSelected);
  }

  typeaheadMapTilerList$: Observable<MapTilerModel[]> = null;
  typeaheadMapTilerControl = new FormControl();
  typeaheadMapTiler(): void {
    this.typeaheadMapTilerList$ = this.typeaheadMapTilerControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          return this.mapTilerService.typeaheadData(value).pipe(
            map(results => results),
            catchError(_ => of(null) )
          );
        } else {
          return of(null);
        }
      })
    );
  }

  typeaheadHereList$: Observable<HereModel[]> = null;
  typeaheadHereControl = new FormControl();
  typeaheadHere(): void {
    this.typeaheadHereList$ = this.typeaheadHereControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          return this.hereService.typeaheadData(value).pipe(
            map(results => results.suggestions),
            catchError(_ => of(null))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  typeaheadCategoryList$: Observable<any[]>;
  typeaheadCategories(): void {
    this.typeaheadCategoryList$ = this.form.controls['category'].valueChanges.pipe(
      startWith(''),
      map(input => {
        if (input !== '') {
          return this.categories.filter(c => c.value.toLowerCase().includes(input.value.toLowerCase()));
        }
        else {
          return this.categories;
        }
      })
    );
  }
  typeaheadCategoryDisplayFn(kvd: KeyValueDescription) {
    if (kvd) { return kvd.value; }
  }

  typeaheadCurrencyList$: Observable<string[]>;
  typeaheadCurrencies(): void {
    this.typeaheadCurrencyList$ = this.form.controls['itemCurrencyCode'].valueChanges.pipe(
      startWith(""),
      map(value => {
        const uniqueCurrencyCodes = Util.GetCurrencyCodesFromJson();
        if (value !== '') {
          return uniqueCurrencyCodes.filter(c => c.toLowerCase().includes(value.toLowerCase()));
        } else {
          return uniqueCurrencyCodes;
        }
      })
    );
  }

  knowYourLocation(){
    if( this.LatLon && this.LatLon.Lat && this.LatLon.Lon){
      this.addressPopulateFrom3rdParty();
      return;
    }
    const currentPosition$ = this.locationCurrentService.getLocationRxJs();
    currentPosition$.subscribe(
      position => {
        if(position && position.coords){
          this.LatLon.Lat = position.coords.latitude;
          this.LatLon.Lon = position.coords.longitude;
        }
      },
      response => {
      },
      () => { this.addressPopulateFrom3rdParty();}
    );
  }

  callback_BingLocationByPoint(answer: any, userData: any){
    console.log(answer.address);
  }

  addressPopulateFrom3rdParty(){
    if( this.LatLon && this.LatLon.Lat && this.LatLon.Lon){
      switch (environment.map.whichGeoCodeReverseWithLatLon.toLowerCase()) {
        case GeoCodeReverseWithLatLonEnum.BING.toLowerCase():
          this.address_Bing();
          break;
        case GeoCodeReverseWithLatLonEnum.ESRI.toLowerCase():
          this.address_Esri();
          break;
        default:
          this.address_Bing();
          break;
      }
    }
    else{
      this.address_GeoIPDb();
    }
  }

  private address_Bing(): void {
    this.bingService.searchData(this.LatLon.Lat, this.LatLon.Lon, this.callback_BingLocationByPoint);
  }
  private address_GeoIPDb(): void {
    this.geoIPDbService.geoIPDbReverseGeoCode().subscribe(
      result => {
          this.temp = this.temp + result.postal;
      },
      response => {console.log("GeoIPDb call in error", response);},
      () => {console.log("GeoIPDb call is now completed.");}
    );
  }
  private address_Esri(): void {
    this.esriService.esriReverseGeoCode(this.LatLon.Lat,this.LatLon.Lon).subscribe(
      result => {
          const address : esriAddressModel = <esriAddressModel>result.address;
          this.temp = address.LongLabel;
      },
      response => {console.log("Esri call in error", response);},
      () => {console.log("Esri call is now completed.");}
    );
  }

}
