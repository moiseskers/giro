import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppFilterModule} from "../../../../../shared/components/app-filter";
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {TableModule} from "primeng/table";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {
    DeclarationRequestStatusesComponent
} from "../../../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {
    DeclarationStatusesComponent
} from "../../../../shared/components/declaration-statuses/declaration-statuses.component";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {MilligramsPipe} from '../../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-declaration-list',
    standalone: true,
    providers: [DecimalPipe, MilligramsPipe],
    imports: [
        AppFilterModule,
        TableModule,
        AppPaginatorModule,
        NgIf,
        ButtonModule,
        DeclarationRequestStatusesComponent,
        DatePipe,
        DecimalPipe,
        DeclarationStatusesComponent,
        MilligramsPipe
    ],
    templateUrl: './declaration-list.component.html',
    styleUrl: './declaration-list.component.scss'
})
export class DeclarationListComponent {

    @Input()
    loading: boolean = false;

    @Input()
    filters: Filter[];

    @Input()
    model: Page<DeclarationResponseDto>;

    @Output() sortEvent: EventEmitter<any> = new EventEmitter();
    @Output() filterEvent: EventEmitter<any> = new EventEmitter();
    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() viewEvent: EventEmitter<any> = new EventEmitter();

    constructor(private milligramsPipe: MilligramsPipe,) {}

    public modelIn = (model: DeclarationResponseDto) => model;

    filterHistoryHelper = new FilterHistoryHelper();

    page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    filter($event: any) {
        this.filterHistoryHelper.filter($event, async ($event: any) => {
            this.filterEvent.emit($event);
        });
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }

    view(id: string) {
        this.viewEvent.emit(id);
    }

    get totalWeightSum() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalTons) ? this.milligramsPipe.transform(this.model?.meta?.totalTons) + ' t' : ''
    }

    protected readonly DeclarationStatus = DeclarationStatus;
}
