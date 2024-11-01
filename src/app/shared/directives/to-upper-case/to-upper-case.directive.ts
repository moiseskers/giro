import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appToUpperCase]',
    standalone: true
})
export class ToUpperCaseDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('input', ['$event']) onInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.el.nativeElement.value = input.value.toUpperCase();
    }

}
