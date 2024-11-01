import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appYearValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: YearValidatorDirective,
      multi: true
    }
  ]
})
export class YearValidatorDirective implements Validator {

  yearPattern: string = '^(19|20)\\d{2}$';

  validate(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(this.yearPattern);
    const valid = regex.test(control.value);
    return valid ? null : { invalidYear: true };
  }
}
