import {Component, Inject, ViewChild} from '@angular/core';
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {Router} from "@angular/router";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {lastValueFrom} from "rxjs";
import {
    DeclarationRequestListComponent
} from "../../../../shared/components/declaration-request-list/declaration-request-list.component";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    DeclarationRequestCreateContainerComponent
} from "../../containers/declaration-request-create-container/declaration-request-create-container.component";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {DECLARATION_TYPE} from "../../declaration-request.module";

@Component({
    selector: 'app-declaration-request-list-page',
    templateUrl: './declaration-request-list-page.component.html',
    styleUrl: './declaration-request-list-page.component.scss'
})
export class DeclarationRequestListPageComponent {

    @ViewChild(DeclarationRequestListComponent) massListComponent: DeclarationRequestListComponent;
    public loaderId = UuidHelper.get();
    public model: Page<DeclarationRequestResponseDto>;
    filerLoaderId = UuidHelper.get();
    filters: Filter[];

    ref: DynamicDialogRef | undefined;
    public saveLoaderId: string = UuidHelper.get();
    public readonly viewPageUrl: string = `/private/admin/mass/pages/view`;
    private dialogHeader: string = 'Solicitar declaración';

    constructor(
        @Inject(DECLARATION_TYPE) private type: string,
        private service: DeclarationRequestService,
        private router: Router,
        private dialogService: DialogService,
        public loaderService: LoaderService) {
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
        const options: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.filters(this.type)), this.filerLoaderId);

        const recurrences: any[] = GeneralHelper.enumToList(DeclarationRequestRecurrence);
        const declaredMonthYear = this.declaredMonthYearFormatHelper(options?.declaredMonthYears || []);
        const status = options?.status || [];

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID de solicitud',
                    },
                ]
            },
            {
                title: 'Tipo',
                fields: [
                    {
                        term: 'Tipo',
                        type: 'dropdown',
                        name: 'recurrences',
                        label: 'Tipo',
                        placeholder: 'Seleccione el tipo de declaración',
                        options: recurrences.map(c => {
                                return {
                                    key: c.value,
                                    label: c.key
                                }
                            }
                        )
                    },
                ]
            },
            {
                title: 'Mes/Año declarado',
                fields: [
                    {
                        term: 'Mes/Año declarado',
                        type: 'autocomplete',
                        name: 'declaredMonthYears',
                        label: 'Mes/Año declarado',
                        placeholder: 'Seleccione el mes/año declarado',
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
        this.ref = this.dialogService.open(DeclarationRequestCreateContainerComponent, {
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

        await this.ngOnInit();
    }
}
