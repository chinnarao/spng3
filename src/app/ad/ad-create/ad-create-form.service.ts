import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";
import { LocalStorageService } from "src/app/_core/local-storage.service";
import { AdModel } from "src/app/_models/ad.models";

@Injectable()
export class AdCreateFormService {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.fb.group(
      {
        userSocialAvatarUrl: [null, Validators.required],
        userSocialProviderName: [null, Validators.required],
        conditionName: [null, Validators.required],
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
        displayDays: [null, Validators.required], // should allow only digits // 1 to 255
        userIdOrEmail: [null, Validators.required],
        phoneCountryCode: [null], // should allow only digits
        phoneNumber: [null, this.phoneNumberValidator], // should allow only digits
        itemCurrencyCode: [null],
        itemCost: [null, Validators.required], // 0 means free or donation, plan: this is not mandate but if 0 should warn , are you forget cost?
        addressStreet: [null],
        addressPartiesMeetingLandmark: [null],
        addressCity: [null],
        addressState: [null],
        addressZipCode: [null],
        addressCountryCode: [null],
        addressCountryName: [null],
        longitude: [null],
        latitude: [null]
      },
      {
        validator: this.formValidator()
      }
    );
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
        phoneNumber: [null, this.phoneNumberValidator], // should allow only digits
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
      },
      {
        validator: this.formValidator()
      }
    );
    return this.form;
  }

  formValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};

      // if (!(control.get('tags') as FormArray).length) {
      //   errors.noTags = {
      //     message: 'You must select at least one tag to advertisement'
      //   };
      // }

      return Object.keys(errors).length ? errors : null;
    };
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

  phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value);
    return valid ? null : { invalidNumber: { valid: false, value: control.value } };
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
}
