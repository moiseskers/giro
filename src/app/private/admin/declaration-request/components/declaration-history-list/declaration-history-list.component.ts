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
import {SortHelper} from "../../../../../shared/helpers/sort.helper";

@Component({
  selector: 'app-declaration-history-list',
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
  templateUrl: './declaration-history-list.component.html',
  styleUrl: './declaration-history-list.component.scss'
})
export class DeclarationHistoryListComponent {

    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter();
    @Output() downloadEvent: EventEmitter<any> = new EventEmitter();

    filterHistory: any;

    public modelIn = (model: DeclarationHistoryResponseDto) => model;

    @Input()
    data: Page<DeclarationHistoryResponseDto>;

    page($event: any): void {
        this.filterHistory = {...$event, ...this.filterHistory}
        this.pageEvent.emit($event);
    }

    download(audit: string): void {
        this.downloadEvent.emit(audit);
    }

    sort($event: any) {
        $event = SortHelper.getSortObject($event);
        this.filterHistory = {...$event, ...this.filterHistory}
        this.sortEvent.emit($event);
    }
}
