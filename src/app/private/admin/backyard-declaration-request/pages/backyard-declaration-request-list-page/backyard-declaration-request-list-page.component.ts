import {Component, Inject, ViewChild} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";

import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {
    AdminBackyardDeclarationRequestListComponent
} from "../../components/backyard-declaration-request-list/admin-backyard-declaration-request-list.component";
import {NGXLogger} from "ngx-logger";
import {
    BackyardDeclarationRequestCreateContainerComponent
} from "../../containers/backyard-declaration-request-create-container/backyard-declaration-request-create-container.component";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {DECLARATION_TYPE} from "../../backyard-declaration-request.module";
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';

@Component({
    selector: 'app-backyard-declaration-request-list-page',
    templateUrl: './backyard-declaration-request-list-page.component.html',
    styleUrl: './backyard-declaration-request-list-page.component.scss'
})
export class BackyardDeclarationRequestListPageComponent {

    @ViewChild(AdminBackyardDeclarationRequestListComponent) backyardDeclarationRequestListComponent: AdminBackyardDeclarationRequestListComponent;

    public loaderId = UuidHelper.get();
    public model: Page<DeclarationRequestResponseDto>;
    filerLoaderId = UuidHelper.get();
    filters: Filter[];

    ref: DynamicDialogRef | undefined;
    public saveLoaderId: string = UuidHelper.get();

    public readonly viewPageUrl: string = `${location.pathname}/view`;
    private dialogHeader: string = 'Solicitar declaración';

    constructor(
        @Inject(DECLARATION_TYPE) private type: string,
        private service: DeclarationRequestService,
        private router: Router,
        private dialogService: DialogService,
        private log: NGXLogger,
        public loaderService: LoaderService,
        public loaderServiceV2: LoaderServiceV2,
        private defaultSystemMessageService: DefaultSystemMessagesService,
        ) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.type)), this.loaderId);
        await this.initializeFiltersLoaded()
    }

    view($event: any): void {
        this.router.navigate([`${this.viewPageUrl}/${$event}`]);
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.type)), this.loaderId);
        });
    }

    async initializeFiltersLoaded() {
        let options: any;

        try {
            options  = await this.loaderServiceV2.activateLoader(() => lastValueFrom(
                this.service.filters(this.type)
            ), this.filerLoaderId);
        } catch (e) {
            this.log.info('unable to fetch filter options ', e)
        }

        // const types: any[] = GeneralHelper.enumToList(DeclarationRequestRecurrence);

        const declaredMonthYear = this.declaredMonthYearFormatHelper(options?.declaredMonthYears || []);

        const status = options?.status || [];

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        term: 'Buscar por ID de solicitud',
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID de solicitud',
                    },
                ]
            },
            {
                title: 'Mes declarado',
                fields: [
                    {
                        term: 'Mes declarado',
                        type: 'autocomplete',
                        name: 'declaredMonthYears',
                        label: 'Mes declarado',
                        placeholder: 'Seleccione el mes declarado',
                        options: declaredMonthYear.map(c => {
                                return {
                                    key: c.key,
                                    label: c.label
                                }
                            }
                        )
                    },
                ]
            },
            {
                title: 'Fecha final',
                fields: [
                    {
                        term: 'Fecha final',
                        type: 'date',
                        name: 'endDateBegin',
                        label: 'Fecha final',
                        placeholder: '--/--/---- - --/--/----',
                        config: {
                            selectionMode: 'range'
                        },
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
                                    label: DeclarationRequestStatus[s]
                                }
                            }
                        )
                    },
                ]
            },
        ];
    }

    declaredMonthYearFormatHelper(inputs: string[]) {
        return inputs.map(value => {
            return {
                key: value,
                label: this._declaredMonthYearFormatHelper(value)
            }
        })
    }

    _declaredMonthYearFormatHelper(input: string) {
        if (input.length === 7) {
            return this.formatMonthYearString(input)
        }
        return input;
    }

    formatMonthYearString(input: string): string {
        // Split the input string into year and month
        const [year, month] = input.split('-');

        // Create an array of month names
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        // Convert the month part to an integer and get the corresponding month name
        const monthName = monthNames[parseInt(month) - 1];

        // Return the formatted string
        return `${monthName} ${year}`;
    }

    filterProcess($event: any) {
        if ($event?.endDateBegin) {
            const endDateEnd = $event?.endDateBegin.split(',')[1];
            $event.endDateBegin = $event?.endDateBegin.split(',')[0];

            $event = {
                endDateEnd: endDateEnd,
                ...$event
            }
        }
        this.filter($event);
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.type)), this.loaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.type)), this.loaderId);
        });
    }

    actionButtonEvent() {
        this.ref = this.dialogService.open(BackyardDeclarationRequestCreateContainerComponent, {
            header: this.dialogHeader,
            width: '40vw',
            modal: true,
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

    clearFilterEvent() {
    }

    async actionEvent($event: { action: any, model: DeclarationRequestResponseDto }) {
        const model = $event.model;

        if ($event.action.id === 'DOWNLOAD') {
            this.service.downloadDirectly(model.id);
            return;
        }

        if (DeclarationRequestStatus[model?.status] === DeclarationRequestStatus.BLOCKED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.unblock(model.id)), this.loaderId);
        } else {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.block(model.id)), this.loaderId);
        }

        this.defaultSystemMessageService.success();

        await this.ngOnInit();
    }

    protected readonly LoaderServiceV2 = LoaderServiceV2;
}
