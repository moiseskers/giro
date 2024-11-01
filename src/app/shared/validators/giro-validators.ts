import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ApiService} from "../../auth/pages/request-access/services/api.service";
import {OrganizationService} from '../../private/shared/services/organization.service';

export class GiroValidators {

    static email(service: ApiService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            console.log(`Validating email: ${control.value}`); // Log the email being validated
            return service.checkIfEmailExists(control.value).pipe(
                map((result: boolean) => {
                    console.log(`Email availability for '${control.value}': ${result}`); // Log the result of the email availability check
                    return result ? {emailAlreadyExists: true} : null; // Return appropriate error if email already exists
                })
            );
        };
    }

    static checkIfIdentityExists(service: OrganizationService | ApiService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            console.log(`Validating identity: ${control.value}`); // Log the email being validated
            return service.checkIfIdentityExists(control.value).pipe(
                map((result: boolean) => {
                    console.log(`identity availability for '${control.value}': ${result}`); // Log the result of the email availability check
                    return result ? {identityAlreadyExists: true} : null; // Return appropriate error if email already exists
                })
            );
        };
    }

    static rutValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value) {
                return null; // If control value is empty, return null (valid)
            }

            const rut = control.value.replace(/[.-]/g, ''); // Remove dots or hyphens
            const rutDigits = rut.slice(0, -1);
            const rutChecksum = rut.slice(-1).toUpperCase();

            // Validate format
            if (!/^\d{7,8}$/.test(rutDigits)) {
                return {'invalidFormat': true};
            }

            // Calculate checksum
            let sum = 0;
            let multiplier = 2;
            for (let i = rutDigits.length - 1; i >= 0; i--) {
                sum += parseInt(rutDigits.charAt(i)) * multiplier;
                multiplier = multiplier === 7 ? 2 : multiplier + 1;
            }

            // Calculate expected checksum digit
            const expectedChecksum = (11 - (sum % 11)).toString();
            const checksum = (expectedChecksum === '11') ? '0' : (expectedChecksum === '10') ? 'K' : expectedChecksum;

            // Validate checksum
            if (checksum !== rutChecksum) {
                return {'invalidChecksum': true};
            }

            return null; // Return null if valid
        };
    }

}
