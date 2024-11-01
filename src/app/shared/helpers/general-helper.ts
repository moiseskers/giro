import {FormGroup} from "@angular/forms";
import {Role} from '../enums/role';
import {HasAnyRolePipe} from '../pipes/has-any-role/has-any-role.pipe';
import {remove as removeDiacritics} from 'diacritics';

export class GeneralHelper {

    public static enumToList(enumObj: any, nameKey: string = 'key', valueKey: string = 'value'): any[] {
        return Object.keys(enumObj).map(key => ({ [nameKey]: enumObj[key], [valueKey]: key }));
    }

    // the object value ex: BranchProducerType, BranchProducerType.PRODUCER
    public static getKeyByValue(obj: any, value: any): any {
        for (const key in obj) {
            if (obj[key] === value) {
                return key;
            }
        }
        return null;
    }

    public static formMarkAllAsTouchedModel1(form: any) {
        const formControlNames = Object.keys(form.controls);

        // Iterate over each form control name
        formControlNames.forEach(controlName => {

            // Get corresponding HTML element by name or id
            const element = document.querySelector(`[name="${controlName}"], [id="${controlName}"]`);
            // If element exists, mark the corresponding form control as touched
            if (element) {
                const control = form.get(controlName);
                if (control) {
                    control.markAsTouched();
                    control.markAsDirty();
                }
            }
        });
    }

    public static formClearValidationStatesOrganization(form: FormGroup): void {
        const keys = Object.keys(form.controls) || [];

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'organizationType') {
                continue;
            }

            const control = form.get(keys[i]);

            control.markAsPristine();
            control.markAsUntouched();
            // If you've decided to clear validators
            control.clearValidators();
            control.updateValueAndValidity();
        }
    }

    public static getNonNullNotEmptyProperties(obj: { [x: string]: any; }): any {
        const result = {};
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== '') {
                result[key] = obj[key];
            }
        }
        return result;
    }

    public static formatString(format: any, ...args: any[]) {
        return format.replace(/{(\d+)}/g, function(match: any, number: any) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    public static downloadBlob(blob: Blob) {
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadURL);  // Clean up the URL object
    }

    public static isEmptyOrUndefinedOrNull(...values: any[]): boolean {
        for (const value of values) {
            if (value === undefined || value === null) {
                return true;
            }

            if (typeof value === 'string' && value.trim() === '') {
                return true;
            }

            if (Array.isArray(value) && value.length === 0) {
                return true;
            }
        }

        return false;
    }

    static organizationViewByRoleHelper(hasAnyRolePipe: HasAnyRolePipe) {
        return (
                hasAnyRolePipe.transform([Role.ADMIN])
                ?
                true
                :
                hasAnyRolePipe.transform( [Role.MANAGER, Role.PRODUCER, Role.INDUSTRIAL_CONSUMER, Role.CITY])
                ?
                hasAnyRolePipe.transform([Role.USER_MODERATOR])
                :
                false
        )
    }

    static removeDiacritics(input: string): string {
        return removeDiacritics(input);
    }
}
