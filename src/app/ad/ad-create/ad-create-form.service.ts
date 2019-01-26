import { BingAddressModel } from './../../_map/bing.service';
import { LatLon } from './../../_models/ad.models';
import { Injectable, ChangeDetectorRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AdModel } from "src/app/_models/ad.models";
import lookup from "src/assets/data/lookup.json";
import { Constants, GeoCodeReverseWithLatLonEnum, TypeaheadApiEnum } from "src/app/_core/constants";
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
import { GoogleService } from 'src/app/_map/google.service';

@Injectable()
export class AdCreateFormService {
  form: FormGroup;
  categories = lookup.categoryOptionsBy;
  conditions = lookup.conditionOptionsBy;
  LatLon: LatLon = new LatLon();
  temp = "this is temp";
  fullAddress = "empty"; //460 w Doran st Glendale ca 91203 us

  private handleError: HandleError;

  FIELD_MSG_REQ = Constants.FIELD_MSG_REQ;
  FIELD_MSG_MIN = Constants.FIELD_MSG_MIN;
  FIELD_HINT_DISPLAYDAYS = Constants.FIELD_HINT_DISPLAYDAYS;
  FIELD_HINT_PHONECOUNTRYCODE = Constants.FIELD_HINT_PHONECOUNTRYCODE;
  FIELD_HINT_PHONENUMBER = Constants.FIELD_HINT_PHONENUMBER;
  FIELD_HINT_ITEMCOST = Constants.FIELD_HINT_ITEMCOST;
  FIELD_HINT_ITEMCURRENCYCODE = Constants.FIELD_HINT_ITEMCURRENCYCODE;
  DAYS_TO_DISPLAY = Constants.DAYS_TO_DISPLAY;

  private changeDetectorRef: ChangeDetectorRef

  constructor(private fb: FormBuilder, private locationCurrentService : LocationCurrentService, private hereService: HereService, 
    httpErrorHandler: HttpErrorHandler, private bingService: BingService, private mapTilerService: MapTilerService,
    private geoIPDbService: GeoIPDbService, private esriService: EsriService, private googleService: GoogleService,
    ) {
    this.handleError = httpErrorHandler.createHandleError("AdCreateFormService");
    this.form = this.AdForm;
    this.form.patchValue(this.AdFormDefaultData);
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
        // addressStreet: [null],
        // addressCity: [null],
        // addressState: [null],
        // addressZipCode: [null],
        // addressCountryName: [null],
        addressLongitude: [null],
        addressLatitude: [null],
        address: [''],
        fullAddress: [null],
        isBingTypeaheadShow: [false],
        isHereTypeaheadShow: [false],
        isMapTilerTypeaheadShow: [false],
        isGoogleTypeaheadShow: [false],
        staticGoogleMapsURL: [null],
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

    m.isBingTypeaheadShow = false;
    switch (environment.map.whichTypeaheadApi.toLowerCase()) {
      case TypeaheadApiEnum.BING.toLowerCase():
        m.isBingTypeaheadShow = true;
        break;
      case TypeaheadApiEnum.HERE.toLowerCase():
        m.isHereTypeaheadShow = true;
        break;
      case TypeaheadApiEnum.MAPTILER.toLowerCase():
        m.isMapTilerTypeaheadShow = true;
        break;
      case TypeaheadApiEnum.GOOGLE.toLowerCase():
        m.isGoogleTypeaheadShow = true;
        break;
      default:
        m.isBingTypeaheadShow = true;
        break;
    }

    return m;
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

  public typeaheads(cd: ChangeDetectorRef){
    this.changeDetectorRef = cd;
    switch (environment.map.whichTypeaheadApi.toLowerCase()) {
      case TypeaheadApiEnum.BING.toLowerCase():
        this.typeaheadBing();
        break;
      case TypeaheadApiEnum.HERE.toLowerCase():
        this.typeaheadHere();
        break;
      case TypeaheadApiEnum.MAPTILER.toLowerCase():
        this.typeaheadMapTiler();
        break;
      case TypeaheadApiEnum.GOOGLE.toLowerCase():
        break;
      default:
        this.typeaheadBing();
        break;
    }
  }

  typeaheadBing(): void {
    this.bingService.typeaheadData("#bingTypeaheadInput","#bingTypeaheadDivContainer", (answer) => {
      console.log("Bing Map Loaded successfully! and script registered successfully.");
      if (answer && answer.address) {
        const bingAddressModel: BingAddressModel = <BingAddressModel>answer.address;
        const staticGoogleMapsURL = Util.googleAddressUrl(bingAddressModel.formattedAddress);
        this.form.patchValue({
          fullAddress: bingAddressModel.formattedAddress,
          staticGoogleMapsURL: staticGoogleMapsURL,
        });
        this.changeDetectorRef.detectChanges();
      }
    });
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
      res => {
        if(res && res.coords){
          this.LatLon.Lat = res.coords.latitude;
          this.LatLon.Lon = res.coords.longitude;
        }
      },
      err => { this.addressPopulateFrom3rdParty();},
      () => { this.addressPopulateFrom3rdParty();}
    );
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
        case GeoCodeReverseWithLatLonEnum.GOOGLE.toLowerCase():
          this.address_Google();
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
    console.log("k-your-l_4");
    this.bingService.searchData(this.LatLon.Lat, this.LatLon.Lon, (answer: any, userData: any) => {
      if (answer && answer.address) {
        console.log("k-your-l_5");
        const bingAddressModel: BingAddressModel = <BingAddressModel>answer.address;
        const staticGoogleMapsURL = Util.googleAddressUrl(bingAddressModel.formattedAddress);
        this.form.patchValue({
          fullAddress: bingAddressModel.formattedAddress,
          staticGoogleMapsURL: staticGoogleMapsURL
        });
        this.changeDetectorRef.detectChanges();
        console.log("address_Bing(), inside patch success!");
      }
    });
  }
  
