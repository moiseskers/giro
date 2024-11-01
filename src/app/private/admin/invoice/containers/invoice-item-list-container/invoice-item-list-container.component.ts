import {Component, Input} from '@angular/core';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LoaderService} from '../../../../../shared/services/loader';
import {InvoiceItemResponseDto} from '../../../../../shared/models/invoice-item-response.dto';
import {Page} from '../../../../../shared/objects/page';

@Component({
    selector: 'app-invoice-item-list-container',
    templateUrl: './invoice-item-list-container.component.html',
    styleUrl: './invoice-item-list-container.component.scss'
})
export class InvoiceItemListContainerComponent {

    @Input() invoiceId: string;
    loaderId: string = UuidHelper.get();
    model: Page<InvoiceItemResponseDto>;

    constructor(private service: AdminInvoiceService, protected loaderService: LoaderService) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getItems(this.invoiceId)), this.loaderId);
    }

    async sortEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getItems(this.invoiceId, $event)), this.loaderId);
    }
}
