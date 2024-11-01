import {Component} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationTableFormType} from "../../../../../shared/enums/declaration-table-form-type";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {NGXLogger} from "ngx-logger";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {lastValueFrom} from "rxjs";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {
    WarningDialogComponent
} from "../../../../shared/components/declaration-warning-dialog/warning-dialog.component";
import {DeclarationTableFormOptions} from "../../../../../shared/objects/declaration-table-form-options";
import {DeclarationStatus} from '../../../../../shared/enums/declaration-status';
import {ProducerDeclarationHelper} from '../../helpers/producer-declaration.helper';
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';
import {ProfileService} from '../../../../../shared/services/auth/profile.service';

@Component({
    selector: 'app-producer-declaration-container-edit',
    templateUrl: './producer-declaration-container-edit.component.html',
    styleUrl: './producer-declaration-container-edit.component.scss'
})
export class ProducerDeclarationContainerEditComponent {

    public loaderId: string = UuidHelper.get();
    model: DeclarationResponseDto = this.config.data.model;
    public declarationTableFormType: DeclarationTableFormType;
    organization: OrganizationResponseDto = this.config.data.organization;
    loaded: boolean = false;
    materials: DeclarationTableFormOptions[];
    organizationId: string;

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        public config: DynamicDialogConfig,
        public loaderService: LoaderService,
        private message: DefaultSystemMessagesService,
        private dialogService: DialogService,
        private service: DeclarationService,
        private profileService: ProfileService,
        ) {
    }

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.loaded = false;
        this.declarationTableFormType = this.getDeclarationTableFormType();
        this.loaded = true
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

        if (this.displayModal()) {
            await this.openDeclarationWarningDialogComponent();
        }

        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId, this.model.id, $event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }

    private displayModal(): boolean {
        return ProducerDeclarationHelper.displayModal(
            DeclarationStatus[this.model.status],
            this.model?.declarationRequest?.endDate,
            DeclarationRequestRecurrence[this.model.declarationRequest.recurrence]
        );
    }

    openDeclarationWarningDialogComponent(): Promise<boolean> {
        return new Promise((resolve) => {
            const ref = this.dialogService.open(WarningDialogComponent, {
                header: 'Confirmar edición de declaración',
                data: {
                    html: 'Al confirmar la edición de los datos ya declarados, estas aceptando que  GIRO modificará la información ya entregada en el periodo que la SMA habilite para ello.',
                },
                width: '700px',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });
            ref.onClose.subscribe(async value => {
                if (value) {
                    resolve(true);
                }
            });
        });
    }
}
