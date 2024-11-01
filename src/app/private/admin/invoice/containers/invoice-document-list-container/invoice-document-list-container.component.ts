import {Component, Input} from '@angular/core';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {lastValueFrom} from 'rxjs';
import {Page} from '../../../../../shared/objects/page';
import {LoaderService} from '../../../../../shared/services/loader';
import {DocumentResponseDto} from '../../../../../shared/models/document-response.dto';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    InvoiceDocumentCreateContainerComponent
} from '../invoice-document-create-container/invoice-document-create-container.component';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';

@Component({
  selector: 'app-invoice-document-list-container',
  templateUrl: './invoice-document-list-container.component.html',
  styleUrl: './invoice-document-list-container.component.scss'
})
export class InvoiceDocumentListContainerComponent {

    @Input() invoiceId: string;

    model: Page<DocumentResponseDto>;
    public loaderId: string = UuidHelper.get();
    private readonly dialogHeaderEdit: string = 'Nuevo documento';

    constructor(
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private dynamicDialogRef: DynamicDialogRef,
        private service: AdminInvoiceService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDownloads(this.invoiceId, null)), this.loaderId);
    }

    async downloadEvent(id: string | undefined) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDownload(this.invoiceId, id)), this.loaderId);
        window.open(response?.signedUrl, '_blank');
    }

    async pageEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDownloads(this.invoiceId, $event)), this.loaderId);
    }

    newEvent() {
        this.dynamicDialogRef = this.dialogService.open(InvoiceDocumentCreateContainerComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                invoiceId: this.invoiceId
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

    async deleteEvent($event: any) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.deleteDownload(this.invoiceId, $event)), this.loaderId);
        await this.ngOnInit();
    }
}
