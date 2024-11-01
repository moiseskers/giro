import {NgModule} from '@angular/core';
import {FormErrorComponent} from './form-error.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FormErrorComponent
    ],
    declarations: [FormErrorComponent],
    providers: [],
})
export class FormErrorModule {
}
