import {Component, Input} from '@angular/core';
import {InvoiceResponseDto} from '../../../../../shared/models/invoice-response.dto';
import {SkeletonModule} from 'primeng/skeleton';
import {GiroDataViewComponent} from '../../../../../shared/components/giro-menu-bar/giro-data-view.component';
import {AppViewDataComponent} from '../../../../../shared/components/app-view-data/app-view-data.component';
import {DatePipe, NgIf} from '@angular/common';
import {CheckEmptyPipe} from '../../../../../shared/pipes/check-empty/check-empty.pipe';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-invoice-data',
    templateUrl: './invoice-data.component.html',
    styleUrl: './invoice-data.component.scss',
    standalone: true,
    imports: [
        SkeletonModule,
        GiroDataViewComponent,
        AppViewDataComponent,
        NgIf,
        DatePipe,
        CheckEmptyPipe
    ]
})
export class InvoiceDataComponent {

    @Input()
    model: InvoiceResponseDto;

    @Input()
    isLoading: boolean = true;

    get getAddress() {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.address, this.model?.city)) {
            return `${this.model?.address}, ${this.model?.city}`;
        }
        return '-';
    }

}
