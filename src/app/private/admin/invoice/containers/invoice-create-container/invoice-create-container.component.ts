import {Component} from '@angular/core';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {NGXLogger} from 'ngx-logger';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {LoaderService} from '../../../../../shared/services/loader';
import {lastValueFrom} from 'rxjs';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {InvoiceRequestDto} from '../../../../../shared/models/invoice-request.dto';

@Component({
    selector: 'app-invoice-create-container',
    templateUrl: './invoice-create-container.component.html',
    styleUrl: './invoice-create-container.component.scss'
})
export class InvoiceCreateContainerComponent {

    public readonly loaderId = UuidHelper.get();

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        private message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        private service: AdminInvoiceService) {}

    async saveEvent($event: InvoiceRequestDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save($event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }

}

