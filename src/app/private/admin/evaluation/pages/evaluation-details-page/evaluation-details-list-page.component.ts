import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActivatedRoute, Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {EvaluationService} from "../../services/evaluation.service";

import {RejectEvaluationFormComponent} from "../../components/reject-evaluation-form/reject-evaluation-form.component";
import {BiddingStatus} from "../../../../../shared/enums/bidding-status.enum";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";
import {LoaderService} from "../../../../../shared/services/loader";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {Page} from "../../../../../shared/objects/page";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {ApplicationStatusEnum} from "../../../../../shared/enums/application-status.enum";
import {
    ProcessFilesCreateComponent
} from '../../../../shared/components/process-files/process-files-create/process-files-create.component';

@Component({
    selector: 'app-evaluation-details-list-page',
    templateUrl: './evaluation-details-list-page.component.html',
    styleUrl: './evaluation-details-list-page.component.scss'
})
export class EvaluationDetailsListPageComponent {

    public readonly biddingLoaderId: string = UuidHelper.get();
    public readonly filterLoaderId: string = UuidHelper.get();
    public readonly viewPageUrl: string = `/private/admin/evaluation/pages/evaluation-details/view`;
    public readonly dialogHeaderCreate = 'Nuevo documento';
    private readonly currentPage = `/private/admin/evaluation/pages/evaluation-details`;

    @ViewChild('table') table: Table;

    model: Page<ApplicationResponseDto>;

    public modelIn = (model: ApplicationResponseDto) => model;

    id: string = this.activatedRoute.snapshot.params['id'];
    idBali: string = this.activatedRoute.snapshot.queryParams['idBali'];

    ref: DynamicDialogRef | undefined;

    filters: Filter[];

    constructor(private service: EvaluationService,
                public loaderService: LoaderService,
                private dialogService: DialogService,
                private breadcrumbService: BreadcrumbService,
                private message: DefaultSystemMessagesService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.loaderService.loading[this.filterLoaderId] = true;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsStatusHelper(this.id)), this.biddingLoaderId);
        await this.initializeFilters();
        const bidding = await this.loaderService.activateLoader(() => lastValueFrom( this.service.getById(this.id)), this.biddingLoaderId);
        this.updateBreadcrumbByUrl(bidding.idBali);
    }

    updateBreadcrumbByUrl(idBali: string) {
        this.breadcrumbService.updateBreadcrumbByUrl(`${this.currentPage}/${this.id}`, idBali);
    }

    async view(model: ApplicationResponseDto) {
        await this.router.navigate([`${this.viewPageUrl}/${this.id}/${model.id}`],  {
            queryParams: {
                organizationId: model.organizationId,
                managerId: model.managerId,
            }
        } );
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsStatusHelper(this.id)), this.biddingLoaderId);
        });
    }

    addDocument(): void {
        this.ref = this.dialogService.open(ProcessFilesCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '700px',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
                biddingId: this.id
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
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsStatusHelper(this.id)), this.biddingLoaderId);
        });
    }

    filterProcess($event: any): void {
        if ($event?.applicationDateBegin) {
            const applicationDateEnd = $event?.applicationDateBegin.split(',')[1];
            $event.applicationDateBegin = $event?.applicationDateBegin.split(',')[0];

            $event = {
                applicationDateEnd: applicationDateEnd,
                ...$event
            }
        }

        this.filter($event);
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsStatusHelper(this.id)), this.biddingLoaderId);
        });
    }

    cancel() {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(RejectEvaluationFormComponent, {
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

    async initializeFilters() {
        const options = await lastValueFrom(this.service.filterOptions());
        await this.initializeFiltersLoaded(options);
        this.loaderService.loading[this.filterLoaderId] = false;
    }

    async initializeFiltersLoaded(options: any) {
        const status = GeneralHelper.enumToList(ApplicationStatusEnum, 'key', 'value') || [];;

        // process
        this.filters = [
            {
                base: true,
                fields: [
                    {
                        term: 'Buscar por ID de inscripción o razón social',
                        type: 'text',
                        name: 'search',
                        label: 'Buscar por ID de inscripción o razón social',
                    },
                ]
            },
            {
                title: 'Fecha de inscripción',
                fields: [
                    {
                        term: 'Fecha de inicio de presentación de ofertas',
                        type: 'date',
                        name: 'applicationDateBegin',
                        label: 'Fecha de inicio de presentación de ofertas',
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
                        term: 'Status',
                        type: 'multiselect-checkbox',
                        name: 'status',
                        label: 'Estado',
                        options: status.map((s: any) => {
                                return {
                                    key: s.value,
                                    label: s.key
                                }
                            }
                        )
                    },
                ]
            },
        ];
    }

    // list all actions, it does not matter the role, if admin or manager
    async action(item: any, applicationResponseDto: ApplicationResponseDto) {
        switch (ApplicationStatusEnum[item.id]) {
            case ApplicationStatusEnum.REFUSED:
                const response: any = await this.cancel();
                if (response) {
                    await this.loaderService.activateLoader(() => lastValueFrom(this.service.reject(applicationResponseDto.bidding.id, applicationResponseDto.id, response?.description, response?.allowToAppeal)), this.biddingLoaderId);
                    this.message.success();
                    await this.ngOnInit();
                }
                return;
            case ApplicationStatusEnum.APPROVED:
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.approve(applicationResponseDto.bidding.id, applicationResponseDto.id,)), this.biddingLoaderId);
                this.message.success();
                await this.ngOnInit();
                return;
            case ApplicationStatusEnum.PENDING:  // perhaps it would be appeal?
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.pending(applicationResponseDto.bidding.id, applicationResponseDto.id,)), this.biddingLoaderId);
                this.message.success();
                await this.ngOnInit();
                return;
        }
    }

    protected readonly biddingType = BiddingStatus;

}
