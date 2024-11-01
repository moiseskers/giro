import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { lastValueFrom } from 'rxjs';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { GoalsTonsService } from '../../services/goals-tons.service';

@Component({
    selector: 'app-management-backyard-container',
    templateUrl: './management-backyard-container.component.html',
    styleUrl: './management-backyard-container.component.scss',
})
export class managementBackyardComponent implements OnChanges {
    @Input() producerId: string | null;
    data: any[] = [];
    data1: any;
    months: string[] = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ];
    year: number = new Date().getFullYear();

    loaderId: string = UuidHelper.get();
    response;

    constructor(
        private service: GoalsTonsService,
        public loaderService: LoaderServiceV2,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit() {
        this.updateGraph();
    }

    ngOnChanges() {
        this.updateGraph();
    }

    async onYearChange(newYear: number) {
        if (newYear && newYear !== this.year) {
            this.year = newYear; // Atualiza o ano selecionado dinamicamente
            await this.updateGraph(); // Atualiza o gráfico com base no ano selecionado
        }
    }

    async updateGraph() {
        this.data = [];
        if (this.producerId) {
            await this.setGraficId();
        } else {
            await this.setGraficInit();
        }
        this.cdr.detectChanges();
    }

    async setGraficInit() {
        this.response = await this.loaderService.activateLoader(
            () =>
                lastValueFrom(
                    this.service.getIndustrialDeclarationsByYear(this.year)
                ),
            this.loaderId
        );
        this.dataValue(this.response.items);
        const documentStyle = getComputedStyle(document.documentElement);
        this.data1 = {
            labels: this.months,
            datasets: [
                {
                    label: 'Toneladas comercializadas',
                    backgroundColor:
                        documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: this.data,
                },
            ],
        };
        this.cdr.detectChanges();
    }

    async setGraficId() {
        this.response = await this.loaderService.activateLoader(
            () =>
                lastValueFrom(
                    this.service.getIndustrialDeclarationsByYearById(
                        this.year,
                        this.producerId
                    )
                ),
            this.loaderId
        );
        this.dataValue(this.response.items);
        const documentStyle = getComputedStyle(document.documentElement);
        this.data1 = {
            labels: this.months,
            datasets: [
                {
                    label: 'Toneladas comercializadas',
                    backgroundColor:
                        documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: this.data,
                },
            ],
        };
        this.cdr.detectChanges();
    }

    private dataValue(result: any[]) {
        const months = Array(12).fill(0);
        result.forEach((element) => {
            const monthIndex = parseInt(element.month, 10) - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
                months[monthIndex] = element.total;
            }
        });
        this.data = months;
    }

}