  private address_Esri(): void {
    this.esriService.esriReverseGeoCode(this.LatLon.Lat,this.LatLon.Lon).subscribe(
      result => {
          const esriData : esriAddressModel = <esriAddressModel>result.address;
          this.temp = esriData.LongLabel;
          this.fullAddress = esriData.LongLabel;
          this.form.patchValue({
            fullAddress: esriData.LongLabel
          });
      },
      response => {console.log("Esri call in error", response);},
      () => {console.log("Esri call is now completed.");}
    );
  }

  private address_Google(): void {
    this.googleService.geocode(this.LatLon.Lat,this.LatLon.Lon).forEach(
      (results: google.maps.GeocoderResult[]) => {
          console.log("results:", results);
          this.fullAddress = results[0].formatted_address;
          this.form.patchValue({
            fullAddress: results[0].formatted_address
          });
      })
      .then(() => console.log('Google Geocoding service: completed.'))
      .catch((error: google.maps.GeocoderStatus) => {
          //if (error === google.maps.GeocoderStatus.ZERO_RESULTS) {}
          console.log("error:", error);
      });
  }

  private address_GeoIPDb(): void {
    this.geoIPDbService.geoIPDbReverseGeoCode().subscribe(
      geoIPDbModel => {
        if (geoIPDbModel) {
          const fullAddress = this.geoIPDbService.FormattedAddress(geoIPDbModel);
          const staticGoogleMapsURL = Util.googleLatLonUrl(geoIPDbModel.latitude, geoIPDbModel.longitude);
          this.form.patchValue({
            fullAddress: fullAddress,
            staticGoogleMapsURL: staticGoogleMapsURL
          });
          this.changeDetectorRef.detectChanges();
        }
      },
      err => {console.log("GeoIPDb Error:", err);},
      () => {}
    );
  }

  // patchFB(){
  //   this.form.patchValue({
  //     name: 'Todd Motto',
  //     event: {
  //       title: 'AngularCamp 2016',
  //       location: 'Barcelona, Spain'
  //     }
  //   });
  //   const value = { name: 'Todd Motto', age: 26 };
  //   Object.keys(value).forEach(name => {
  //     if (this.form.controls[name]) {
  //       this.form.controls[name].patchValue(value[name], {onlySelf: true, emitEvent: true});
  //     }
  //   });
  // }
  //https://toddmotto.com/angular-2-form-controls-patch-value-set-value
  // patchValue(value: {[key: string]: any}, {onlySelf, emitEvent}: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
  //   Object.keys(value).forEach(name => {
  //     if (this.form.controls[name]) {
  //       this.form.controls[name].patchValue(value[name], {onlySelf: true, emitEvent});
  //     }
  //   });
  //   this.form.updateValueAndValidity({onlySelf, emitEvent});
  // }

  // setAddress(place: any): void {
  //   console.log(place);
  // }

}
