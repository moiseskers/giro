import {Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';
import {ControlContainer, ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: '[appRedAsteriskV2]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RedAsteriskV2Directive),
            multi: true
        }
    ],
    standalone: true,
})
export class RedAsteriskV2Directive implements ControlValueAccessor {

    constructor(private el: ElementRef,
                private renderer: Renderer2,
                private controlContainer: ControlContainer,
    ) {
    }

    ngAfterViewInit(): void {
        this.updateLabel();

        // Listen to status changes from the parent form group
        if (this.controlContainer instanceof FormGroupDirective) {
            this.controlContainer.control?.statusChanges.subscribe(() => {
                this.updateLabel();
            });
        }
    }

    private updateLabel(): void {
        const labelText = this.el.nativeElement.textContent || this.el.nativeElement.innerText;

        // Get the form control name from the label's "for" attribute
        const formControlName = this.el.nativeElement.getAttribute('for');
        const control = this.controlContainer.control?.get(formControlName);

        if (control && control.invalid) {
            // Add the red asterisk if the control is invalid
            const redAsteriskLabel = labelText.replace('*', '') + ' <span style="color: red;">*</span>';
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', redAsteriskLabel);
        } else {
            // Remove the asterisk if the control is valid
            const cleanLabel = labelText.replace('*', '').trim();
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', cleanLabel);
        }
    }

    private onChange: (value: any) => void;
    private onTouched: () => void;

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}
