import {Component, ViewChild} from '@angular/core';
import {InvoiceStatus} from '../../../../../shared/enums/invoice-status';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {LoaderService} from '../../../../../shared/services/loader';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import {InvoiceDataContainerComponent} from '../../containers/invoice-data-container/invoice-data-container.component';
import {InvoiceEditContainerComponent} from '../../containers/invoice-edit-container/invoice-edit-container.component';
import {MenuItem} from 'primeng/api';
import {AdminInvoiceService} from '../../services/admin-invoice.service';
import {lastValueFrom} from 'rxjs';
import {BreadcrumbService} from '../../../../../shared/services/breadcrumb';
import {
    InvoiceItemListContainerComponent
} from '../../containers/invoice-item-list-container/invoice-item-list-container.component';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.scss'
})
export class InvoiceViewComponent {

    protected readonly InvoiceStatus = InvoiceStatus;
    model: InvoiceResponseDto;
    public modelIn = (model: InvoiceResponseDto) => model;

    changeStatusLoaderId: string = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['id'];
    private dialogHeaderEdit: string = 'Editar factura';

    @ViewChild(InvoiceDataContainerComponent)     invoiceDataContainerComponent!: InvoiceDataContainerComponent;
    @ViewChild(InvoiceItemListContainerComponent) invoiceItemListContainerComponent!: InvoiceItemListContainerComponent;

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderService,
        private service: AdminInvoiceService,
        private dialogService: DialogService,
        private breadcrumbService: BreadcrumbService) {
    }

    async action(item: MenuItem, id: string) {
        if (InvoiceStatus[item.id] === InvoiceStatus.REFUSED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.inactive(id)), this.changeStatusLoaderId);
            await this.invoiceDataContainerComponent.ngOnInit();
        }

        if (InvoiceStatus[item.id] === InvoiceStatus.APPROVED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.active(id)), this.changeStatusLoaderId);
            await this.invoiceDataContainerComponent.ngOnInit();
        }
    }

    edit() {
        const ref = this.dialogService.open(InvoiceEditContainerComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                model: this.model
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.invoiceDataContainerComponent.ngOnInit();
                await this.invoiceItemListContainerComponent.ngOnInit();
            }
        });
    }

    modelEvent($event: InvoiceResponseDto) {
        this.model = $event;
        this.updateBreadcrumbByUrl(this.model.invoiceNumber);
    }

    updateBreadcrumbByUrl(input: string) {
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, input);
    }

}
