import {Component, Input} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {BranchCreateComponent} from "../branch-create/branch-create.component";
import {BranchEditComponent} from "../branch-edit/branch-edit.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {BranchService} from "../../../services/branch.service";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {BranchResponseDto} from "../../../../../shared/models/branch-response.dto";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {HasAnyRolePipeModule} from "../../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {Role} from "../../../../../shared/enums/role";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {BlockUIModule} from "primeng/blockui";
import {BranchProducerType} from "../../../../../shared/enums/branch-producer-type";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";

@Component({
    selector: 'app-branches-list',
    templateUrl: './branches-list.component.html',
    styleUrl: './branches-list.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        AppPaginatorModule,
        NgIf,
        HasAnyRolePipeModule,
        BlockUIModule
    ]
})
export class BranchesListComponent {

    readonly loaderServiceGet = UuidHelper.get();
    readonly loaderServiceGetById = UuidHelper.get();

    model: Page<BranchResponseDto>;
    organizationId: string = this.activatedRoute.snapshot.params['id'];
    ref: DynamicDialogRef | undefined;

    public modelIn = (model: BranchResponseDto) => model;

    readonly dialogHeaderCreate = 'Nuevo ID';
    readonly dialogHeaderEdit = 'Editar ID';
    readonly deleteMessage = 'Desea confirmar la eliminación del ID?';

    @Input()
    organization: OrganizationResponseDto;

    constructor(private service: BranchService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderServiceGet);
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderServiceGet);
        });
    }

    new(): void {
        this.ref = this.dialogService.open(BranchCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId,
                model: this.organization
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

    async edit(id: string) {
        const model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getById(this.organizationId, id)), this.loaderServiceGetById);

        this.ref = this.dialogService.open(BranchEditComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId,
                id: id,
                model: model
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

    protected readonly Roles = Role;
    @Input() blockedPanel!: boolean;
    protected readonly BranchProducerType = BranchProducerType;
    protected readonly OrganizationType = OrganizationTypeEnum;
}
