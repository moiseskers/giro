import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {OrganizationService} from '../../../../shared/services/organization.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-backyard-declaration-container-edit',
    templateUrl: './backyard-declaration-container-edit.component.html',
    styleUrl: './backyard-declaration-container-edit.component.scss'
})
export class BackyardDeclarationContainerEditComponent {

    public loaderId: string = UuidHelper.get();
    model: DeclarationResponseDto = this.config.data.model;

    organizationsFiltered: OrganizationResponseDto[] = [];

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderServiceV2,
        private organizationService: OrganizationService,
        private message: DefaultSystemMessagesService,
        private service: DeclarationRequestService,
        ) {
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
        const organizationId = this.model.organization.id;
        this.organizationsFiltered = (await lastValueFrom(this.organizationService.getOrganizationCigByManagerType(event, type, organizationId))).items;
    }

}
