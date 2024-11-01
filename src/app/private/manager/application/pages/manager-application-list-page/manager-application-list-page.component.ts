import {Component, ViewChild} from '@angular/core';
import {AppCardModule} from "../../../../../shared/components/app-card";
import {AppDefaultColumnSeparatorGridModule} from "../../../../../shared/components/app-default-column-separator-grid";
import {AppFilterModule} from "../../../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {BiddingStatusesComponent} from "../../../../../shared/components/bidding-statuses/bidding-statuses.component";
import {ButtonModule} from "primeng/button";
import {DatePipe, NgIf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {BiddingType} from "../../../../../shared/enums/bidding-type.enum";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {lastValueFrom} from "rxjs";
import {LoaderService, LoaderServiceModule} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {ApplicationService} from "../../../../shared/services/application.service";
import {ApplicationStatusEnum} from "../../../../../shared/enums/application-status.enum";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {
    ApplicationStatusesComponent
} from "../../../../shared/components/application-statuses/application-statuses.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-manager-application-list-page',
    standalone: true,
    imports: [
        AppCardModule,
        AppDefaultColumnSeparatorGridModule,
        AppFilterModule,
        AppPaginatorModule,
        BiddingStatusesComponent,
        ButtonModule,
        DatePipe,
        NgIf,
        SharedModule,
        TableModule,
        LoaderServiceModule,
        ApplicationStatusesComponent
    ],
    templateUrl: './manager-application-list-page.component.html',
    styleUrl: './manager-application-list-page.component.scss'
})
export class ManagerApplicationListPageComponent {

    protected readonly biddingType = BiddingType;
    public modelIn = (model: ApplicationResponseDto) => model;
    public model: Page<ApplicationResponseDto>;
    public readonly serviceGetLoaderId: string = UuidHelper.get();
    public readonly serviceFilterOptionsLoaderId = UuidHelper.get();
    readonly viewPageUrl: string = `/private/manager/applications/pages/view`;
    organizationId: string;

    @ViewChild('table') table: Table;

    filters: Filter[];

    constructor(
        private service: ApplicationService,
        private profileService: ProfileService,
        private router: Router,
        public loaderService: LoaderService,) {
    }

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0]?.id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.serviceGetLoaderId);
        await this.initializeFiltersLoaded();
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.serviceGetLoaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.serviceGetLoaderId);
        });
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.serviceGetLoaderId);
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



    view(id: string) {
        this.router.navigate([`${this.viewPageUrl}/${id}`]);
    }

    async initializeFiltersLoaded() {
        const options: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.filterOptions()), this.serviceFilterOptionsLoaderId);
        const cities: any[] = options.cityNames;
        const status = options.status;

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        term: 'Buscar por ID BALI o ID de inscripción',
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID BALI o ID de inscripción',
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
                title: 'Fecha de inicio',
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
                title: 'Fecha de término',
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
                                    label: ApplicationStatusEnum[s]
                                }
                            }
                        )
                    },
                ]
            },
        ];
    }

}
