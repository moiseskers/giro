import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppFilterModule} from "../../../../../shared/components/app-filter";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {
    DeclarationRequestStatusesComponent
} from "../../../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationHistoryResponseDto} from "../../../../../shared/models/declaration-history-response.dto";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";

@Component({
  selector: 'app-backyard-declaration-history-list',
  standalone: true,
    imports: [
        AppFilterModule,
        AppPaginatorModule,
        ButtonModule,
        DatePipe,
        DecimalPipe,
        DeclarationRequestStatusesComponent,
        NgIf,
        SharedModule,
        TableModule
    ],
  templateUrl: './backyard-declaration-history-list.component.html',
  styleUrl: './backyard-declaration-history-list.component.scss'
})
export class BackyardDeclarationHistoryListComponent {

    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter();
    @Output() downloadEvent: EventEmitter<any> = new EventEmitter();

    public modelIn = (model: DeclarationHistoryResponseDto) => model;

    @Input()
    data: Page<DeclarationHistoryResponseDto>;

    filterHistoryHelper = new FilterHistoryHelper();

    page($event: any): void {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    download(audit: string): void {
        this.downloadEvent.emit(audit);
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }
}
