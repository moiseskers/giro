import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {LoaderService} from '../../../../../shared/services/loader';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';

@Component({
    selector: 'app-invoice-data-container',
    templateUrl: './invoice-data-container.component.html',
    styleUrl: './invoice-data-container.component.scss'
})
export class InvoiceDataContainerComponent {

    @Input() invoiceId: string;
    model: InvoiceResponseDto;
    loaderId: string = UuidHelper.get();

    @Output() modelEvent: EventEmitter<InvoiceResponseDto> = new EventEmitter();

    constructor(
        public loaderService: LoaderService,
        private service: AdminInvoiceService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getByIdStatusHelper(this.invoiceId)), this.loaderId);
        this.modelEvent.emit(this.model);
    }

}

