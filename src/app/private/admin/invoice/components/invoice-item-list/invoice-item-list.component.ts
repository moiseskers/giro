import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from '../../../../../shared/objects/page';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {LoaderService} from '../../../../../shared/services/loader';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {TableModule} from 'primeng/table';
import {InvoiceItemResponseDto} from '../../../../../shared/models/invoice-item-response.dto';
import {AppViewDataComponent} from '../../../../../shared/components/app-view-data/app-view-data.component';
import {CheckEmptyPipe} from '../../../../../shared/pipes/check-empty/check-empty.pipe';
import {GiroDataViewComponent} from '../../../../../shared/components/giro-menu-bar/giro-data-view.component';
import {SkeletonModule} from 'primeng/skeleton';

@Component({
    selector: 'app-invoice-item-list',
    templateUrl: './invoice-item-list.component.html',
    styleUrl: './invoice-item-list.component.scss',
    imports: [
        TableModule,
        DecimalPipe,
        AppViewDataComponent,
        CheckEmptyPipe,
        DatePipe,
        GiroDataViewComponent,
        NgIf,
        SkeletonModule,
    ],
    standalone: true,
    providers: []
})
export class InvoiceItemListComponent {

    @Input() model: Page<InvoiceItemResponseDto>;
    @Input() isLoading: boolean = false;

    @Output() sortEvent = new EventEmitter();

    modelIn = (model: InvoiceItemResponseDto) => model;

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(
        private decimalPipe: DecimalPipe,
        public loaderService: LoaderService) {
    }

    get totalQuantity() {
        return this.model?.meta?.totalAmount;
    }

    get quantity() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalQuantity) ? this.decimalPipe.transform(this.model?.meta?.totalQuantity, '1.0-2') + ' kg' : ''
    }

    get netValue() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalNetValue) ? this.decimalPipe.transform(this.model?.meta?.totalNetValue, '1.2-2') + ' CLP' : ''
    }

    get iva() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalTaxes) ? this.decimalPipe.transform(this.model?.meta?.totalTaxes, '1.2-2') + ' CLP' : ''
    }

    get withholdingTaxes() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalWithholdingTaxes) ? this.decimalPipe.transform(this.model?.meta?.totalWithholdingTaxes, '1.2-2') + ' CLP' : ''
    }

    get totalAmount () {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalAmount) ? this.decimalPipe.transform(this.model?.meta?.totalAmount, '1.2-2') + ' CLP' : ''
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }
}
