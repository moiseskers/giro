import {Component, ViewChild} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {Table} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {Page} from "../../../../../shared/objects/page";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {FilterHelper} from "../../../../../shared/helpers/filter.helper";
import {AppPaginatorComponent} from "../../../../../shared/components/app-paginator";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {SortHelper} from "../../../../../shared/helpers/sort.helper";
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {NGXLogger} from 'ngx-logger';
import {MatchingService} from '../../../../shared/services/matching.service';
import {MatchingResponseDto} from '../../../../../shared/models/matching-response.dto';
import {MenuItem} from 'primeng/api';
import {
    MatchingCreateContainerComponent
} from '../../containers/matching-create-container/matching-create-container.component';
import {MatchingType} from '../../../../../shared/types/matching.type';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {CategoryTypeEnum} from '../../../../../shared/enums/category-type.enum';
import {
    MatchingSimulateContainerComponent
} from '../../containers/matching-create-simulate/matching-simulate-container.component';

@Component({
    selector: 'app-matching-list',
    templateUrl: './matching-list-page.component.html',
    styleUrl: './matching-list-page.component.scss'
})
export class MatchingListPageComponent {

    public readonly tableLoaderId: string = UuidHelper.get();
    public readonly downloadAllLoaderId: string = UuidHelper.get();
    public downloadLoaderId: string[] = [];

    public readonly viewPageUrl: string = `${location.pathname}/view`;

    readonly dialogHeaderCreate = 'Hacer matching';

    @ViewChild('table') table: Table;
    @ViewChild('paginator') paginatorRef: AppPaginatorComponent;

    model: Page<MatchingResponseDto>;
    ref: DynamicDialogRef;

    public modelIn = (model: MatchingResponseDto) => model;

    menuItems: MenuItem[] = [
        {
            id: 'DOWNLOAD',
            label: 'Descargar'
        }
    ];

    constructor(private service: MatchingService,
                public loaderService: LoaderServiceV2,
                private dialogService: DialogService,
                private router: Router,
                private log: NGXLogger,) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId);
    }

    async view(model: MatchingResponseDto) {
        const code = encodeURIComponent(model.code);
        const subcategoryId = encodeURIComponent(model.subcategoryId);

        this.log.info(`${this.viewPageUrl}/${code}/${subcategoryId}`);

        await this.router.navigate([`${this.viewPageUrl}`], {
            queryParams: { code: code, subcategoryId: subcategoryId }
        });
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId);
        });
    }

    filter($event: any): void {
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get()), this.tableLoaderId)
        });
    }

    async match(item:  MatchingType) {

        if (item === 'MATCHING') {
            this.ref = this.dialogService.open(MatchingCreateContainerComponent, {
                header: this.dialogHeaderCreate,
                width: '40vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });
        }

        if (item === 'SIMULATION') {
            this.ref = this.dialogService.open(MatchingSimulateContainerComponent, {
                header: this.dialogHeaderCreate,
                width: '40vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });
        }

        this.ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
            }
        });

    }

    async download(index: number, model: MatchingResponseDto) {
        this.downloadLoaderId[index] = UuidHelper.get();
        const response = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(model.id, model.attachmentId)), this.downloadLoaderId[index]);
        window.open(response?.signedUrl, '_blank');
    }

    async downloadAll() {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.downloadAll()), this.downloadAllLoaderId);
    }

    viewButtonDisabled(code: string | undefined, subcategoryId: string | undefined) {
        return GeneralHelper.isEmptyOrUndefinedOrNull(code, subcategoryId);
    }

    protected readonly CategoryTypeEnum = CategoryTypeEnum;
}

