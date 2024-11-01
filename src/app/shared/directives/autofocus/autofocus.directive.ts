import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AutoFocusHelper} from "./auto-focus.helper";

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    @Input()
    toFocus: boolean = true;

    @Input()
    timeout: number = 0;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        if (!(this.toFocus == false)) {
            this.focus();
        }
    }

    focus() {
        setTimeout(() => {
            AutoFocusHelper.setFocus(this.el.nativeElement);
        }, this.timeout);
    }

}
