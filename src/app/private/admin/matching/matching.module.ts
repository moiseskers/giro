import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppCardModule} from "../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../shared/components/app-paginator";
import {
    DeclarationRequestListComponent
} from "../../shared/components/declaration-request-list/declaration-request-list.component";
import {LoaderServiceModule} from "../../../shared/services/loader";
import {ButtonModule} from "primeng/button";
import {
    DeclarationRequestStatusesComponent
} from "../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {HasAnyRolePipeModule} from "../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RouterModule, Routes} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {MatchingListPageComponent} from './pages/matching-list-page/matching-list-page.component';
import {MatchingFormComponent} from './components/matching-form/matching-form.component';
import {DropdownModule} from 'primeng/dropdown';
import {DividerModule} from 'primeng/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {AppFilterV2Component} from '../../../shared/components/app-filter-v2/app-filter-v2.component';

import {YearValidatorDirective} from '../../../shared/directives/app-year-validator/year-validator.directive';
import {FiltersContainerComponent} from './containers/filters-container/filters-container.component';
import {AppCalendarModule} from '../../../shared/components/calendar/calendar';
import {FormErrorModule} from '../../../shared/components/form-error';
import {
    SingleDateRangeValidatorDirective
} from '../../../shared/directives/single-date-range-validator/single-date-range-validator.directive';
import {FocusFirstInvalidFieldModule} from '../../../shared/directives/focus-first-invalid-field';
import {AppButtonModule} from '../../../shared/components/button/button';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {CheckEmptyPipe} from '../../../shared/pipes/check-empty/check-empty.pipe';
import {
    MatchingCreateContainerComponent
} from './containers/matching-create-container/matching-create-container.component';
import {AppAutoCompleteModule} from '../../../shared/components/autocomplete/app-auto-complete.component';
import {RedAsteriskV2Directive} from '../../../shared/directives/red-asterisk-directive/red-asterisk-v2.directive';
import {MatchingDataComponent} from './components/matching-data/matching-data.component';
import {AppViewDataComponent} from '../../../shared/components/app-view-data/app-view-data.component';
import {GiroDataViewComponent} from '../../../shared/components/giro-menu-bar/giro-data-view.component';
import {MatchingViewPageComponent} from './pages/matching-view-page/matching-view-page.component';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {InvoiceStatusesComponent} from '../invoice/components/invoice-statuses/invoice-statuses.component';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {
    MatchingDetailListContainerComponent
} from './containers/matching-detail-list-container/matching-detail-list-container.component';
import {MatchingDetailListComponent} from './components/matching-detail-list/matching-detail-list.component';
import {AddSymbolPipe} from '../../../shared/pipes/add-symbol/add-symbol.pipe';
import {
    MatchingSimulateContainerComponent
} from './containers/matching-create-simulate/matching-simulate-container.component';

export const routes: Routes = [
    {
        path: '',
        component: MatchingListPageComponent,
    },
    {
        path: 'view',
        component: MatchingViewPageComponent,
    }
];

@NgModule({
    declarations: [MatchingSimulateContainerComponent, MatchingListPageComponent, MatchingFormComponent, FiltersContainerComponent, MatchingCreateContainerComponent, MatchingDataComponent, MatchingViewPageComponent, MatchingDetailListContainerComponent],
    providers: [ DialogService,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        DeclarationRequestListComponent,
        LoaderServiceModule,
        ButtonModule,
        DeclarationRequestStatusesComponent,
        HasAnyRolePipeModule,
        MenuModule,
        SharedModule,
        TableModule,
        DropdownModule,
        DividerModule,
        ReactiveFormsModule,
        CalendarModule,
        AppFilterV2Component,
        AppAutoCompleteModule,
        YearValidatorDirective,
        FormsModule,
        AppCalendarModule,
        FormErrorModule,
        SingleDateRangeValidatorDirective,
        FocusFirstInvalidFieldModule,
        AppButtonModule,
        ChevronDownIcon,
        MilligramsPipe,
        CheckEmptyPipe,
        RedAsteriskV2Directive,
        AppViewDataComponent,
        GiroDataViewComponent,
        AppToolbarModule,
        InvoiceStatusesComponent,
        SkeletonComponent,
        MatchingDetailListComponent,
        AddSymbolPipe,

    ]
})
export class MatchingRequestModule {
}
