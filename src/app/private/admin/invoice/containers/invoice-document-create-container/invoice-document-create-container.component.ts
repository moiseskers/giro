import {Component} from '@angular/core';
import {LoaderService} from '../../../../../shared/services/loader';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {NGXLogger} from 'ngx-logger';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-invoice-document-create-container',
    templateUrl: './invoice-document-create-container.component.html',
    styleUrl: './invoice-document-create-container.component.scss'
})
export class InvoiceDocumentCreateContainerComponent {

    loaderId = UuidHelper.get();
    invoiceId: string = this.config.data.invoiceId;

    constructor(
        public config: DynamicDialogConfig,
        private service: AdminInvoiceService,
        public dynamicDialogRef: DynamicDialogRef,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        private log: NGXLogger,
        public loaderService: LoaderService) {
        if (!this.invoiceId) throw new Error('invoiceId cannot be null');
    }

    async save($event: DocumentRequestDto[]) {
        this.log.info('DocumentOutModel ', $event)
        await this.loaderService.activateLoader(() =>
            Promise.all(
                $event.map(async value => await lastValueFrom(this.service.saveDownload(this.invoiceId, value)))
            ), this.loaderId);
        this.defaultSystemMessagesService.success();
        this.dynamicDialogRef.close(true);
    }
}
