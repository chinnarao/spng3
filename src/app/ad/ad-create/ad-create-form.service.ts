import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AdModel } from "src/app/_models/ad.models";
import lookup from "src/assets/data/lookup.json";
import { Constants } from "src/app/_core/constants";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Util } from "src/app/_core/util";
import { KeyValueDescription } from "src/app/_models/ad-lookup.models";
import { range } from "src/app/_core/validators";

@Injectable()
export class AdCreateFormService {
  form: FormGroup;
  categories = lookup.categoryOptionsBy;
  conditions = lookup.conditionOptionsBy;

  FIELD_MSG_REQ = Constants.FIELD_MSG_REQ;
  FIELD_MSG_MIN = Constants.FIELD_MSG_MIN;
  FIELD_HINT_DISPLAYDAYS = Constants.FIELD_HINT_DISPLAYDAYS;
  FIELD_HINT_PHONECOUNTRYCODE = Constants.FIELD_HINT_PHONECOUNTRYCODE;
  FIELD_HINT_PHONENUMBER = Constants.FIELD_HINT_PHONENUMBER;
  FIELD_HINT_ITEMCOST = Constants.FIELD_HINT_ITEMCOST;
  FIELD_HINT_ITEMCURRENCYCODE = Constants.FIELD_HINT_ITEMCURRENCYCODE;
  DAYS_TO_DISPLAY = Constants.DAYS_TO_DISPLAY;

  constructor(private fb: FormBuilder) {
    this.form = this.AdForm;
    this.form.patchValue(this.AdFormDefaultData);
  }

  filteredCurrencyCodes: Observable<string[]>;
  _initCurrencies(): void {
    this.filteredCurrencyCodes = this.form.controls['itemCurrencyCode'].valueChanges.pipe(
      startWith(""),
      map(value => this._filterCurrencies(value))
    );
  }
  _filterCurrencies(input: string): string[] {
    const uniqueCurrencyCodes = Util.GetCurrencyCodesFromJson();
    if (input) {
      return uniqueCurrencyCodes.filter(c => c.toLowerCase().includes(input.toLowerCase())
      );
    }
    return uniqueCurrencyCodes;
  }

  filteredCategories: Observable<any[]>;
  _initCategories(): void {
    this.filteredCategories = this.form.controls['category'].valueChanges.pipe(
      startWith(null),
      map(value => this._filterCategories(value))
    );
  }
  _filterCategories(input: any): any[] {
    if (input != null) {
      const cats = this.categories.filter(c => c.value.toLowerCase().includes(input.toLowerCase()));
      return cats;
    }
    return this.categories;
  }
  categoryDisplayFn(kvd: KeyValueDescription) {
    if (kvd) { return kvd.value; }
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
        latitude: [ad.addressLatitude]
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
        addressLatitude: [null]
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
}
