import {Component} from '@angular/core';
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationTableFormType} from "../../../../../shared/enums/declaration-table-form-type";
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';

@Component({
    selector: 'app-declaration-container-create',
    templateUrl: './declaration-container-create.component.html',
    styleUrl: './declaration-container-create.component.scss'
})
export class DeclarationContainerCreateComponent {

    public loaderId: string = UuidHelper.get();
    model: DeclarationResponseDto = this.config.data.model;
    public declarationTableFormType: DeclarationTableFormType;
    loaded: boolean = false;
    organization: OrganizationResponseDto = this.config.data.organization;

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderService,
        private message: DefaultSystemMessagesService,
        private service: DeclarationRequestService) {
    }

    async ngOnInit() {
        this.declarationTableFormType = this.getDeclarationTableFormType();
    }

    getDeclarationTableFormType(): DeclarationTableFormType {
        const declarationRequestType = DeclarationRequestRecurrence[this.model.declarationRequest.recurrence];
        const declarationType = DeclarationType[this.model.declarationType];

        if (DeclarationRequestRecurrence.ANNUAL === declarationRequestType) {
            return DeclarationTableFormType.ANNUALLY;
        }

        if (DeclarationType.CONSOLIDATED === declarationType) {
            return DeclarationTableFormType.MONTHLY_CONSOLIDATED;
        }

        if (DeclarationType.DETAILED === declarationType) {
            return DeclarationTableFormType.MONTHLY_DETAILED;
        }
        this.log.info('Unable to match DeclarationTableFormType! declarationRequestType, declarationType', this?.model?.declarationRequest?.recurrence, this?.model?.declarationType)
        return null;
    }

    async save($event: any) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationsUpdate($event, this.model.declarationRequest.id, this.model.id)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }
}
