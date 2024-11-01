import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Page} from "../../../../../shared/objects/page";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {lastValueFrom} from "rxjs";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {InvoiceStatus} from 'src/app/shared/enums/invoice-status';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import {
    InvoiceCreateContainerComponent
} from '../../containers/invoice-create-container/invoice-create-container.component';
import {LeadsService} from '../../../../shared/services/leads.service';
import {LeadsMaterialResponseDto} from '../../../../../shared/models/leads-response.dto';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-invoice-list-page',
    templateUrl: './invoice-list-page.component.html',
    styleUrl: './invoice-list-page.component.scss'
})
export class InvoiceListPageComponent {

    readonly addButtonTitle = 'Nueva factura';
    readonly dialogHeaderCreate = 'Nueva factura';
    readonly viewPageUrl: string = `${location.pathname}/view`;

    @ViewChild(Table) table: Table;

    saveLoaderId = UuidHelper.get();
    loaderId = UuidHelper.get();
    filerIsLoading = true;

    changeStatusLoader: any[] = [];
    model: Page<InvoiceResponseDto>;
    filters: Filter[] = [];

    protected readonly InvoiceStatus = InvoiceStatus;

    public modelIn = (model: InvoiceResponseDto) => model;

    constructor(
        private service: AdminInvoiceService,
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private router: Router,
        private dialogService: DialogService,
        private leadsService: LeadsService,
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
        await this.initializeFiltersLoaded();
    }

    actionButtonEvent(): void {
        const ref = this.dialogService.open(InvoiceCreateContainerComponent, {
            header: this.dialogHeaderCreate,
            width: '700px',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
            }
        });
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
        });
    }

    async action(item: any, model: InvoiceResponseDto, index: string) {

        this.changeStatusLoader[index] = UuidHelper.get();

        if (InvoiceStatus[item?.id] == InvoiceStatus.REFUSED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.inactive(model.id)), this.changeStatusLoader[index]);
            await this.ngOnInit();
            return;
        }

        await this.loaderService.activateLoader(() => lastValueFrom(this.service.active(model.id)), this.changeStatusLoader[index]);

        await this.ngOnInit();
    }

    filter($event: any): void {
        $event = FilterHelper.filterRangeDate($event, 'issueDateBegin', 'issueDateEnd');
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
        });
    }

    async view(id: string) {
        await this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    private async initializeFiltersLoaded() {

        this.filerIsLoading = true;

        let options: any;

        try {
            options = await lastValueFrom(this.service.filters());
        } catch (e) {
            this.log.info('unable to fetch filter options ', e)
        }

        const materials = await this.getMaterials() || [];
        const status = options?.status || [];

        this.filters = [
            {
                base: true,
                fields: [
                    {
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID de factura, número de factura, emisor o receptor',
                    },
                ]
            },
            {
                title: 'Fecha de emisión',
                fields: [
                    {
                        type: 'date',
                        name: 'issueDateBegin',
                        label: 'Fecha de emisión',
                        placeholder: '--/--/---- - --/--/----',
                        config: {
                            selectionMode: 'range'
                        },
                    },
                ]
            },
            {
                title: 'Material',
                fields: [
                    {
                        type: 'autocomplete',
                        name: 'materialIds',
                        label: 'Material',
                        placeholder: 'Seleccione el material',
                        options: materials.map(c => {
                                return {
                                    key: c.id,
                                    label: c.name
                                }
                            }
                        )
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
                        options: status.map((s: any) => {
                                return {
                                    key: s,
                                    label: InvoiceStatus[s]
                                }
                            }
                        )
                    },
                ]
            },
        ]

        this.filerIsLoading = false;

    }

    async getMaterials(): Promise<LeadsMaterialResponseDto[]> {
       return (await lastValueFrom(this.leadsService.materials(1000))).items;
    }
}
