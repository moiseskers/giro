import {Component, ViewChild} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {Table} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";
import {ManagerResponseDto} from "../../../../../shared/models/manager-response.dto";
import {UserCreateComponent} from "../../components/users/user-create/user-create.component";
import {ManagerService} from "../../../../shared/services/manager.service";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list-page.component.html',
    styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {

    readonly tableLoaderId: string = 'tableLoaderId';
    readonly viewPageUrl: string = `/private/admin/user/pages/view`;

    readonly dialogHeaderCreate = 'Nuevo usuario';
    readonly deleteConfirmationMessage = 'Desea confirmar la eliminación del usuario?';

    @ViewChild('table') table: Table;

    model: Page<ManagerResponseDto>;
    ref: DynamicDialogRef | undefined;

    constructor(private service: ManagerService,
                public loaderService: LoaderService,
                private message: DefaultSystemMessagesService,
                private dialogService: DialogService,
                private deleteService: DeleteService,
                private router: Router) {
    }

    public modelIn = (model: ManagerResponseDto) => model;

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId);
    }

    async view(id: string) {
        await this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    add(): void {
        this.ref = this.dialogService.open(UserCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
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

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model  = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId)
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model  = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId)
        });
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model  = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId)
        });
    }

    items: MenuItem[] | undefined = [
        // {
        //     label: 'Enviar nuevamente',
        //     id: 'SEND_AGAIN'
        // },
        {
            label: 'Borrar',
            id: 'DELETE'
        },
    ];

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    term: 'Busca',
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por nombre, RUT o correo',
                },
            ]
        },
        {
            title: 'Estado',
            fields: [
                {
                    term: 'Estado',
                    type: 'multiselect-checkbox',
                    name: 'status',
                    label: 'Estado',
                    options: [
                        {
                            "key": "PENDING",
                            "label": "Confirmación pendiente"
                        },
                        {
                            "key": "ACTIVE",
                            "label": "Activo"
                        },
                        {
                            "key": "INACTIVE",
                            "label": "Inactivo"
                        },
                    ]
                },
            ]
        },
    ];

    protected readonly organizationTypes = OrganizationTypeEnum;

    async action(item: MenuItem, id: string) {

        if (item.id === 'DELETE') {
            await this.deleteService.confirmationDialog(
                {
                    message: this.deleteConfirmationMessage
                }
            );
            await lastValueFrom(this.service.delete(id));
        } else {
            await lastValueFrom(this.service.sendAgain(id));
        }

        await this.ngOnInit();
        this.message.success();
    }
}
