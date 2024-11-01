import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {PartnersContainerComponent} from './containers/partners-container/partners-container.component';
import {
    OperationsInTerritoryContainerComponent
} from './containers/operations-in-territory-container/operations-in-territory-container.component';
import {
    GoalAchievementStatusContainerComponent
} from './containers/goal-achievement-status-container/goal-achievement-status-container.component';
import {GiroDataViewV2Component} from '../../../shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {
    OperationsInTerritoryMapComponent
} from '../../shared/components/operations-in-territory-map/operations-in-territory-map.component';
import {DashboardService} from './services/dashboard.service';
import {Button, ButtonDirective} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {AppButtonModule} from '../../../shared/components/button/button';
import {Ripple} from 'primeng/ripple';
import {
    DateAndActionButtonComponent
} from '../../shared/components/date-and-action-button/date-and-action-button.component';
import {SkeletonComponent} from '../../../shared/components/skeleton/skeleton.component';
import {
    OperationsInTerritoryListComponent
} from '../../shared/components/operations-in-territory-list/operations-in-territory-list.component';
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

export const routes: Routes = [
    {
        path: '',
        component: DashboardPageComponent,
    },
];

@NgModule({
    declarations: [
        OperationsInTerritoryContainerComponent,
        DashboardPageComponent,
        PartnersContainerComponent,
        OperationsInTerritoryContainerComponent,
        GoalAchievementStatusContainerComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        GiroDataViewV2Component,
        OperationsInTerritoryMapComponent,
        Button,
        ToolbarModule,
        AppButtonModule,
        ButtonDirective,
        Ripple,
        SkeletonComponent,
        DateAndActionButtonComponent,
        OperationsInTerritoryListComponent,
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
        AppPaginatorModule
    ],
    exports: [
        PartnersContainerComponent,
        OperationsInTerritoryContainerComponent,
        GoalAchievementStatusContainerComponent
    ],
    providers: [DashboardService]
})
export class DashboardModule {
}
