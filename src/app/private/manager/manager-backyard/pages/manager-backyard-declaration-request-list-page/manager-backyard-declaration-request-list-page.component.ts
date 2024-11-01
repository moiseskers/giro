import {Component, ViewChild} from '@angular/core';
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {
    BackyardDeclarationRequestListComponent
} from "../../../../shared/components/backyard-declaration-request-list/backyard-declaration-request-list.component";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {DeclarationRequestRecurrence} from 'src/app/shared/enums/declaration-request-recurrence';
import {DeclarationStatus} from 'src/app/shared/enums/declaration-status';
import {DeclarationRequestStatus} from 'src/app/shared/enums/declaration-request-status';

@Component({
    selector: 'app-manager-backyard-declaration-request-list-page',
    templateUrl: './manager-backyard-declaration-request-list-page.component.html',
    styleUrl: './manager-backyard-declaration-request-list-page.component.scss'
})
export class ManagerBackyardDeclarationRequestListPageComponent {

    loaderId = UuidHelper.get();
    model: Page<DeclarationResponseDto>;
    filerLoaderId = UuidHelper.get();
    filters: Filter[];
    readonly viewPageUrl: string = `${location.pathname}/view`;

    @ViewChild(BackyardDeclarationRequestListComponent) backyardDeclarationRequestListComponent: BackyardDeclarationRequestListComponent;
    protected readonly DeclarationRequestRecurrence = DeclarationRequestRecurrence;
    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
    protected readonly DeclarationStatus = DeclarationStatus;
    private organizationId: string;
    public modelIn = (model: DeclarationResponseDto) => model;

    constructor(
        private profileService: ProfileService,
        private service: DeclarationService,
        private router: Router,
        public loaderService: LoaderService
    ) {}

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId);
        await this.initializeFiltersLoaded()
    }

    async view(id: string) {
        await this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    page($event: any) {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId);
        });
    }

    async initializeFiltersLoaded() {
        const options: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.filters(this.organizationId)), this.filerLoaderId);
        const declaredMonthYear = this.declaredMonthYearFormatHelper(options?.declaredMonthYears || []);

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        label: 'Buscar por ID de declaración, razón social, RUT o identificación (ID)',
                        name: 'search',
                        type: 'text',
                    },
                ]
            },
            {
                title: 'Mes/Año declarado',
                fields: [
                    {
                        type: 'autocomplete',
                        name: 'declaredMonthYears',
                        label: 'Mes declarado',
                        placeholder: 'Seleccione el mes declarado',
                        options: declaredMonthYear.map(c => {
                                return {
                                    key: c.key,
                                    label: c.label,
                                }
                            }
                        )
                    },
                ]
            },
            {
                title: 'Fecha de declaración',
                fields: [
                    {
                        term: 'Fecha de declaración',
                        type: 'date',
                        name: 'declarationDateBegin',
                        label: 'Fecha de declaración',
                        placeholder: '--/--/---- - --/--/----',
                        config: {
                            selectionMode: 'range'
                        },
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
            }
        ];
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

        if ($event?.declarationDateBegin) {
            const declarationDateEnd = $event?.declarationDateBegin.split(',')[1];
            $event.declarationDateBegin = $event?.declarationDateBegin.split(',')[0];

            $event = {
                declarationDateEnd: declarationDateEnd,
                ...$event
            }
        }

        this.filter($event);
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId)
        });
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


}
