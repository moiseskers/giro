import {NgModule} from '@angular/core';
import {AutofocusDirective} from './autofocus.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [AutofocusDirective],
    declarations: [AutofocusDirective],
    providers: [],
})
export class AutofocusModule {
}
