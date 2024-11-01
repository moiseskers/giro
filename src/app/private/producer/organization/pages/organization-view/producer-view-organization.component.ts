import {Component} from '@angular/core';
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {lastValueFrom} from "rxjs";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {ActivatedRoute} from "@angular/router";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";

@Component({
    selector: 'app-producer-view-organization',
    templateUrl: './producer-view-organization.component.html',
    styleUrl: './producer-view-organization.component.scss'
})
export class ProducerViewOrganizationComponent {

    model: OrganizationResponseDto;
    id: string = this.activatedRoute.snapshot.params['id'];
    organizationDataLoaderId = UuidHelper.get();

    constructor(
        private service: OrganizationService,
        public  loaderService: LoaderService,
        private activatedRoute: ActivatedRoute,
       ) {
    }

    async ngOnInit() {
        // get organization-data
        this.model = await this.loaderService.activateLoader<OrganizationResponseDto>(() => lastValueFrom(this.service.getById(this.id)), this.organizationDataLoaderId);
        // this.loadedOrganizationEvent(this.model)
        // this.updateBreadcrumbByUrl();
    }


    protected readonly organizationTypes = OrganizationTypeEnum;
}
