import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appSingleDateRangeValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SingleDateRangeValidatorDirective,
      multi: true
    }
  ]
})
export class SingleDateRangeValidatorDirective implements Validator {

  @Input('appSingleDateValidate') toValidate: boolean = false;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.toValidate) {
      return null;  // Skip validation if useit is false
    }

    if (!control.value) {
      return null;
    }

    const value = control.value;
    if (Array.isArray(value) && value.length === 2) {
      const [startDate, endDate] = value;

      if (startDate instanceof Date && endDate instanceof Date && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return null;
      }
    }

    return { singleDateRange: 'The date range must be an array of two dates in the format DD/MM/YYYY' };
  }

}
