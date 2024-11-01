import {Component, ViewChild} from '@angular/core';
import {Filter} from '../../../../../shared/components/app-filter/models/filter';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {FilterHelper} from '../../../../../shared/helpers/filter.helper';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {Page} from '../../../../../shared/objects/page';
import {Table} from 'primeng/table';
import {lastValueFrom} from 'rxjs';
import {SortHelper} from '../../../../../shared/helpers/sort.helper';
import {ManagerInvoiceService} from '../../services/manager-invoice.service';
import {PaginatorHelper} from '../../../../../shared/helpers/paginator.helper';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    ManagerInvoiceDocumentCreateContainerComponent
} from '../../containers/manager-invoice-document-create-container/manager-invoice-document-create-container.component';
import {ProfileService} from '../../../../../shared/services/auth/profile.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-manager-invoice-list-page',
    templateUrl: './manager-invoice-list-page.component.html',
    styleUrl: './manager-invoice-list-page.component.scss'
})
export class ManagerInvoiceListPageComponent {

    @ViewChild(Table) table: Table;

    model: Page<InvoiceResponseDto>;
    modelIn = (model: InvoiceResponseDto) => model;
    loaderId: string = UuidHelper.get();
    downloadLoaderId: string[] = [];
    private dialogHeaderEdit: string = 'Nueva factura';
    private organizationId: string;

    constructor(
        private dynamicDialogRef: DynamicDialogRef,
        private service: ManagerInvoiceService,
        private dialogService: DialogService,
        private profileService: ProfileService,
        public loaderService: LoaderServiceV2) {}

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.organizationId)), this.loaderId);
    }

   async download(id: string, rowIndex: any) {
       this.downloadLoaderId[rowIndex] = UuidHelper.get();
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDownloads(id)), this.downloadLoaderId[rowIndex]);
    }

    page($event: any) {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.organizationId)), this.loaderId);
        });
    }

    filter($event: any): void {
        $event = FilterHelper.filterRangeDate($event, 'createdAtBegin', 'createdAtEnd');
        FilterHelper.filter($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.organizationId)), this.loaderId);
        });
    }

    sort($event: any): void {
        SortHelper.sort($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getStatusHelper(this.organizationId)), this.loaderId);
        });
    }

    actionButtonEvent() {
        this.dynamicDialogRef = this.dialogService.open(ManagerInvoiceDocumentCreateContainerComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.dynamicDialogRef.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
            }
        });
    }

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por ID de factura',
                },
            ]
        },
        {
            title: 'Fecha de envío',
            fields: [
                {
                    type: 'date',
                    name: 'createdAtBegin',
                    placeholder: '--/--/---- - --/--/----',
                    config: {
                        selectionMode: 'range'
                    },
                },
            ]
        },
    ];
}
