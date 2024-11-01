import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appMaxFloatValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxFloatValidatorDirective),
      multi: true
    }
  ]
})
export class MaxFloatValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // if (value == null || value === '') {
    //   return null; // Don't validate empty values, use another validator for required checks
    // }

    const numValue = Number(value);

    // if (isNaN(numValue)) {
    //   return { 'notANumber': true };
    // }

    // if (numValue > 2147483647) {
    //   return { 'exceedsMaxFloat': true };
    // }

    return null; // Valid value
  }
}
