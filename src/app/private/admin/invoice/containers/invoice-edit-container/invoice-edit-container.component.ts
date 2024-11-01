import {Component} from '@angular/core';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NGXLogger} from 'ngx-logger';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {LoaderService} from '../../../../../shared/services/loader';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {InvoiceRequestDto} from '../../../../../shared/models/invoice-request.dto';
import {lastValueFrom} from 'rxjs';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';

@Component({
    selector: 'app-invoice-edit-container',
    templateUrl: './invoice-edit-container.component.html',
    styleUrl: './invoice-edit-container.component.scss'
})
export class InvoiceEditContainerComponent {

    model: InvoiceResponseDto = this.dynamicDialogConfig.data.model;
    id: string = this.dynamicDialogConfig.data.model.id;

    public readonly loaderId = UuidHelper.get();

    constructor(
        public dynamicDialogConfig: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        private message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        private service: AdminInvoiceService) {
    }

    async saveEvent($event: InvoiceRequestDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.id, $event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }
}
