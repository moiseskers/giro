import {Component, ViewChild} from '@angular/core';
import {LoaderService} from "../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {CigStatus} from "../../../../../shared/enums/cig-status";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {Page} from "../../../../../shared/objects/page";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {Table} from "primeng/table";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {lastValueFrom} from "rxjs";
import {CigService} from "../../services/cig.service";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {DialogService} from "primeng/dynamicdialog";
import {CigCreateContainerComponent} from "../../containers/cig-create-container/cig-create-container.component";
import {CigResponseDto} from "../../../../../shared/models/cig-response.dto";
import {BranchResponseDto} from "../../../../../shared/models/branch-response.dto";

@Component({
    selector: 'app-cig-list-page',
    templateUrl: './cig-list-page.component.html',
    styleUrl: './cig-list-page.component.scss'
})
export class CigListPageComponent {

    @ViewChild(Table) table: Table;

    saveLoaderId = UuidHelper.get();
    loaderId = UuidHelper.get();

    changeStatusLoader: any[] = [];

    dialogHeaderCreate = 'Nuevo CIG';
    protected readonly CigStatus = CigStatus;
    model: Page<CigResponseDto>;
    public modelIn = (model: CigResponseDto) => model;
    public branchModelIn = (model: BranchResponseDto) => model;

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    term: 'Buscar por ID CIG, razón social, RUT o ID',
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por ID CIG, razón social, RUT o ID',
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
                    options: GeneralHelper.enumToList(CigStatus, 'label', 'key')
                },
            ]
        },
    ];


    constructor(
        private dialogService: DialogService,
        private service: CigService,
        public loaderService: LoaderService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
    }

    async action(item: any, cig: CigResponseDto) {

        this.changeStatusLoader[cig.id] = UuidHelper.get();

        if (CigStatus[item?.id] == CigStatus.INACTIVE) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.inactive(cig.id)), this.changeStatusLoader[cig.id]);
            await this.ngOnInit();
            return;
        }
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.active(cig.id)), this.changeStatusLoader[cig.id]);
        await this.ngOnInit();
    }

    actionButtonEvent(): void {
        const ref = this.dialogService.open(CigCreateContainerComponent, {
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

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper()), this.loaderId);
        });
    }
}
