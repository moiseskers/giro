import {Component} from '@angular/core';
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {lastValueFrom} from "rxjs";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {DialogService} from "primeng/dynamicdialog";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";

@Component({
    selector: 'app-industrial-consumer-organization',
    templateUrl: './industrial-consumer-view-organization.component.html',
    styleUrl: './industrial-consumer-view-organization.component.scss'
})
export class IndustrialConsumerViewOrganizationComponent {

    model: OrganizationResponseDto;
    id: string = this.activatedRoute.snapshot.params['id'];
    organizationDataLoaderId = UuidHelper.get();

    constructor(
        private service: OrganizationService,
        public  loaderService: LoaderService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private message: DefaultSystemMessagesService) {
    }

    async ngOnInit() {
        // get organization-data
        this.model = await this.loaderService.activateLoader<OrganizationResponseDto>(() => lastValueFrom(this.service.getById(this.id)), this.organizationDataLoaderId);
        // this.loadedOrganizationEvent(this.model)
        // this.updateBreadcrumbByUrl();
    }

    protected readonly organizationTypes = OrganizationTypeEnum;
}
