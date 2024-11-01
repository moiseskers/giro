import {NgModule} from '@angular/core';
import {PrimeNgTableSortHelperComponent} from './prime-ng-table-sort-helper.component';
import {CommonModule} from '@angular/common';
import {MenuModule} from 'primeng/menu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AppDynamicFormBuilderModule} from '../app-dynamic-form-builder/app-dynamic-form-builder.module';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {AppButtonModule} from "../button/button";

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        OverlayPanelModule,
        AppDynamicFormBuilderModule,
        CheckboxModule,
        FormsModule,
        AppButtonModule
    ],
    exports: [PrimeNgTableSortHelperComponent],
    declarations: [PrimeNgTableSortHelperComponent],
    providers: [],
})
export class PrimeNgTableSortHelperModule {
}
