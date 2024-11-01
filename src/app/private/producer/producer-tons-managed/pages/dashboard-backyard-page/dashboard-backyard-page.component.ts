import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderServiceV2 } from '../../../../../shared/services/loader/loader.service-v2';
import { UuidHelper } from '../../../../../shared/helpers/uuid-helper';
import { lastValueFrom } from 'rxjs';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { map } from 'rxjs/operators';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { Page } from '../../../../../shared/objects/page';
import { ResponseGoalDto } from '../../../../../shared/models/response-goal.dto';
import { ProducerTonsManagedService } from '../../services/producer-tons-managed.service';
import { ProfileService } from 'src/app/shared/services/auth/profile.service';

@Component({
    selector: 'dashboard-backyard-page',
    templateUrl: './dashboard-backyard-page.component.html',
    styleUrl: './dashboard-backyard-page.component.scss',
})
export class DashboardBackyardPageComponent {
    public readonly loaderId: string = UuidHelper.get();
    industrialConsumerLoaderId: string = UuidHelper.get();
    industrialConsumerValue: any;
    organizationFiltered: any[];
    model: Page<ResponseGoalDto>;
    hasSelectedOrganization: boolean = false;
    organizationId: string;
    displayManagementBackyardContainer: boolean = true;
    selectedProducerId: string;

    constructor(
        private organizationService: OrganizationService,
        public loaderService: LoaderServiceV2,
        private service: ProducerTonsManagedService,
        private changeDetectorRef: ChangeDetectorRef,
        private profileService: ProfileService
    ) {}

    async ngOnInit() {
        this.industrialConsumerValue = this.getDefaultOption();
        this.selectedProducerId = this.profileService.getProfile().organizations[0].id;
    }

    async filter($event: AutoCompleteCompleteEvent) {
        this.organizationFiltered = await this.loaderService.activateLoader(
            () =>
                lastValueFrom(
                    this.organizationService
                        .get({
                            search: $event.query,
                            organizationTypes: 'INDUSTRIAL_CONSUMER,PRODUCER',
                            status: 'ACTIVE',
                            itemsPerPage: '100',
                        })
                        .pipe(
                            map((response) => {
                                return [
                                    this.getDefaultOption(),
                                    ...response.items,
                                ];
                            })
                        )
                ),
            this.industrialConsumerLoaderId
        );
    }

    getDefaultOption() {
        return { businessName: 'Todos consumidores industriales' };
    }

    async download() {
            await this.loaderService.activateLoader(
                () => lastValueFrom(this.service.downloadByOrganizationId(this.selectedProducerId )),
                this.loaderId
            );

    }

}
