import {AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

export class HandleValidatorsHelper {

    public static set(controlName: string, form: FormGroup, validators?: ValidatorFn | ValidatorFn[] | null, asyncValidatorFn?: AsyncValidatorFn | AsyncValidatorFn[] | null,  updateOn?: 'change' | 'blur' | 'submit'): void {
        const control = form.get(controlName);
        HandleValidatorsHelper.setControl(controlName, form, validators, asyncValidatorFn, updateOn);
        control.updateValueAndValidity();
    }

    public static clear(controlName: string, form: FormGroup): void {
        const control = form.get(controlName);

        // Clear all validators
        control.clearValidators();
        control.updateValueAndValidity();
    }

    private static setControl(
        controlName: string,
        form: FormGroup,
        validators?: ValidatorFn | ValidatorFn[] | null,
        asyncValidatorFn?: AsyncValidatorFn | AsyncValidatorFn[] | null,
        updateOn?: 'change' | 'blur' | 'submit'
    ): void {
        const control = form.controls[controlName] as FormControl;
        const updatedControl = new FormControl(control.value, {
            validators: validators  || null,
            asyncValidators: asyncValidatorFn || null,
            updateOn: updateOn || 'change',
        }, );
        // Replace the control in the form group
        form.setControl(controlName, updatedControl);
    }

}
