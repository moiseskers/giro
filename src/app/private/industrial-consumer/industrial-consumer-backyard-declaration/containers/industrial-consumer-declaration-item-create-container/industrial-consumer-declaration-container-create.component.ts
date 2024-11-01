import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {DeclarationTableFormOptions} from "../../../../../shared/objects/declaration-table-form-options";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {OrganizationService} from '../../../../shared/services/organization.service';
import {ProfileService} from '../../../../../shared/services/auth/profile.service';

@Component({
    selector: 'app-industrial-consumer-declaration-container-create',
    templateUrl: './industrial-consumer-declaration-container-create.component.html',
    styleUrl: './industrial-consumer-declaration-container-create.component.scss'
})
export class IndustrialConsumerDeclarationContainerCreateComponent {

    public loaderId: string = UuidHelper.get();

    model: DeclarationResponseDto = this.config.data.model;

    loaded: boolean = false;

    materials: DeclarationTableFormOptions[];
    organizationsFiltered: OrganizationResponseDto[] = [];
    organizationId: string;

    constructor(
        private profileService: ProfileService,
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderService,
        private message: DefaultSystemMessagesService,
        private organizationService: OrganizationService,
        private service: DeclarationService) {
    }

    ngOnInit(): void {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
    }

    async save($event: any) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId, this.model.id, $event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }

    async filterAutocompleteEvent($event: any) {
        const type = $event.type;
        const event = $event.event;
        this.organizationsFiltered = (await lastValueFrom(this.organizationService.getOrganizationCigByManagerType(event, type, this.getOrganizationId()))).items;
    }

    getOrganizationId() {
        return this.profileService.getProfile().organizations[0].id
    }

}
