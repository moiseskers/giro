import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {IErrorMessages} from '../form-error-interfaces/i-error-messages';
import {CustomErrorMessages} from '../form-error-models/custom-error-messages';
import {Messages} from '../form-error-models/error-messages';
import {Pattern} from '../form-error-models/pattern';

export class ErrorMessagesHelper {

    public static errorMessages: IErrorMessages = new Messages().message();

    public static handle(options: {
        formControl: UntypedFormControl | AbstractControl,
        fieldPatterns?: Pattern[] | Pattern,
        customErrorMessages?: CustomErrorMessages[] | CustomErrorMessages,
    }) {

        let formControl = options.formControl;
        let fieldPatterns: Pattern[] | Pattern = options.fieldPatterns;
        let customErrorMessages: CustomErrorMessages[] | CustomErrorMessages = options?.customErrorMessages;

        let error: any = Object.keys(formControl?.errors ? formControl?.errors : {})[0];

        switch (error) {
            case 'minlength':
                // minLengthMessage
                // pattern: minimum characters required : 10
                return `${this.errorMessages.minLength}: ${formControl?.errors['minlength']?.requiredLength}`;
            case 'maxlength':
                // pattern: maximum characters required : 10
                return `${this.errorMessages.maxLength}: ${formControl?.errors['maxlength']?.requiredLength}`;
            case 'strong':
                return `${this.errorMessages.strongPassword}`;
            case 'equalTo':
                return `${this.errorMessages.equalsToPassword}`;
            case 'required':
                return `${this.errorMessages.required}`;
            case 'email':
                return `${this.errorMessages.email}`;
            case 'min':
                return `${this.errorMessages.min} : ${ErrorMessagesHelper.getMessageHelper(formControl?.errors['min']?.min, error, customErrorMessages)}`;
            case 'max':
                return `${this.errorMessages.max} : ${formControl?.errors['max']?.max}`;
            case 'urlInvalid':
                return `${this.errorMessages.notValidUrl}`;
            case 'pattern':
                return ErrorMessagesHelper.findTheCurrentPatternError(formControl?.errors[Object.keys(formControl?.errors)[0]], fieldPatterns);
            default:
                let customErrorMessage = ErrorMessagesHelper.findTheCurrentCustomErrorMessage(error, customErrorMessages);
                return customErrorMessage ? customErrorMessage : `Unknown Error ${error}`;
        }
    }

    private static getMessageHelper(input: string, error: any, customErrorMessages: CustomErrorMessages | CustomErrorMessages[]): string {
        if (input) {
            return input;
        } else {
            let customErrorMessage = ErrorMessagesHelper.findTheCurrentCustomErrorMessage(error, customErrorMessages);
            return customErrorMessage ? customErrorMessage : `Unknown Error ${error}`;
        }
    }

    // patterns: [
    //     {
    //         requiredPattern: '^[^0-9\\s]+$',
    //         message: 'Login não deve conter espaços em branco'
    //     }
    // ]
    private static findTheCurrentPatternError(pattern: any, fieldPatterns: Pattern[] | Pattern): string {
        if (Array.isArray(fieldPatterns)) {
            try {
                return fieldPatterns.filter(value => value.requiredPattern == pattern.requiredPattern)[0]?.message;
            } catch (e) {
                return `Couldn't find error message for pattern: ${pattern?.requiredPattern}`;
            }
        } else {
            try {
                return fieldPatterns.message;
            } catch (e) {
                return `Couldn't find error message for pattern: ${pattern?.requiredPattern}`;
            }
        }

    }

    private static findTheCurrentCustomErrorMessage(errorIdentifier: any, customErrorMessages: CustomErrorMessages[] | CustomErrorMessages): string {
        if (Array.isArray(customErrorMessages)) {
            try {
                return customErrorMessages.filter(value => value.errorIdentifier == errorIdentifier)[0]?.message;
            } catch (e) {
                return `Couldn't find error message for custom error: ${errorIdentifier}`;
            }
        } else {
            try {
                return customErrorMessages.message;
            } catch (e) {
                return `Couldn't find error message for custom error: ${errorIdentifier}`;
            }
        }
    }

}
