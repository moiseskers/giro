import {Directive, ElementRef, HostListener} from '@angular/core';
import {NGXLogger} from "ngx-logger";

@Directive({
    selector: '[focusFirstInvalidField]'
})
export class FocusFirstInvalidFieldDirective {

    // @Input() focusFirstInvalidFieldFormInput:any;

    constructor(private el: ElementRef, private log: NGXLogger) {}

    @HostListener('submit', ['$event'])
    onFormSubmit(event: any) {
        setTimeout(() =>  this._onFormSubmit(event), 500);
    }

    private _onFormSubmit(event: any) {
        let invalidControls = this.el.nativeElement.querySelectorAll('input.ng-invalid.ng-touched.ng-dirty');
        let _invalidControls = this.el.nativeElement.querySelectorAll('.ng-invalid.ng-touched.ng-dirty');

        // const x = this.el.nativeElement.querySelectorAll('p-dropdown.ng-invalid.ng-touched.ng-dirty');

        invalidControls = [..._invalidControls, ...invalidControls];

        // Log the number of invalid controls found
        this.log.debug(`Number of invalid form controls: ${invalidControls.length}`);

        for (let x = 0; x < invalidControls.length; x++) {

            // Log details about each invalid control
            const invalidControl = invalidControls[x];


            if (!invalidControl.hasAttribute('tabindex')) {
                invalidControl.setAttribute('tabindex', '-1');
            }

            this.log.debug(`Invalid control #${x + 1}:`, invalidControl);

            // Mark all invalid controls as touched
            // this.focusFirstInvalidFieldFormInput.markAllAsTouched();
            // Prevent form submission
            event.preventDefault();

            // Focus on the first invalid control
            setTimeout(() => invalidControl.focus(), 500);

            // Log action taken
            this.log.info(`Focus set on invalid control #${x + 1}`);
            break; // Exit the loop after focusing on the first invalid control
        }
    }
}
