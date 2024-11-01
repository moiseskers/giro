import {Component, forwardRef, Injector, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {ErrorMessagesHelper} from './form-error-helpers/error-messages.helper';
import {Pattern} from './form-error-models/pattern';
import {CustomErrorMessages} from './form-error-models/custom-error-messages';

@Component({
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormErrorComponent),
            multi: true,
        },
    ],
    selector: '[app-form-error]',
    template: `
        <ng-container *ngIf="this.ngControl?.control?.errors">
            <small [style]="customStyle" *ngIf="!this.ngControl?.control?.pending && !this.ngControl?.control?.valid && this.ngControl?.control?.touched" class="p-error flex justify-content-start font mt-2">
                <div class="flex gap-2">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.59 6.24023L10 8.83023L7.41 6.24023L6 7.65023L8.59 10.2402L6 12.8302L7.41 14.2402L10 11.6502L12.59 14.2402L14 12.8302L11.41 10.2402L14 7.65023L12.59 6.24023ZM10 0.240234C4.47 0.240234 0 4.71023 0 10.2402C0 15.7702 4.47 20.2402 10 20.2402C15.53 20.2402 20 15.7702 20 10.2402C20 4.71023 15.53 0.240234 10 0.240234ZM10 18.2402C5.59 18.2402 2 14.6502 2 10.2402C2 5.83023 5.59 2.24023 10 2.24023C14.41 2.24023 18 5.83023 18 10.2402C18 14.6502 14.41 18.2402 10 18.2402Z" fill="#B3261E"/></svg>
                    <div class="align-self-center">{{getErrorMessage}}</div>
                </div>
            </small>
        </ng-container>
    `,
    styles: [
        `
            .font {
                font-size: 12px !important;
            }
        `
    ],

})
export class FormErrorComponent implements ControlValueAccessor {

    @Input()
    patterns: Pattern[] | Pattern;

    @Input()
    customErrorMessages: CustomErrorMessages[] | CustomErrorMessages;

    public ngControl: NgControl;

    @Input()
    customStyle = '';

    constructor(private _injector: Injector) {
    }

    get getErrorMessage(): string {
        return ErrorMessagesHelper.handle({
                fieldPatterns: this.patterns,
                formControl: this.ngControl.control,
                customErrorMessages: this.customErrorMessages
            }
        );
    }

    ngOnInit(): void {
        this.ngControl = this._injector.get(NgControl);
    }

    writeValue(obj: any): void {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState?(isDisabled: boolean): void {
    }

}
