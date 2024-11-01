import {Component} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {NGXLogger} from "ngx-logger";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {ConfirmationService} from "primeng/api";
import {lastValueFrom} from "rxjs";
import {CreateDeclarationRequestRequestDto} from "../../../../../shared/models/create-declaration-request-request.dto";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {OrganizationTypeType} from '../../../../../shared/types/organization-type.type';

@Component({
    selector: 'app-backyard-declaration-request-edit-container',
    templateUrl: './backyard-declaration-request-edit-container.component.html',
    styleUrl: './backyard-declaration-request-edit-container.component.scss'
})
export class BackyardDeclarationRequestEditContainerComponent {

    public readonly saveLoaderId: string = UuidHelper.get();
    public readonly verifyRemovedProducersLoaderId: string = UuidHelper.get();

    model: DeclarationRequestResponseDto = this.config.data.model;

    id: string;
    stateHolder: any[];
    dialogMessage = 'Los seguintes consumidores industriales ya enviaron su declaración de masa. Una vez que exclua este consumidor industrial, entonces la declaración de masa enviada también será excluída. Desea seguir?';
    header =        'Atención';

    readonly organizationType: OrganizationTypeType = 'INDUSTRIAL_CONSUMER';

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

        const removed = await this.checkIfYouRemovedAProducer($event);

        if (removed) {
            await this.confirmationDialog();
        }

        this.log.info(`save(${$event}: BackyardCreateDeclarationRequestRequestDto)`);

        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update($event, this.model.id)), this.saveLoaderId);
        this.message.success();
        this.ref.close(true);
    }

    async checkIfYouRemovedAProducer(input: CreateDeclarationRequestRequestDto) {
        try {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.verifyRemovedProducers(this.id, input)), this.verifyRemovedProducersLoaderId);
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
