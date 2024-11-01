import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderServiceV2 } from '../../../../../shared/services/loader/loader.service-v2';
import { UuidHelper } from '../../../../../shared/helpers/uuid-helper';
import { lastValueFrom } from 'rxjs';
import { TonsManagedService } from '../../services/tons-managed.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { map } from 'rxjs/operators';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { Page } from '../../../../../shared/objects/page';
import { NGXLogger } from 'ngx-logger';
import { ResponseGoalDto } from '../../../../../shared/models/response-goal.dto';
import { DefaultSystemMessagesService } from '../../../../../shared/components/defaut-system-message-service';

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

    constructor(
        private organizationService: OrganizationService,
        public loaderService: LoaderServiceV2,
        private service: TonsManagedService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    async ngOnInit() {
        this.industrialConsumerValue = this.getDefaultOption();
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
        if (!this.hasSelectedOrganization) {
            await this.loaderService.activateLoader(
                () => lastValueFrom(this.service.download()),
                this.loaderId
            );
        } else {
            await this.loaderService.activateLoader(
                () =>
                    lastValueFrom(
                        this.service.downloadByOrganizationId(
                            this.organizationId
                        )
                    ),
                this.loaderId
            );
        }
    }

    industrialConsumerNgModelChange($event: any) {
        if ($event?.id) {
            this.displayManagementBackyardContainer = false;
            this.hasSelectedOrganization = true;
            this.organizationId = $event?.id;
            setTimeout(() => {
                this.displayManagementBackyardContainer = true;
                this.changeDetectorRef.detectChanges();
            }, 500);
        } else {
            this.hasSelectedOrganization = false;
        }
    }
}
