import {Component} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {lastValueFrom} from 'rxjs';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import moment from 'moment';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';
import { DefaultSystemMessagesService } from 'src/app/shared/components/defaut-system-message-service';

@Component({
    selector: 'app-goal-achievement-status-container',
    templateUrl: './goal-achievement-status-container.component.html',
    styleUrl: './goal-achievement-status-container.component.scss'
})
export class GoalAchievementStatusContainerComponent {

    domiciliaryChart: any;
    noDomiciliaryChart: any;
    updatedAt: any;
    uploadButtonLoaderId: string = UuidHelper.get();

    domiciliaryChartMessage = 'Este gráfico representa las metas domiciliarias anuales de GIRO versus la cantidad total de materialidades recolectadas para su cumplimiento en toneladas.';
    noDomiciliaryChartMessage = 'Este gráfico representa las metas no domiciliarias anuales de GIRO versus la cantidad total de toneladas trazadas para su cumplimiento en toneladas.';

    domiciliaryChartLoaderId = UuidHelper.get();
    noDomiciliaryChartLoaderId = UuidHelper.get();

    documentStyle = getComputedStyle(document.documentElement);
    displayDomiciliaryChartContainer: boolean = false;
    displayNoDomiciliaryChartContainer: boolean = false;

    constructor(private service: DashboardService,
        public loaderService: LoaderServiceV2,
        private defaultSystemMessagesService: DefaultSystemMessagesService) {
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
        })), this.noDomiciliaryChartLoaderId));
        this.updatedAt = response.meta.updatedAt;
        this.noDomiciliaryChart = {
            labels: response.items.map(value => value.subcategory),
            datasets: [
                {
                    label: 'Metas no domiciliarias',
                    backgroundColor: this.documentStyle.getPropertyValue('--lima-500'),
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    data: response.items.map(value => value.goal),
                },
                {
                    label: 'Total no domiciliario puesto en el mercado',
                    backgroundColor: this.documentStyle.getPropertyValue('--lima-700'),
                    borderColor: this.documentStyle.getPropertyValue('--pink-500'),
                    data: response.items.map(value => value.total),
                }
            ]
        };

        this.displayNoDomiciliaryChartContainer = true;
    }

    async uploadBase64($event: DocumentRequestDto) {
        try {
            await this.loaderService.activateLoader(() => lastValueFrom(
                this.service.uploadReportsGoals($event)),
                this.uploadButtonLoaderId);
            this.defaultSystemMessagesService.success();
            await this.ngOnInit();
        } catch (e) {
            this.defaultSystemMessagesService.error('El archivo subido no contiene las columnas requeridas. Por favor, asegúrese de que todas las columnas necesarias estén presentes y vuelva a intentarlo. Si el error persiste, contacte al administrador.');
        }
    }


}
