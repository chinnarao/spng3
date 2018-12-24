import { AbstractControl, ValidatorFn, FormGroup, AsyncValidatorFn, ValidationErrors } from'@angular/forms';
import { Observable } from 'rxjs';

export function emailMatcher(c: AbstractControl): { [key: string]: boolean} | null {
    const emailControl = c.get('email');
    const confirmControl = c.get('confirmEmail');
  
    // If neither email field touched at all, return true;
    // ===================================================
    if (emailControl.pristine || confirmControl.pristine) {
      return null; 
    }
  
    if (emailControl.value === confirmControl.value) {
      return null; //returning NULL indicates validation rule success
    }
  
    return { 'match': true };
}
  
  
export function range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        // Returns NULL if valid. If NOT a number, less than MIN or greater than MAX, then invalid.
        // When invalid, returns TRUE along with a key / value pair. That key ('range') may be referenced
        // in the HTML in the Span for the error message.
        // ====================================================================================
        if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
        }
        return null;
    }
}

export function maxLimit(max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        // Returns NULL if valid. If NOT a number, less than MIN or greater than MAX, then invalid.
        // When invalid, returns TRUE along with a key / value pair. That key ('range') may be referenced
        // in the HTML in the Span for the error message.
        // ====================================================================================
        if (c.value != null && (isNaN(c.value) || c.value > max)) {
            return { 'maxLimitFailed': true };
        }
        return null;
    }
}

export function IsValidDate(): AsyncValidatorFn   {
    return (control: AbstractControl): Promise<ValidationErrors |null|Observable<ValidationErrors|null>> => {

        const invalidOj = { "IsValidDate": true };


        const stardDate = Date.parse(control.value);
        if (stardDate === undefined || stardDate === null) {

            return Promise.resolve(invalidOj);
        }
        return Promise.resolve(null);
    }
}
 

export function  DateMustbeGreaterThanValidation (startDateFormControlname: string, endDateFormControlname: string): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {

        const invalidOj = { "DateRange": true };
        const startDateFormControl = control.get(startDateFormControlname);
        const endDateFormControl = control.get(endDateFormControlname);
        if (startDateFormControl.valid && endDateFormControl.valid) {
            const stardDate = Date.parse(startDateFormControl.value);
            const endDate = Date.parse(endDateFormControl.value);
            if (stardDate > endDate) {
                control.setErrors({'DateRange':true});
                return invalidOj;
            }
            return null;
        }
        return null;

    }
}

export function getCurrentDate(): Date   {
    return new Date();
}

export function getTomorrowDate(): Date   {
    let currentDate=getCurrentDate();
    currentDate.setDate(currentDate.getDate()+1);
    return currentDate;
    
    //return new Date(currentDate.getFullYear(),currentDate.getMonth(),cur);
}