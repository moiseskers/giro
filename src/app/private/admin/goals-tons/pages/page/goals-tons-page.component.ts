import { Component } from '@angular/core';
import { GoalsTonsService } from '../../services/goals-tons.service';
import { lastValueFrom } from 'rxjs';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { OrganizationResponseDto } from 'src/app/shared/models/organization-response.dto';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FieldV2 } from 'src/app/shared/components/dynamic-form-builder-ng-model/models/fieldV2';
import { ProducerService } from '../../services/producer.service';

@Component({
    selector: 'app-goals-tons-page',
    templateUrl: './goals-tons-page.component.html',
    styleUrl: './goals-tons-page.component.scss',
})
export class GoalsTonsPageComponent {
    public readonly loaderId: string = UuidHelper.get();

    fields: FieldV2[] = [
        {
            base: true,
            placeholder: 'Buscar por ID de matching',
            name: 'search',
        },
        {
            name: 'producer',
        },
    ];

    producerFiltered: OrganizationResponseDto[] = [];
    producerLoaderId: string = UuidHelper.get();
    selectedProducerId: string | null = null;

    form: FormGroup<any>;

    constructor(
        public loaderService: LoaderServiceV2,
        private goalsTonsService: GoalsTonsService,
        private producerService: ProducerService
    ) {}

    async download() {
        await this.loaderService.activateLoader(
            () => lastValueFrom(this.goalsTonsService.download()),
            this.loaderId
        );
    }

    async filterProducers($event: AutoCompleteCompleteEvent) {
        try {
            const response = await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.goalsTonsService.getProducers($event.query)
                    ),
                this.producerLoaderId
            );

            this.producerFiltered = response?.items.map(
                (item: OrganizationResponseDto) => ({
                    ...item,
                    businessName: `${item.businessName} | ${item.taxIdentificationNumber}`,
                })
            );
        } catch (error) {
            console.error('Erro ao filtrar produtores:', error);
            this.producerFiltered = [];
        }
    }

    resetSubcategoriesValues() {
        const field = this.fields.find((field) => field.name === 'producer');
        if (field) {
            field.value = '';
        }
    }

    async ngModelChange(field: FieldV2) {
        if (field.name === 'producer') {
            this.selectedProducerId = field.value;
            this.producerService.updateSelectedProducerId(
                this.selectedProducerId
            );
        }
    }
}
