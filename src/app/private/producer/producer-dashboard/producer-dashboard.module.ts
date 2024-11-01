import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProducerDashboardPageComponent} from './pages/dashboard-page/producer-dashboard-page.component';
import {
    ProducerPartnersContainerComponent
} from './containers/producer-partners-container/producer-partners-container.component';
import {
    ProducerOperationsInTerritoryContainerComponent
} from './containers/operations-in-territory-container/producer-operations-in-territory-container.component';
import {
    ProducerGoalAchievementStatusContainerComponent
} from './containers/producer-goal-achievement-status-container/producer-goal-achievement-status-container.component';
import {GiroDataViewV2Component} from '../../../shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {DashboardService} from '../../shared/services/dashboard.service';
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
import {BarChartComponent} from '../../../shared/bar-chart/bar-chart.component';
import {AppPaginatorModule} from '../../../shared/components/app-paginator';
import {
    DateAndActionButtonComponent
} from '../../shared/components/date-and-action-button/date-and-action-button.component';
import {
    OperationsInTerritoryMapComponent
} from '../../shared/components/operations-in-territory-map/operations-in-territory-map.component';
import {
    OperationsInTerritoryListComponent
} from '../../shared/components/operations-in-territory-list/operations-in-territory-list.component';
import {DashboardModule} from '../../admin/dashboard/dashboard.module';

export const routes: Routes = [
    {
        path: '',
        component: ProducerDashboardPageComponent,
    },
];

@NgModule({
    declarations: [
        ProducerOperationsInTerritoryContainerComponent,
        ProducerDashboardPageComponent,
        ProducerPartnersContainerComponent,
        ProducerOperationsInTerritoryContainerComponent,
        ProducerGoalAchievementStatusContainerComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        GiroDataViewV2Component,
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
        YearPickerComponent,
        BarChartComponent,
        AppPaginatorModule,
        DateAndActionButtonComponent,
        OperationsInTerritoryMapComponent,
        OperationsInTerritoryListComponent,
        DashboardModule
    ],
    providers: [DashboardService]
})
export class ProducerDashboardModule {
}
