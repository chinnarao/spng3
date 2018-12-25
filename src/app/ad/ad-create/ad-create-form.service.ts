import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AdModel } from "src/app/_models/ad.models";
import lookup from "src/assets/data/lookup.json";
import { range } from "src/app/_core/validators";
import { Constants } from "src/app/_core/constants";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Util } from "src/app/_core/util";
import { KeyValueDescription } from "src/app/_models/ad-lookup.models";

@Injectable()
export class AdCreateFormService {
  form: FormGroup;
  categories = lookup.categoryOptionsBy;
  conditions = lookup.conditionOptionsBy;

  FIELD_MSG_REQ = Constants.FIELD_MSG_REQ;
  FIELD_MSG_MIN = Constants.FIELD_MSG_MIN;
  FIELD_MSG_DISPLAYDAYS_MAX = Constants.FIELD_MSG_DISPLAYDAYS_MAX;
  FIELD_MSG_PHONECOUNTRYCode_MAX = Constants.FIELD_MSG_PHONECOUNTRYCode_MAX;

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
    if (input != null && input.value) {
      return this.categories.filter(c => c.value.toLowerCase().includes(input.value.toLowerCase()));
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
        userSocialAvatarUrl: [null, Validators.required],
        userSocialProviderName: [null, Validators.required],
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
        adDisplayDays: [null, [Validators.required, range(1,255)]], // should allow only digits // 1 to 255
        userIdOrEmail: [null, Validators.required],
        phoneCountryCode: [null, range(1,995)], // should allow only digits
        phoneNumber: [null], // should allow only digits
        itemCurrencyCode: [null],
        itemCost: [null], // 0 means free or donation, plan: this is not mandate but if 0 should warn , are you forget cost? //, this.hasExclamationMark
        addressStreet: [null],
        addressPartiesMeetingLandmark: [null],
        addressCity: [null],
        addressState: [null],
        addressZipCode: [null],
        addressCountryCode: [null],
        addressCountryName: [null],
        longitude: [null],
        latitude: [null]
      }
    );
    return this.form;
  } 

  get AdFormDefaultData() : AdModel {
    let m: AdModel = new AdModel();
    m.adDisplayDays = 30;
    m.itemCost = 0;
    m.addressLongitude = -118.263970;
    m.addressLatitude = 34.153520;
    m.category = this.categories[0];
    m.condition = this.conditions[0];
    // m.category.key = 0;
    // m.category.value = "All";
    // this.categories[0];
    return m;
  }

// isDisplaysDaysGT255(input: FormControl) {
//   let isMaxLimitFailed: boolean = false;
//   if (input.value && parseInt(input.value) > 255)
//       isMaxLimitFailed = true;
//   return isMaxLimitFailed ? { maxLimitFailed: true } : null;
// }
// ValidateUrl(control: AbstractControl) {
//   if (!control.value.startsWith('https') || !control.value.includes('.io')) {
//     return { validUrl: true };
//   }
//   return null;
// }

}
