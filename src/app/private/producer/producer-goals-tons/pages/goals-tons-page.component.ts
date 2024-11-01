import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UuidHelper } from 'src/app/shared/helpers/uuid-helper';
import { LoaderServiceV2 } from 'src/app/shared/services/loader/loader.service-v2';
import { OrganizationResponseDto } from 'src/app/shared/models/organization-response.dto';
import { FormGroup } from '@angular/forms';
import { FieldV2 } from 'src/app/shared/components/dynamic-form-builder-ng-model/models/fieldV2';
import { ProduderGoalsTonsService } from '../services/producer-goals-tons.service';
import { ProfileService } from 'src/app/shared/services/auth/profile.service';

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
    selectedProducerId: string;

    form: FormGroup<any>;

    constructor(
        public loaderService: LoaderServiceV2,
        private goalsTonsService: ProduderGoalsTonsService,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.selectedProducerId = this.profileService.getProfile().organizations[0].id;
    }

    async download() {
        await this.loaderService.activateLoader(
            () => lastValueFrom(this.goalsTonsService.download()),
            this.loaderId
        );
    }
}
