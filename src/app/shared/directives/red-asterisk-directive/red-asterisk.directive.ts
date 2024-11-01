import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';


/**
 * @deprecated This class is deprecated. Use `RedAsteriskV2Directive` instead.
 */
@Directive({
    selector: '[appRedAsterisk]',
    standalone: true,
})
export class RedAsteriskDirective implements AfterViewInit {

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const labelText = this.el.nativeElement.textContent || this.el.nativeElement.innerText;
        const redAsteriskLabel = labelText.replace('*', '<span style="color: red;">*</span>');
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', redAsteriskLabel);
    }
}

