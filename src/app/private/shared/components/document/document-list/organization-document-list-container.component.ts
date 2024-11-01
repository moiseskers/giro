import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LoaderService} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {v4 as uuidv4} from 'uuid';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {DocumentService} from "../../../services/document.service";
import {DocumentCreateComponent} from "../document-create/document-create.component";
import {DocumentResponseDto} from "../../../../../shared/models/document-response.dto";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {NgIf} from "@angular/common";
import {HasAnyRolePipeModule} from "../../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {Role} from "../../../../../shared/enums/role";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {BlockUIModule} from "primeng/blockui";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {HasAnyRolePipe} from '../../../../../shared/pipes/has-any-role/has-any-role.pipe';

@Component({
    selector: 'app-organization-document-list-container',
    templateUrl: './organization-document-list-container.component.html',
    styleUrl: './organization-document-list-container.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        AppPaginatorModule,
        NgIf,
        HasAnyRolePipeModule,
        BlockUIModule
    ],
    providers: [HasAnyRolePipe]
})
export class OrganizationDocumentListContainerComponent {

    readonly loaderUserServiceGet = uuidv4();
    readonly downloadLoaderId = uuidv4();

    model: Page<DocumentResponseDto>;
    organizationId: string = this.activatedRoute.snapshot.params['id'];
    ref: DynamicDialogRef | undefined;
    readonly dialogHeaderCreate = 'Nuevo documento';
    readonly deleteMessage = 'Desea confirmar la eliminación del documento?';
    public modelIn = (model: DocumentResponseDto) => model;

    @Input()
    organization: OrganizationResponseDto;

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(private service: DocumentService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService,
                private hasAnyRolePipe: HasAnyRolePipe,
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, null)), this.loaderUserServiceGet);
        this.countButtons();
    }

    async page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, $event)), this.loaderUserServiceGet);
        });
    }

    new(): void {
        this.ref = this.dialogService.open(DocumentCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value === 'modified') {
                await this.ngOnInit();
            }
        });
    }

    async delete(id: string) {
        await this.deleteService.confirmationDialog({
            message: this.deleteMessage
        });

        await lastValueFrom(this.service.delete(this.organizationId, id));
        await this.ngOnInit();
        this.message.success();
    }

    async download(id: string | undefined) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(this.organizationId, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }

    @ViewChild('actionsTd') actionsTd: ElementRef;
    buttonCount: number;

    countButtons() {
        setTimeout(() => {
            const buttons = this.actionsTd?.nativeElement?.querySelectorAll('button');
            this.buttonCount = buttons?.length;
        }, 500);
    }

    get organizationViewByRoleHelper() {
        return GeneralHelper.organizationViewByRoleHelper(this.hasAnyRolePipe);
    }

    protected readonly Role = Role;
    @Input() blockedPanel!: boolean;
}
