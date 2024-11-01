import {Component, Input} from '@angular/core';
import {LoaderService} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {BackyardDocumentResponseDto} from "../../../../../shared/models/backyard-document-response.dto";
import {MenuItem} from "primeng/api";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {
    BackyardDocumentCreateContainerComponent
} from "../backyard-document-create-container/backyard-document-create-container.component";
import {DeclarationDocumentStatusEnum} from "../../../../../shared/enums/declaration-document-status.enum";
import {DeclarationDocumentService} from "../../../../shared/services/declaration-document.service";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";

@Component({
    selector: 'app-backyard-document-list-container',
    templateUrl: './backyard-document-list-container.component.html',
    styleUrl: './backyard-document-list-container.component.scss',
})
export class BackyardDocumentListContainerComponent {

    readonly loaderUserServiceGet = uuidv4();
    readonly downloadLoaderId = uuidv4();

    model: Page<BackyardDocumentResponseDto>;

    @Input()
    declarationResponseDto: DeclarationResponseDto;

    ref: DynamicDialogRef | undefined;
    readonly dialogHeaderCreate = 'Nuevo documento';
    readonly deleteMessage = 'Desea confirmar la eliminación del documento?';
    public modelIn = (model: BackyardDocumentResponseDto) => model;

    @Input()
    organization: OrganizationResponseDto;
    menuItems: MenuItem[] = [{label: 'Aprobar', id: 'APPROVE', }, {label: 'Rechazar', id:'REFUSE'}, {label: 'Borrar', id: 'DELETE'}];
    documentChangeStatusLoader: string = UuidHelper.get();
    documentDeleteLoader: string = UuidHelper.get();
    private declarationId: string;

    constructor(private service: DeclarationDocumentService,
                public loaderService: LoaderService,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService
    ) {}

    async ngOnInit() {
        this.declarationId = this.declarationResponseDto.id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getAdmin(this.declarationId, null)), this.loaderUserServiceGet);
    }

    async page($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getAdmin(this.declarationId, $event)), this.loaderUserServiceGet);
    }

    new(): void {
        this.ref = this.dialogService.open(BackyardDocumentCreateContainerComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                declarationResponseDto: this.declarationResponseDto
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
            }
        });
    }

    async delete(id: string) {
        await this.deleteService.confirmationDialog({
            message: this.deleteMessage
        });

        await lastValueFrom(this.service.deleteAdmin(this.declarationId, id));
        await this.ngOnInit();
        this.message.success();
    }

    async download(id: string | undefined) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getByIdAdmin(this.declarationId, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }

    async action(item: any, id: string) {
        switch (item.id) {
            case 'APPROVE':
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.approveAdmin(this.declarationId, id)), this.documentChangeStatusLoader);
                return this.ngOnInit();
            case 'REFUSE':
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.reproveAdmin(this.declarationId, id)), this.documentChangeStatusLoader);
                return this.ngOnInit();
            case 'DELETE':
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.deleteAdmin(this.declarationId, id)), this.documentDeleteLoader);
                return this.ngOnInit();
        }
    }

    protected readonly DeclarationDocumentStatusEnum = DeclarationDocumentStatusEnum;
}
