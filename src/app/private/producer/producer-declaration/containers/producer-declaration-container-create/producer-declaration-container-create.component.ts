import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationTableFormType} from "../../../../../shared/enums/declaration-table-form-type";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationTableFormOptions} from "../../../../../shared/objects/declaration-table-form-options";
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';
import {ProfileService} from '../../../../../shared/services/auth/profile.service';

@Component({
    selector: 'app-producer-declaration-container-create',
    templateUrl: './producer-declaration-container-create.component.html',
    styleUrl: './producer-declaration-container-create.component.scss'
})
export class ProducerDeclarationContainerCreateComponent {

    public loaderId: string = UuidHelper.get();

    model: DeclarationResponseDto;

    public declarationTableFormType: DeclarationTableFormType;
    loaded: boolean = false;

    materials: DeclarationTableFormOptions[];
    organization: OrganizationResponseDto = this.config.data.organization;

    organizationId: string;

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderService,
        private message: DefaultSystemMessagesService,
        private service: DeclarationService,
        private profileService: ProfileService,
        ) {
    }

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = this.config.data.model;
        this.loaded = false;
        this.declarationTableFormType = this.getDeclarationTableFormType();

        if ( DeclarationTableFormType.ANNUALLY !== this.declarationTableFormType ) {
            this.model.declarationType = GeneralHelper.getKeyByValue(DeclarationType, DeclarationType.CONSOLIDATED)
        }

        this.loaded = true
    }

    getDeclarationTableFormType(): DeclarationTableFormType {
        const declarationRequestType = DeclarationRequestRecurrence[this.model?.declarationRequest?.recurrence];

        if (DeclarationRequestRecurrence.ANNUAL === declarationRequestType) {
            return DeclarationTableFormType.ANNUALLY;
        }

        return DeclarationTableFormType.MONTHLY_CONSOLIDATED;

    }

    async save($event: any) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId, this.model.id, $event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }
}
