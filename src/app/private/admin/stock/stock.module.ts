import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StockListPageComponent} from './pages/stock-list-page/stock-list-page.component';
import {AppButtonModule} from '../../../shared/components/button/button';
import {AppCardModule} from '../../../shared/components/app-card';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {InvoiceStatusesComponent} from '../invoice/components/invoice-statuses/invoice-statuses.component';
import {MenuModule} from 'primeng/menu';
import {PrimeTemplate} from 'primeng/api';
import {AppDefaultColumnSeparatorGridModule} from '../../../shared/components/app-default-column-separator-grid';
import {AppFilterModule} from '../../../shared/components/app-filter';
import {AppPaginatorModule} from '../../../shared/components/app-paginator';
import {Button, ButtonDirective} from 'primeng/button';
import {LoaderServiceModule} from '../../../shared/services/loader';
import {TableModule} from 'primeng/table';
import {StockService} from './services/stock.service';
import {Ripple} from 'primeng/ripple';
import {
    AppFilterWithLoaderComponent
} from '../../../shared/components/app-filter-with-loader/app-filter-with-loader.component';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {
    DynamicFormBuilderNgModelComponent
} from '../../../shared/components/dynamic-form-builder-ng-model/dynamic-form-builder-ng-model.component';
import {AppFilterV2Component} from '../../../shared/components/app-filter-v2/app-filter-v2.component';
import {AppAutoCompleteModule} from '../../../shared/components/autocomplete/app-auto-complete.component';
import {FormErrorModule} from '../../../shared/components/form-error';
import {FormsModule} from '@angular/forms';
import {YearValidatorDirective} from '../../../shared/directives/app-year-validator/year-validator.directive';
import {DropdownModule} from 'primeng/dropdown';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {RedAsteriskDirective} from '../../../shared/directives/red-asterisk-directive/red-asterisk.directive';
import {AppCalendarModule} from '../../../shared/components/calendar/calendar';
import {YearPickerComponent} from '../../../shared/components/year-picker/year-picker.component';
import {AddSymbolPipe} from '../../../shared/pipes/add-symbol/add-symbol.pipe';

export const routes: Routes = [
  {
    path: '',
    component: StockListPageComponent,
  },
  // {
  //   data: {
  //     breadcrumb: '-'
  //   },
  //   path: 'view/:id',
  //   component: InvoiceViewComponent,
  // },
];

@NgModule({
  declarations: [
    StockListPageComponent
  ],
  providers: [StockService],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppButtonModule,
        AppCardModule,
        AppToolbarModule,
        ChevronDownIcon,
        InvoiceStatusesComponent,
        MenuModule,
        PrimeTemplate,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        Button,
        LoaderServiceModule,
        TableModule,
        Ripple,
        AppFilterWithLoaderComponent,
        SkeletonComponent,
        DynamicFormBuilderNgModelComponent,
        AppFilterV2Component,
        ButtonDirective,
        AppAutoCompleteModule,
        FormErrorModule,
        FormsModule,
        YearValidatorDirective,
        DropdownModule,
        MilligramsPipe,
        RedAsteriskDirective,
        AppCalendarModule,
        YearPickerComponent,
        AddSymbolPipe,
    ]
})
export class StockModule { }
