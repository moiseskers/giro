import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import {AppDynamicFormBuilderComponent} from './app-dynamic-form-builder.component';
import {FieldBuilderComponent} from './field-builder/field-builder.component';
import {TextBoxComponent} from './atoms/textbox';
import {DropDownComponent} from './atoms/dropdown';
import {FileComponent} from './atoms/file';
import {CheckBoxComponent} from './atoms/checkbox';
import {RadioComponent} from './atoms/radio';
import {DateComponent} from './atoms/date';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {TooltipModule} from 'primeng/tooltip';
import {Multiselect} from "./atoms/multiselect";
import {MultiSelectModule} from "primeng/multiselect";
import {AppCalendarModule} from "../calendar/calendar";
import {Autocomplete} from "./atoms/autocomplete";
import {AppAutoCompleteModule} from "../autocomplete/app-auto-complete.component";
import {MultiselectCheckbox} from "./atoms/multiselect-checkbox";
import {
    SingleDateRangeValidatorDirective
} from "../../directives/single-date-range-validator/single-date-range-validator.directive";
import {FormErrorModule} from "../form-error";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        RadioButtonModule,
        DropdownModule,
        CheckboxModule,
        TooltipModule,
        MultiSelectModule,
        FormsModule,
        AppCalendarModule,
        AppAutoCompleteModule,
        MultiselectCheckbox,
        SingleDateRangeValidatorDirective,
        FormErrorModule,
    ],
    declarations: [
        AppDynamicFormBuilderComponent,
        FieldBuilderComponent,
        TextBoxComponent,
        DropDownComponent,
        CheckBoxComponent,
        FileComponent,
        RadioComponent,
        DateComponent,
        Multiselect,
        Autocomplete
    ],
    exports: [AppDynamicFormBuilderComponent, FieldBuilderComponent],
    providers: []
})
export class AppDynamicFormBuilderModule {
}
