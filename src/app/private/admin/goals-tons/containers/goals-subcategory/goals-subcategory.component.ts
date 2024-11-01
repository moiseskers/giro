import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import moment from 'moment';
import { GoalsTonsService } from '../../services/goals-tons.service';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { DefaultSystemMessagesService } from 'src/app/shared/components/defaut-system-message-service';
import { NGXLogger } from 'ngx-logger';
import { DocumentRequestDto } from 'src/app/shared/models/document-request.dto';

@Component({
    selector: 'app-goals-subcategory',
    templateUrl: './goals-subcategory.component.html',
    styleUrls: ['./goals-subcategory.component.scss'],
})
export class GoalsSubcategoryComponent implements OnInit, OnChanges {
    @Input() producerId: string | null;
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

    constructor(
        private service: GoalsTonsService,
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private defaultSystemMessagesService: DefaultSystemMessagesService
    ) {}

    async ngOnInit() {
        const currentYear = moment().year().toString();
        await this.loadChartData('DOMICILIARY', currentYear, this.domiciliaryChartLoaderId, 'domiciliary');
        await this.loadChartData('NON_DOMICILIARY', currentYear, this.noDomiciliaryChartLoaderId, 'noDomiciliary');
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['producerId'] && !changes['producerId'].firstChange) {
            const currentYear = moment().year().toString();
            await this.loadChartData('DOMICILIARY', currentYear, this.domiciliaryChartLoaderId, 'domiciliary');
            await this.loadChartData('NON_DOMICILIARY', currentYear, this.noDomiciliaryChartLoaderId, 'noDomiciliary');
        }
    }

    async yearChange(categoryId: 'DOMICILIARY' | 'NON_DOMICILIARY', year: string, chartLoaderId: string, chartType: 'domiciliary' | 'noDomiciliary') {
        await this.loadChartData(categoryId, year, chartLoaderId, chartType);
    }

    private async loadChartData(
        categoryId: 'DOMICILIARY' | 'NON_DOMICILIARY',
        year: string,
        chartLoaderId: string,
        chartType: 'domiciliary' | 'noDomiciliary'
    ) {
        let response;

        if (this.producerId) {
            response = await this.loaderService.activateLoader(
                () => lastValueFrom(
                    this.service.getReportsGoalId({
                        organizationId: this.producerId,
                        categoryId: categoryId,
                        complianceYear: year,
                        type: 'SUBCATEGORY_MATERIALS_GOALS',
                    })
                ), chartLoaderId
            );
        } else {
            response = await this.loaderService.activateLoader(
                () => lastValueFrom(
                    this.service.getReportsGoal({
                        categoryId: categoryId,
                        complianceYear: year,
                        type: 'SUBCATEGORY_MATERIALS_GOALS',
                    })
                ), chartLoaderId
            );
        }

        this.updatedAt = response.meta.updatedAt;
        const labels = response.items.map((value) => value.subcategory);
        const colors = this.getChartColors(labels);

        const chartData = {
            labels: labels,
            datasets: [{
                label: categoryId === 'DOMICILIARY' ? 'Metas domiciliarias' : 'Metas no domiciliarias',
                backgroundColor: colors,
                borderColor: colors,
                data: response.items.map((value) => Number(value.goal)),
            }]
        };

        if (chartType === 'domiciliary') {
            this.domiciliaryChart = chartData;
            this.displayDomiciliaryChartContainer = true;
        } else {
            this.noDomiciliaryChart = chartData;
            this.displayNoDomiciliaryChartContainer = true;
        }
    }

    private getChartColors(labels: string[]): string[] {
        const documentStyle = getComputedStyle(document.documentElement);
        const baseColors = {
            "Vidrio": documentStyle.getPropertyValue('--lima-500').trim(),
            "Papel y Cartón": documentStyle.getPropertyValue('--blue-500').trim(),
            "Cartón para líquidos": documentStyle.getPropertyValue('--orange-500').trim(),
            "Metal": documentStyle.getPropertyValue('--gray-500').trim(),
            "Plástico": documentStyle.getPropertyValue('--yellow-500').trim(),
        };

        return labels.map(label => baseColors[label] || documentStyle.getPropertyValue('--gray-500').trim());
    }

    async uploadBase64($event: DocumentRequestDto) {
        try {
            await this.loaderService.activateLoader(
                () => lastValueFrom(this.service.uploadReportsPartners($event, 'SUBCATEGORY_MATERIALS_GOALS')),
                this.uploadButtonLoaderId
            );
            this.defaultSystemMessagesService.success();
            await this.ngOnInit();
        } catch (e) {
            this.defaultSystemMessagesService.error('El archivo subido no contiene las columnas requeridas.');
            this.log.info(e);
        }
    }
}
