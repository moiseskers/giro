import {NgModule} from '@angular/core';
import {AppFilterComponent} from './app-filter.component';
import {CommonModule, DatePipe} from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import {AppDynamicFormBuilderModule} from '../app-dynamic-form-builder';
import {RippleModule} from 'primeng/ripple';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CheckboxModule} from 'primeng/checkbox';
import {PrimeNgTableSortHelperModule} from '../prime-ng-table-sort-helper';
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {AppButtonModule} from "../button/button";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";

@NgModule({
    imports: [
        CommonModule,
        AppDynamicFormBuilderModule,
        MenubarModule,
        InputTextModule,
        SharedModule,
        AppButtonModule,
        ReactiveFormsModule,
        MenuModule,
        OverlayPanelModule,
        DividerModule,
        RippleModule,
        VirtualScrollerModule,
        CheckboxModule,
        FormsModule,
        PrimeNgTableSortHelperModule,
        AppDynamicFormBuilderModule,
        PrimeNgTableSortHelperModule,
        InputGroupModule,
        InputGroupAddonModule,
        ButtonModule,
        SidebarModule,
    ],
    exports: [AppFilterComponent],
    declarations: [AppFilterComponent],
    providers: [DatePipe],
})
export class AppFilterModule {
}


