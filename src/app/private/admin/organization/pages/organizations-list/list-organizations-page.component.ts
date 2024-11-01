import {Component, ViewChild} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {Table} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {
    OrganizationCreateComponent
} from "../../components/organization/organization-create/organization-create.component";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";
import {RejectedFormComponent} from "../../components/rejected-form/rejected-form.component";
import {OrganizationStatusEnum} from "../../../../../shared/enums/organization-status-enum";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {AppPaginatorComponent} from "../../../../../shared/components/app-paginator";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";

@Component({
    selector: 'app-list-organizations',
    templateUrl: './list-organizations-page.component.html',
    styleUrl: './list-organizations-page.component.scss'
})
export class ListOrganizationsPageComponent {

    readonly tableLoaderId: string = UuidHelper.get();
    readonly viewPageUrl: string = `/private/admin/organization/pages/view`;
    readonly dialogHeaderCreate = 'Nueva entidad';

    @ViewChild('table') table: Table;
    @ViewChild('paginator') paginatorRef: AppPaginatorComponent;

    model: Page<OrganizationResponseDto>;
    ref: DynamicDialogRef | undefined;

    constructor(private service: OrganizationService,
                public loaderService: LoaderService,
                private message: DefaultSystemMessagesService,
                private dialogService: DialogService,
                private router: Router) {
    }

    public modelIn = (model: OrganizationResponseDto) => model;
    items: MenuItem[];

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.tableLoaderId);
    }

    async view(id: string) {
        await this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.tableLoaderId);
        });
    }

    add(): void {
        this.ref = this.dialogService.open(OrganizationCreateComponent, {
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
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.tableLoaderId);
        });
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.tableLoaderId);
        });
    }

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    term: 'Busca',
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por razón social, nombre de fantasía o RUT',
                },
            ]
        },
        {
            title: 'Tipo de entidad',
            fields: [
                {
                    term: 'Tipo de entidad',
                    type: 'multiselect-checkbox',
                    name: 'organizationTypes',
                    label: 'Tipo de entidad',
                    options: [
                        {
                            key: 'MANAGER',
                            label: 'Gestor'
                        },
                        {
                            key: 'PRODUCER',
                            label: 'Productor'
                        },
                        {
                            key: 'INDUSTRIAL_CONSUMER',
                            label: 'Consumidor industrial'
                        },
                        {
                            key: 'CITY',
                            label: 'Municipio'
                        }
                    ]
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
                            "key": "ACTIVE",
                            "label": "Activo"
                        },
                        {
                            "key": "INACTIVE",
                            "label": "Inactivo"
                        },
                        {
                            "key": "PENDING",
                            "label": "Aprobación pendiente"
                        },
                        {
                            "key": "REFUSED",
                            "label": "Rechazado"
                        }
                    ]
                },
            ]
        },
    ];

    rejected(): Promise<any> {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(RejectedFormComponent, {
                header: 'Descripción de rechazo',
                width: '40vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });

            this.ref.onClose.subscribe(async value => {
                if (value) {
                    resolve(value);
                }
                resolve(null);
            });
        });
    }

    protected readonly organizationTypes = OrganizationTypeEnum;

    async action(item: any, id: string) {
        switch (OrganizationStatusEnum[item.id]) {
            case OrganizationStatusEnum.INACTIVE:
                await lastValueFrom(this.service.updateStatusDisable(id));
                await this.ngOnInit();
                this.message.success();
                return
            case OrganizationStatusEnum.ACTIVE:
                await lastValueFrom(this.service.updateStatusApprove(id));
                await this.ngOnInit();
                this.message.success();
                return
            case OrganizationStatusEnum.REFUSED:
                const result = await this.rejected();
                if (result) {
                    await lastValueFrom(this.service.updateStatusReprove(id, result.rejectedDescription));
                    this.message.success();
                    await this.ngOnInit();
                }
                return
        }
    }
}
