import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {OrganizationService} from '../../../../shared/services/organization.service';

@Component({
    selector: 'app-backyard-declaration-container-create',
    templateUrl: './backyard-declaration-container-create.component.html',
    styleUrl: './backyard-declaration-container-create.component.scss'
})
export class BackyardDeclarationContainerCreateComponent {

    public loaderId: string = UuidHelper.get();
    model: DeclarationResponseDto = this.config.data.model;
    loaded: boolean = false;
    organizationsFiltered: OrganizationResponseDto[] = [];

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderService,
        private message: DefaultSystemMessagesService,
        private organizationService: OrganizationService,
        private service: DeclarationRequestService) {
    }

    ngOnInit(): void {
        this.log.info('initialized with model ', JSON.stringify(this.model));
    }

    async save($event: any) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationsUpdate($event, this.model.declarationRequest.id, this.model.id)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }

    async filterAutocompleteEvent($event: any) {
        const type = $event.type;
        const event = $event.event;
        this.organizationsFiltered = (await lastValueFrom(this.organizationService.getOrganizationCigByManagerType(event, type, this.model.organization.id))).items;
    }

}
