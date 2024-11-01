import {Component} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {NGXLogger} from "ngx-logger";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {CreateDeclarationRequestRequestDto} from "../../../../../shared/models/create-declaration-request-request.dto";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {ConfirmationService} from "primeng/api";
import {OrganizationTypeType} from '../../../../../shared/types/organization-type.type';

@Component({
    selector: 'app-declaration-statement-edit-container',
    templateUrl: './declaration-request-edit-container.component.html',
    styleUrl: './declaration-request-edit-container.component.scss'
})
export class DeclarationRequestEditContainerComponent {

    public readonly organizationsSearchLoaderId: string = UuidHelper.get();
    public readonly saveLoaderId: string = UuidHelper.get();
    public readonly verifyRemovedProducersLoaderId: string = UuidHelper.get();

    model: DeclarationRequestResponseDto = this.config.data.model;
    id: string;
    stateHolder: any[];

    dialogMessage = 'Los seguintes productores ya enviaron su declaración de masa. Una vez que exclua este productor, entonces la declaración de masa enviada también será excluída. Desea seguir?'
    header = 'Atención'

    organizationType: OrganizationTypeType = 'PRODUCER';

    constructor(
        public config: DynamicDialogConfig,
        private log: NGXLogger,
        private service: DeclarationRequestService,
        private message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public ref: DynamicDialogRef,
        private confirmationService: ConfirmationService
    ) {
    }

    async ngOnInit() {
        this.id = this.model.id;
        this.stateHolder = this.model.organizations;
    }

    async save($event: CreateDeclarationRequestRequestDto) {
        this.log.info(`save(${$event}: CreateStatementRequestDto)`);

        const removed = await this.checkIfYouRemovedAProducer($event);

        if (removed) {
            await this.confirmationDialog();
        }

        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update($event, this.model.id)), this.saveLoaderId);
        this.message.success();
        this.ref.close(true);
    }

    async checkIfYouRemovedAProducer($event: CreateDeclarationRequestRequestDto) {
        try {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.verifyRemovedProducers(this.id, $event)), this.verifyRemovedProducersLoaderId);
        } catch (e) {
            return true;
        }
        return false;
    }

    confirmationDialog(): Promise<void> {
        return new Promise((resolve) => {
            this.confirmationService.confirm({
                message: this.dialogMessage,
                header: this.header,
                acceptLabel: 'Sí',
                rejectLabel: 'No',
                icon: 'pi pi-info-circle',
                accept: () => {
                    resolve();
                },
            });
        });
    }
}
