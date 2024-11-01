import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GoalsTonsService} from './services/goals-tons.service';
import {Button, ButtonDirective} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {Ripple} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {MenuModule} from 'primeng/menu';
import {TagModule} from 'primeng/tag';
import {ChartModule} from 'primeng/chart';
import {AppPaginatorModule} from 'src/app/shared/components/app-paginator';
import {GiroDataViewV2Component} from 'src/app/shared/components/giro-menu-barv2/giro-data-view-v2.component';
import {
    OperationsInTerritoryMapComponent
} from 'src/app/private/shared/components/operations-in-territory-map/operations-in-territory-map.component';
import {AppButtonModule} from 'src/app/shared/components/button/button';
import {SkeletonComponent} from 'src/app/shared/components/skeleton/skeleton.component';
import {
    DateAndActionButtonComponent
} from 'src/app/private/shared/components/date-and-action-button/date-and-action-button.component';
import {
    OperationsInTerritoryListComponent
} from 'src/app/private/shared/components/operations-in-territory-list/operations-in-territory-list.component';
import {AppCardModule} from 'src/app/shared/components/app-card';
import {AddSymbolPipe} from 'src/app/shared/pipes/add-symbol/add-symbol.pipe';
import {MilligramsPipe} from 'src/app/shared/pipes/milligrams/milligrams.pipe';
import {AppDefaultColumnSeparatorGridModule} from 'src/app/shared/components/app-default-column-separator-grid';
import {AppCounterCardComponent} from 'src/app/shared/components/app-counter-card/app-counter-card.component';
import {AppToolbarModule} from 'src/app/shared/components/toolbar/toolbar';
import {AppCalendarModule} from 'src/app/shared/components/calendar/calendar';
import {YearPickerComponent} from 'src/app/shared/components/year-picker/year-picker.component';
import {BarChartComponent} from 'src/app/shared/bar-chart/bar-chart.component';
import {
    GoalAchievementStatusContainerComponent
} from './containers/goal-achievement-status-container/goal-achievement-status-container.component';
import {
    managementBackyardComponent
} from './containers/management-backyard-container/management-backyard-container.component';
import {AppAutoCompleteModule} from 'src/app/shared/components/autocomplete/app-auto-complete.component';
import {FormsModule} from '@angular/forms';
import {GoalsSubcategoryComponent} from './containers/goals-subcategory/goals-subcategory.component';
import {GoalsTonsPageComponent} from './pages/page/goals-tons-page.component';
import {DoughnutChartComponent} from '../../../shared/doughnut-chart/doughnut-chart.component';

export const routes: Routes = [
    {
        path: '',
        component: GoalsTonsPageComponent,
    },
];

@NgModule({
    declarations: [
        GoalsTonsPageComponent,
        GoalAchievementStatusContainerComponent,
        managementBackyardComponent,
        GoalsSubcategoryComponent,
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
        FormsModule,
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
        GiroDataViewV2Component,
        AppAutoCompleteModule,
        DoughnutChartComponent,
    ],
    exports: [GoalAchievementStatusContainerComponent],
    providers: [GoalsTonsService],
})
export class GoalsTonsModule {}
