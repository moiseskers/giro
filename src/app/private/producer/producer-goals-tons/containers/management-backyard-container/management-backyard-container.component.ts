import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { lastValueFrom } from 'rxjs';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { ProduderGoalsTonsService } from '../../services/producer-goals-tons.service';

@Component({
    selector: 'app-management-backyard-container',
    templateUrl: './management-backyard-container.component.html',
    styleUrl: './management-backyard-container.component.scss',
})
export class ManagementBackyardContainerComponent {
    @Input() producerId: string | null;
    data: any[] = [];
    data1: any;
    months: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    year: number = new Date().getFullYear();

    loaderId: string = UuidHelper.get();
    response;

    constructor(
        private service: ProduderGoalsTonsService,
        public loaderService: LoaderServiceV2,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit() {

        await this.updateGraph();
        this.cdr.detectChanges();
    }

    async onYearChange(newYear: number) {
        if (newYear && newYear !== this.year) {
            this.year = newYear;
            await this.updateGraph();
        }
    }

    async updateGraph() {
        this.data = [];
        await this.setGraficId();
        this.cdr.detectChanges();
    }

    async setGraficId() {
        // Inicializar um array com 12 posições para todos os meses, preenchido com 0
        const allMonthsData = new Array(12).fill(0);

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

        // Verificar se há dados retornados
        if (this.response && this.response.items && this.response.items.length) {
            // Processar os itens retornados e preencher o array 'allMonthsData'
            this.response.items.forEach(item => {
                const monthIndex = parseInt(item.month, 10) - 1; // Convertendo o mês (1-12) para o índice do array (0-11)
                if (monthIndex >= 0 && monthIndex < 12) {
                    allMonthsData[monthIndex] = item.total; // Preenchendo o valor no mês correto
                }
            });
        }

        const documentStyle = getComputedStyle(document.documentElement);
        this.data1 = {
            labels: this.months,
            datasets: [
                {
                    label: 'Toneladas comercializadas',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: allMonthsData,
                },
            ],
        };

        this.cdr.detectChanges();
    }

}
