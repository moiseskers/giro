import {Component, ViewChild} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Table} from "primeng/table";
import {Page} from "../../../../../shared/objects/page";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {MenuItem} from "primeng/api";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {BiddingStatus} from "../../../../../shared/enums/bidding-status.enum";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {BiddingCreateComponent} from "../../../../admin/bidding/components/bidding-create/bidding-create.component";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {
    CancelBiddingFormComponent
} from "../../../../admin/bidding/components/cancel-bidding-form/cancel-bidding-form.component";
import {BiddingEditComponent} from "../../../../admin/bidding/components/bidding-edit/bidding-edit.component";
import {BiddingType} from "../../../../../shared/enums/bidding-type.enum";

@Component({
    selector: 'app-manager-bidding-page-list',
    templateUrl: './manager-bidding-list-page.component.html',
    styleUrl: './manager-bidding-list-page.component.scss'
})
export class ManagerBiddingListPageComponent {

    public readonly biddingLoaderId: string = UuidHelper.get();
    public readonly updateLoaderId: string = UuidHelper.get();
    public readonly filterLoaderId: string = UuidHelper.get();
    public readonly viewPageUrl: string = `/private/manager/bidding/pages/view`;
    public readonly dialogHeaderCreate = 'Nueva licitación';
    public readonly dialogHeaderEdit = 'Editar licitación';

    @ViewChild('table') table: Table;

    model: Page<BiddingResponseDto>;

    public modelIn = (model: BiddingResponseDto) => model;

    ref: DynamicDialogRef | undefined;

    filters: Filter[];

    items: MenuItem[];

    constructor(private service: BiddingService,
                public loaderService: LoaderService,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private router: Router) {
    }

    async ngOnInit() {
        this.loaderService.loading[this.filterLoaderId] = true;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.biddingLoaderId);
        await this.initializeFilters();
        this.initializeStatuses();
    }

    private initializeStatuses() {
        this.items = [
            {
                label: 'Editar',
                id: 'edit'
            },
            {
                label: 'Declarar adjudicada',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.AWARDED)]
            },
            {
                label: 'Declarar desierta',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.ABANDONED)]
            },
            {
                label: 'Declarar cancelada',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.CANCELLED)]
            }
        ];
    }

    async view(id: string) {
        await this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.biddingLoaderId);
        });
    }

    add(): void {
        this.ref = this.dialogService.open(BiddingCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '700px',
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
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.biddingLoaderId);
        });
    }

    filterProcess($event: any): void {

        if ($event?.initialDateBegin) {
            const initialDateEnd = $event?.initialDateBegin.split(',')[1];
            $event.initialDateBegin = $event?.initialDateBegin.split(',')[0];

            $event = {
                initialDateEnd: initialDateEnd,
                ...$event
            }
        }

        if ($event?.finalDateBegin) {
            const finalDateEnd = $event?.finalDateBegin.split(',')[1];
            $event.finalDateBegin = $event?.finalDateBegin.split(',')[0];

            $event = {
                finalDateEnd: finalDateEnd,
                ...$event
            }
        }

        this.filter($event);
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.biddingLoaderId);
        });
    }

    cancel(): Promise<any> {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(CancelBiddingFormComponent, {
                header: 'Cancelamiento de licitación',
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

    entityDataEdit(model: BiddingResponseDto) {
        this.ref = this.dialogService.open(BiddingEditComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
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

    async initializeFilters() {
        const options = await lastValueFrom(this.service.filterOptions());
        await this.initializeFiltersLoaded(options);
        this.loaderService.loading[this.filterLoaderId] = false;
    }

    async initializeFiltersLoaded(options: any) {
        const cities: any[] = options.cityNames;
        const biddingTypes = options.biddingTypes;
        const status = options.status;

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        term: 'Buscar por ID BALI',
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID BALI',
                    },
                ]
            },
            {
                title: 'Comuna',
                fields: [
                    {
                        term: 'Comuna',
                        type: 'autocomplete',
                        name: 'cityNames',
                        label: 'Comuna',
                        config: {
                            autoCompleteMultiple: true
                        },
                        placeholder: 'Busca por la comuna',
                        options: cities.map(c => {
                                return {
                                    key: c,
                                    label: c
                                }
                            }
                        )
                    },
                ]
            },
            {
                title: 'Fecha de inicio de presentación de ofertas',
                fields: [
                    {
                        term: 'Fecha de inicio de presentación de ofertas',
                        type: 'date',
                        name: 'initialDateBegin',
                        label: 'Fecha de inicio de presentación de ofertas',
                        placeholder: '--/--/---- - --/--/----',
                        config: {
                            selectionMode: 'range'
                        },
                    },
                ]
            },
            {
                title: 'Fecha de fin de presentación de ofertas',
                fields: [
                    {
                        term: 'Fecha de fin de presentación de ofertas',
                        type: 'date',
                        name: 'finalDateBegin',
                        label: 'Fecha de fin de presentación de ofertas',
                        placeholder: '--/--/---- - --/--/----',
                        config: {
                            selectionMode: 'range'
                        },
                    },

                ]
            },
            {
                title: 'Tipo',
                fields: [
                    {
                        term: 'Tipo',
                        type: 'multiselect-checkbox',
                        name: 'biddingTypes',
                        label: 'Tipo',
                        options: biddingTypes.map(s => {
                                return {
                                    key: s,
                                    label: BiddingType[s]
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
                        options: status.map(s => {
                                return {
                                    key: s,
                                    label: BiddingStatus[s]
                                }
                            }
                        )
                    },
                ]
            },
        ];
    }

    async action(item: any, id: string) {
        if (item.id == 'edit') {
            const model = await this.loaderService.activateLoader<BiddingResponseDto>(() => lastValueFrom(this.service.getByIdStatusHelper(id)), this.updateLoaderId);
            this.entityDataEdit(model);
        } else {
            // when items are part if statuses
            switch (BiddingStatus[item.id]) {
                case BiddingStatus.CANCELLED:
                    const response = await this.cancel();
                    if (response) {
                        await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusCancel(id, response.description)), this.updateLoaderId);
                        this.message.success();
                        await this.ngOnInit();
                    }
                    return;
                case BiddingStatus.AWARDED:
                    await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusAward(id)), this.updateLoaderId);
                    this.message.success();
                    await this.ngOnInit();
                    return;
                case BiddingStatus.ABANDONED:
                    await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusAbandon(id)), this.updateLoaderId);
                    this.message.success();
                    await this.ngOnInit();
                    return;
            }
        }
    }

    protected readonly biddingType = BiddingType;

}
