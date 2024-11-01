import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrganizationUserCreateComponent} from "../organization-user-create/organization-user-create.component";
import {OrganizationUserEditComponent} from "../organization-user-edit/organization-user-edit.component";
import {ManagerResponseDto} from "../../../../../../shared/models/manager-response.dto";
import {OrganizationUserService} from "../../../../../shared/services/organization-user.service";
import {MenuItem} from "primeng/api";
import {Component, Input} from "@angular/core";
import {Page} from "../../../../../../shared/objects/page";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {DeleteService} from "../../../../../../shared/services/delete/delete.service";
import {GiroDataViewComponent} from "../../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {TableModule} from "primeng/table";
import {OrganizationStatusesModule} from "../../organization/organization-statuses/organization-statuses.module";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {AppPaginatorModule} from "../../../../../../shared/components/app-paginator";
import {OrganizationResponseDto} from "../../../../../../shared/models/organization-response.dto";
import {BlockUIModule} from "primeng/blockui";
import {Role} from "../../../../../../shared/enums/role";
import {FilterHistoryHelper} from "../../../../../../shared/helpers/filter-history.helper";
import {HasAnyRolePipeModule} from '../../../../../../shared/pipes/has-any-role/has-any-role-pipe.module';
import {HasAnyRolePipe} from '../../../../../../shared/pipes/has-any-role/has-any-role.pipe';
import {GeneralHelper} from '../../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-organization-user-list',
    templateUrl: './organization-user-list.component.html',
    styleUrl: './organization-user-list.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        OrganizationStatusesModule,
        ButtonModule,
        MenuModule,
        NgIf,
        AppPaginatorModule,
        BlockUIModule,
        HasAnyRolePipeModule
    ],
    providers: [HasAnyRolePipe]
})
export class OrganizationUserListComponent {

    readonly loaderUserServiceGet = 'user-service-get';
    readonly loaderUserServiceGetById = 'user-service-get-by-id';

    model: Page<ManagerResponseDto>;
    organizationId: string = this.activatedRoute.snapshot.params['id'];
    ref: DynamicDialogRef | undefined;

    public modelIn = (model: ManagerResponseDto) => model;

    @Input()
    organization: OrganizationResponseDto;

    readonly dialogHeaderCreate = 'Nuevo usuario';
    readonly dialogHeaderEdit = 'Editar usuario';
    readonly deleteMessage = 'Desea confirmar la eliminación del usuario?';

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(private service: OrganizationUserService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService,
                private hasAnyRolePipe: HasAnyRolePipe
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, null)), this.loaderUserServiceGet);
    }

    async page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId, $event)), this.loaderUserServiceGet);
        });
    }

    new(): void {
        this.ref = this.dialogService.open(OrganizationUserCreateComponent, {
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

    async edit(id: string) {
        const model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getById(this.organizationId, id)), this.loaderUserServiceGetById);

        this.ref = this.dialogService.open(OrganizationUserEditComponent, {
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

    items: MenuItem[] | undefined = [
        {
            label: 'Enviar nuevamente',
            command: async ($event: any) => {
                const id = $event.originalEvent.target.getAttribute('id');
                await lastValueFrom(this.service.sendAgain());
                await this.ngOnInit();
                this.message.success();
            }
        },
        {
            label: 'Borrar',
            command: async ($event: any) => {
                const id = $event.originalEvent.target.getAttribute('id');
                await this.delete(id);
            }
        },
    ];
    @Input() blockedPanel!: boolean;
    protected readonly Roles = Role;
    protected readonly Role = Role;

    get organizationViewByRoleHelper() {
        return GeneralHelper.organizationViewByRoleHelper(this.hasAnyRolePipe);
    }
}
