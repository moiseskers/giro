import {Component, Input} from '@angular/core';
import {LoaderService} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {BackyardDocumentResponseDto} from "../../../../../shared/models/backyard-document-response.dto";
import {MenuItem} from "primeng/api";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {
    ManagerBackyardDocumentCreateContainerComponent
} from "../manager-backyard-document-create-container/manager-backyard-document-create-container.component";
import {DeclarationDocumentService} from "../../../../shared/services/declaration-document.service";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";
import {ProfileService} from '../../../../../shared/services/auth/profile.service';

@Component({
    selector: 'app-manager-backyard-document-list-container',
    templateUrl: './manager-backyard-document-list-container.component.html',
    styleUrl: './manager-backyard-document-list-container.component.scss',
})
export class ManagerBackyardDocumentListContainerComponent {

    readonly loaderUserServiceGet = uuidv4();
    readonly downloadLoaderId = uuidv4();

    model: Page<BackyardDocumentResponseDto>;

    ref: DynamicDialogRef | undefined;
    readonly dialogHeaderCreate = 'Nuevo documento';

    @Input()
    organization: OrganizationResponseDto;

    menuItems: MenuItem[] = [{label: 'Aprobar', id: 'APPROVE',}, {label: 'Rechazar', id: 'REFUSE'}, {
        label: 'Borrar',
        id: 'DELETE'
    }];

    @Input() declarationResponseDto: DeclarationResponseDto
    protected readonly DeclarationStatus = DeclarationStatus;
    private declarationId: string;
    private organizationId: string;

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(private service: DeclarationDocumentService,
                public loaderService: LoaderService,
                private dialogService: DialogService,
                private profileService: ProfileService,
    ) {}

    public modelIn = (model: BackyardDocumentResponseDto) => model;

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.declarationId = this.declarationResponseDto.id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, this.declarationId, null)), this.loaderUserServiceGet);
    }

    async page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, this.declarationId, $event)), this.loaderUserServiceGet);
        });
    }

    new(): void {
        this.ref = this.dialogService.open(ManagerBackyardDocumentCreateContainerComponent, {
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

    async download(id: string) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getById(this.organizationId, this.declarationId, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }
}
