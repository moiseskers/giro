import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {EvaluationService} from "../../services/evaluation.service";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {BiddingType} from "../../../../../shared/enums/bidding-type.enum";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {LoaderService} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {EvaluationStatusEnum} from '../../../../../shared/enums/evaluation-status.enum';

@Component({
    selector: 'app-evaluation-page-list',
    templateUrl: './evaluation-list-page.component.html',
    styleUrl: './evaluation-list-page.component.scss'
})
export class EvaluationListPageComponent {

    public readonly biddingLoaderId: string = UuidHelper.get();
    public readonly filterLoaderId: string = UuidHelper.get();
    public readonly detailPageUrl: string = `/private/admin/evaluation/pages/evaluation-details`;

    @ViewChild('table') table: Table;

    model: Page<BiddingResponseDto>;

    public modelIn = (model: BiddingResponseDto) => model;

    ref: DynamicDialogRef | undefined;

    filters: Filter[];

    constructor(private service: EvaluationService,
                public loaderService: LoaderService,
                private router: Router) {
    }

    async ngOnInit() {
        this.loaderService.loading[this.filterLoaderId] = true;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.biddingLoaderId);
        await this.initializeFilters();
    }

    async view(model: BiddingResponseDto) {
        await this.router.navigate([`${this.detailPageUrl}/${model.id}`]);
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.biddingLoaderId);
        });
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.biddingLoaderId);
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
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.biddingLoaderId);
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
        const status = options.evaluationStatus;

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
                title: 'Tipo de licitación',
                fields: [
                    {
                        term: 'Tipo',
                        type: 'multiselect-checkbox',
                        name: 'biddingTypes',
                        label: 'Tipo',
                        options: biddingTypes.map((s: string | number) => {
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
                        term: 'Status',
                        type: 'multiselect-checkbox',
                        name: 'evaluationStatus',
                        label: 'Estado',
                        options: status.map((s: string | number) => {
                                return {
                                    key: s,
                                    label: EvaluationStatusEnum[s]
                                }
                            }
                        )
                    },
                ]
            },
        ];
    }

    protected readonly biddingType = BiddingType;
}
