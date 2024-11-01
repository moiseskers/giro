import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {DeclarationRequestRecurrence} from "../../../../shared/enums/declaration-request-recurrence";
import {DeclarationResponseDto} from "../../../../shared/models/declaration-response.dto";
import {DatePipe, DecimalPipe, NgIf, TitleCasePipe} from "@angular/common";
import {DeclarationStatus} from "../../../../shared/enums/declaration-status";
import {DeclarationStatusesComponent} from "../declaration-statuses/declaration-statuses.component";
import {ButtonModule} from "primeng/button";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {Page} from "../../../../shared/objects/page";
import {AppPaginatorModule} from "../../../../shared/components/app-paginator";
import {CheckEmptyPipe} from "../../../../shared/pipes/check-empty/check-empty.pipe";
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';
import {FilterHistoryHelper} from '../../../../shared/helpers/filter-history.helper';
import {AppFilterModule} from '../../../../shared/components/app-filter';

@Component({
    selector: 'app-backyard-declaration-request-list',
    templateUrl: './backyard-declaration-request-list.component.html',
    styleUrl: './backyard-declaration-request-list.component.scss',
    standalone: true,
    imports: [
        TableModule,
        NgIf,
        DatePipe,
        TitleCasePipe,
        DeclarationStatusesComponent,
        ButtonModule,
        DecimalPipe,
        AppPaginatorModule,
        CheckEmptyPipe,
        MilligramsPipe,
        AppFilterModule
    ]
})
export class BackyardDeclarationRequestListComponent {

    @Input() public model: Page<DeclarationResponseDto>;

    @Input() loading: boolean = true;

    @Output() pageEvent = new EventEmitter();
    @Output() viewEvent = new EventEmitter();
    @Output() sortEvent = new EventEmitter();

    public modelIn = (model: DeclarationResponseDto) => model;

    protected readonly DeclarationRequestRecurrence = DeclarationRequestRecurrence;
    protected readonly DeclarationStatus = DeclarationStatus;

    @ViewChild('table') table: Table;

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(private milligramsPipe: MilligramsPipe) {}

    get totalTons() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalTons) ? this.milligramsPipe.transform(this.model?.meta?.totalTons) + ' t' : ''
    }

    view(id: string) {
        this.viewEvent.emit(id);
    }

    page($event: any) {
        this.pageEvent.emit($event);
    }

    sort($event: any) {
        this.sortEvent.emit($event);
    }

}
