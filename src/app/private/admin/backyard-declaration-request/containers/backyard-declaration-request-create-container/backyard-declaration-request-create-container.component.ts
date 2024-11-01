import {Component, Inject} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {NGXLogger} from "ngx-logger";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {CreateDeclarationRequestRequestDto} from "../../../../../shared/models/create-declaration-request-request.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {DECLARATION_TYPE} from "../../backyard-declaration-request.module";
import {OrganizationTypeType} from '../../../../../shared/types/organization-type.type';

@Component({
    selector: 'app-backyard-declaration-request-create-container',
    templateUrl: './backyard-declaration-request-create-container.component.html',
    styleUrl: './backyard-declaration-request-create-container.component.scss'
})
export class BackyardDeclarationRequestCreateContainerComponent {

    public readonly saveLoaderId: string = UuidHelper.get();
    organizationType: OrganizationTypeType = 'INDUSTRIAL_CONSUMER';

    constructor(
        @Inject(DECLARATION_TYPE) private type: string,
        private log: NGXLogger,
        private service: DeclarationRequestService,
        private message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public ref: DynamicDialogRef) {
    }

    async save($event: CreateDeclarationRequestRequestDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(this.type, $event)), this.saveLoaderId);
        this.message.success();
        this.ref.close(true);
    }
}
