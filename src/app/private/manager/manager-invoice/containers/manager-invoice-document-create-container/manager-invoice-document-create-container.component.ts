import {Component} from '@angular/core';
import {LoaderService} from '../../../../../shared/services/loader';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {NGXLogger} from 'ngx-logger';
import {ManagerInvoiceService} from '../../services/manager-invoice.service';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-manager-invoice-document-create-container',
    templateUrl: './manager-invoice-document-create-container.component.html',
    styleUrl: './manager-invoice-document-create-container.component.scss',
    providers: [ManagerInvoiceService]
})
export class ManagerInvoiceDocumentCreateContainerComponent {

    loaderId = UuidHelper.get();
    organizationId: string = this.config.data.organizationId;

    constructor(
        public config: DynamicDialogConfig,
        private service: ManagerInvoiceService,
        public dynamicDialogRef: DynamicDialogRef,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        private log: NGXLogger,
        public loaderService: LoaderService) {
        if (!this.organizationId) throw new Error('invoiceId cannot be null');
    }

    async save($events: DocumentRequestDto[]) {
        const event = $events[0];
        this.log.info('DocumentOutModel ', event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(this.organizationId, event)), this.loaderId);
        this.defaultSystemMessagesService.success();
        this.dynamicDialogRef.close(true);
    }
}
