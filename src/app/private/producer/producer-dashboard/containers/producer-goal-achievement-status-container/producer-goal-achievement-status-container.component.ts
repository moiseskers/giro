import {Component} from '@angular/core';
import {DashboardService} from '../../../../shared/services/dashboard.service';
import {lastValueFrom} from 'rxjs';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import moment from 'moment';

@Component({
    selector: 'app-producer-goal-achievement-status-container',
    templateUrl: './producer-goal-achievement-status-container.component.html',
    styleUrl: './producer-goal-achievement-status-container.component.scss'
})
export class ProducerGoalAchievementStatusContainerComponent {

    domiciliaryChart: any;
    noDomiciliaryChart: any;

    domiciliaryChartMessage = 'Este gráfico representa las metas domiciliarias anuales de GIRO versus la cantidad total de materialidades recolectadas para su cumplimiento en toneladas.';
    noDomiciliaryChartMessage = 'Este gráfico representa las metas no domiciliarias anuales de GIRO versus la cantidad total de toneladas trazadas para su cumplimiento en toneladas.';

    domiciliaryChartLoaderId = UuidHelper.get();
    noDomiciliaryChartLoaderId = UuidHelper.get();

    documentStyle = getComputedStyle(document.documentElement);
    displayDomiciliaryChartContainer: boolean = false;
    displayNoDomiciliaryChartContainer: boolean = false;

    constructor(private service: DashboardService, public loaderService: LoaderServiceV2) {
    }

    async ngOnInit() {
        await this.buildDomiciliaryChart(moment().year().toString())
        await this.buildNoDomiciliaryChart(moment().year().toString());
    }

    async noDomiciliaryChartYearChange($event: any) {
        await this.buildNoDomiciliaryChart($event);
    }

    async domiciliaryChartYearChange($event: any) {
        await this.buildDomiciliaryChart($event);
    }

    private async buildDomiciliaryChart(year: string) {
        const response = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.getReportsGoal({
            categoryId: 'DOMICILIARY',
            complianceYear: year
        })), this.domiciliaryChartLoaderId)).items;

        this.domiciliaryChart = {
            labels: response.map(value => value.subcategory),
            datasets: [
                {
                    label: 'Metas domiciliarias',
                    backgroundColor: this.documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    data: response.map(value => value.goal),
                },
                {
                    label: 'Toneladas domiciliarias recolectadas',
                    backgroundColor: this.documentStyle.getPropertyValue('--yellow-700'),
                    borderColor: this.documentStyle.getPropertyValue('--pink-500'),
                    data: response.map(value => value.total)
                }
            ]
        };

        this.displayDomiciliaryChartContainer = true;
    }

    private async buildNoDomiciliaryChart(year: string) {
        const response = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.getReportsGoal({
            categoryId: 'NON_DOMICILIARY',
            complianceYear: year
        })), this.noDomiciliaryChartLoaderId)).items;

        this.noDomiciliaryChart = {
            labels: response.map(value => value.subcategory),
            datasets: [
                {
                    label: 'Metas no domiciliaria',
                    backgroundColor: this.documentStyle.getPropertyValue('--lima-500'),
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    data: response.map(value => value.goal),
                },
                {
                    label: 'Total no domiciliario puesto en el mercado',
                    backgroundColor: this.documentStyle.getPropertyValue('--lima-700'),
                    borderColor: this.documentStyle.getPropertyValue('--pink-500'),
                    data: response.map(value => value.total),
                }
            ]
        };

        this.displayNoDomiciliaryChartContainer = true;
    }


}
