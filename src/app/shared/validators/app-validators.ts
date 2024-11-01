import {AbstractControl, ValidatorFn} from "@angular/forms";

export class AppValidators {

    static minDateValidator(): ValidatorFn {
        return (control: AbstractControl):{ [key: string]: any } | null => {
            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today date
            return inputDate >= today ? null :  {'minDate': true} ;
        };
    }

    static arrayNotEmptyValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;
            if (Array.isArray(value) && value.length === 0) {
                return { arrayNotEmpty: { valid: false } };
            }
            return null;
        };
    }
}
