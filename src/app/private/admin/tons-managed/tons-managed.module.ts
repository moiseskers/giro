import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GiroDataViewV2Component} from '../../../shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {Button, ButtonDirective} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {AppButtonModule} from '../../../shared/components/button/button';
import {Ripple} from 'primeng/ripple';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {AppCardModule} from '../../../shared/components/app-card';
import {AddSymbolPipe} from '../../../shared/pipes/add-symbol/add-symbol.pipe';
import {MilligramsPipe} from '../../../shared/pipes/milligrams/milligrams.pipe';
import {AppDefaultColumnSeparatorGridModule} from '../../../shared/components/app-default-column-separator-grid';
import {CardModule} from 'primeng/card';
import {AppCounterCardComponent} from '../../../shared/components/app-counter-card/app-counter-card.component';
import {AppToolbarModule} from '../../../shared/components/toolbar/toolbar';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {MenuModule} from 'primeng/menu';
import {TagModule} from 'primeng/tag';
import {ChartModule} from 'primeng/chart';
import {AppCalendarModule} from '../../../shared/components/calendar/calendar';
import {YearPickerComponent} from '../../../shared/components/year-picker/year-picker.component';
import {
    ManagementBackyardContainerComponent
} from './containers/management-backyard-container/management-backyard-container.component';
import {DashboardBackyardPageComponent} from './pages/dashboard-backyard-page/dashboard-backyard-page.component';
import {TonsManagedService} from './services/tons-managed.service';
import {BarChartComponent} from 'src/app/shared/bar-chart/bar-chart.component';
import {AppFilterModule} from "../../../shared/components/app-filter";
import {AppDynamicFormBuilderModule} from 'src/app/shared/components/app-dynamic-form-builder';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppAutoCompleteModule} from '../../../shared/components/autocomplete/app-auto-complete.component';
import {
    DateAndActionButtonComponent
} from '../../shared/components/date-and-action-button/date-and-action-button.component';


export const routes: Routes = [
    {
        path: '',
        component: DashboardBackyardPageComponent,
    }
];

@NgModule({
    declarations: [
        ManagementBackyardContainerComponent,
        DashboardBackyardPageComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        Button,
        ToolbarModule,
        AppButtonModule,
        ButtonDirective,
        Ripple,
        SkeletonComponent,
        AppCardModule,
        AddSymbolPipe,
        MilligramsPipe,
        AppDefaultColumnSeparatorGridModule,
        CardModule,
        AppCounterCardComponent,
        AppToolbarModule,
        ChevronDownIcon,
        MenuModule,
        TagModule,
        ChartModule,
        AppCalendarModule,
        DropdownModule,
        YearPickerComponent,
        AppFilterModule,
        AppDynamicFormBuilderModule,
        BarChartComponent,
        GiroDataViewV2Component,
        ReactiveFormsModule,
        AppAutoCompleteModule,
        FormsModule,
        DateAndActionButtonComponent
    ],
    providers: [TonsManagedService]
})
export class TonsManagedModule {
}
