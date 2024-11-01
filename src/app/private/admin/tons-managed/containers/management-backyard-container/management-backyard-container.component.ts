import { Component, Input } from '@angular/core';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { lastValueFrom } from 'rxjs';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { TonsManagedService } from '../../services/tons-managed.service';
import { ResponseGoalDto } from '../../../../../shared/models/response-goal.dto';
import { Page } from '../../../../../shared/objects/page';
import { BarChartEvent } from '../../../../../shared/objects/bar-chart-event';
import { NGXLogger } from 'ngx-logger';
import { DocumentRequestDto } from '../../../../../shared/models/document-request.dto';
import { DefaultSystemMessagesService } from '../../../../../shared/components/defaut-system-message-service';

@Component({
    selector: 'app-management-backyard-container',
    templateUrl: './management-backyard-container.component.html',
    styleUrl: './management-backyard-container.component.scss',
})
export class ManagementBackyardContainerComponent {
    yearlyChart: any;
    monthlyChart: any;
    displayYearlyChart: boolean = false;
    displayMonthlyChart: boolean = false;

    @Input()
    hasSelectedOrganization: boolean = false;

    @Input()
    organizationId: string;

    loaderId = UuidHelper.get();

    model: Page<ResponseGoalDto>;
    updatedAt: any;

    documentStyle = getComputedStyle(document.documentElement);

    currentYear: string;
    yearlyCurrentMonth: any;
    monthlyCurrentMonth: any;
    uploadButtonLoaderId: string = UuidHelper.get();

    monthNamesShort = [
        { label: 'Ene', value: '01' },
        { label: 'Feb', value: '02' },
        { label: 'Mar', value: '03' },
        { label: 'Abr', value: '04' },
        { label: 'May', value: '05' },
        { label: 'Jun', value: '06' },
        { label: 'Jul', value: '07' },
        { label: 'Ago', value: '08' },
        { label: 'Sep', value: '09' },
        { label: 'Oct', value: '10' },
        { label: 'Nov', value: '11' },
        { label: 'Dic', value: '12' },
    ];

    constructor(
        private service: TonsManagedService,
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private defaultSystemMessagesService: DefaultSystemMessagesService
    ) {}

    async ngOnInit() {
        await this.yearChartBuilder(new Date().getFullYear());
        this.log.info(
            'initialized with hasSelectedOrganization',
            this.hasSelectedOrganization
        );
    }

    async uploadBase64($event: DocumentRequestDto) {
        try {
            await this.loaderService.activateLoader(
                () => lastValueFrom(this.service.uploadCities($event)),
                this.uploadButtonLoaderId
            );
            this.defaultSystemMessagesService.success();
            await this.ngOnInit();
        } catch (e) {
            this.defaultSystemMessagesService.error(
                'El archivo enviado no está en el formato requerido o los datos ingresados no son válidos. Por favor, asegúrese de que el formato y los datos sean correctos y vuelva a intentarlo. Si el error persiste, contacte con el administrador.'
            );
            this.log.info(e);
        }
    }

    async yearlyYearChangeEvent($event: any) {
        await this.yearChartBuilder($event);
    }

    async monthlyYearChangeEvent($event: any) {
        await this.monthChartBuilder(this.monthlyCurrentMonth);
    }

    async yearlyBarClickedEvent($event: BarChartEvent) {
        this.yearlyCurrentMonth = this.getIndexFromMonthHelper($event.index);
        await this.monthChartBuilder(this.yearlyCurrentMonth);
    }

    getIndexFromMonthHelper(chartBarIndex: number): string {
        const label = this.yearlyChart.labels[chartBarIndex];
        return this.monthNamesShort.filter((value) => value.label === label)[0]
            ?.value;
    }

    async yearChartBuilder(year: any) {
        this.displayMonthlyChart = false;
        this.currentYear = year;

        let response;

        if (this.hasSelectedOrganization) {
            response = await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.service.organizationsReportsIndustrialDeclarationsComplianceYear(
                            this.organizationId,
                            this.currentYear
                        )
                    ),
                this.loaderId
            );
        } else {
            response = await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.service.industrialDeclarationsComplianceYear(
                            this.currentYear
                        )
                    ),
                this.loaderId
            );
        }
        this.updatedAt = response?.meta?.updatedAt;
        this.yearlyChart = this.yearlyMonthMapHelper(
            response.items,
            '--yellow-500'
        );
        this.displayYearlyChart = true;
    }

    async monthChartBuilder(month: any, queryParams?: any) {
        this.displayYearlyChart = false;
        this.monthlyCurrentMonth = month;

        let response;
        if (this.hasSelectedOrganization) {
            response = await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.service.organizationsReportsIndustrialDeclarationsComplianceYearComplianceMonth(
                            this.currentYear,
                            this.monthlyCurrentMonth,
                            queryParams
                        )
                    ),
                this.loaderId
            );
        } else {
            response = await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.service.industrialDeclarationsComplianceMonth(
                            this.currentYear,
                            month,
                            queryParams
                        )
                    ),
                this.loaderId
            );
        }
        this.updatedAt = response?.meta?.updatedAt;
        this.monthlyChart = this.monthlyMonthMapHelper(
            response.items,
            '--green-500'
        );
        this.log.info('this.monthlyChart ', this.monthlyChart);
        this.displayMonthlyChart = true;
    }

    monthlyMonthMapHelper(array: ResponseGoalDto[], color: string) {
        return {
            labels: array.map((value: any) => value.subcategory),
            datasets: [
                {
                    label: 'Toneladas comercializadas',
                    data: array.flatMap((value: any) => value.quantity),
                    backgroundColor: this.documentStyle.getPropertyValue(color),
                    borderColor: this.documentStyle.getPropertyValue(color),
                },
            ],
        };
    }

    yearlyMonthMapHelper(array: ResponseGoalDto[], color: string) {
        const complianceMonths = array.map((item) => ({
            month: item.complianceMonth,
            quantity: item.quantity,
        }));

        const m2: any = this.monthNamesShort
            .filter((month) => {
                const y = complianceMonths.some((c) => c.month === month.value);
                return y;
            })
            .map((month) => {
                const found = complianceMonths.find(
                    (c) => c.month === month.value
                );
                return {
                    label: month.label,
                    data: found.quantity,
                };
            });

        return {
            labels: m2.map((value: any) => value.label),
            datasets: [
                {
                    label: 'Toneladas comercializadas',
                    data: m2.flatMap((value: any) => value.data),
                    backgroundColor: this.documentStyle.getPropertyValue(color),
                    borderColor: this.documentStyle.getPropertyValue(color),
                },
            ],
        };
    }

    async back() {
        await this.yearChartBuilder(this.currentYear);
    }
}
