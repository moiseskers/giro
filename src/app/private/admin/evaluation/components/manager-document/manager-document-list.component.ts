import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoaderService, LoaderServiceModule} from "../../../../../shared/services/loader";
import {Page} from "../../../../../shared/objects/page";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {DatePipe, NgIf} from "@angular/common";
import {BiddingDocumentResponseDto} from "../../../../../shared/models/bidding-document-response.dto";
import {SortMeta} from "primeng/api/sortmeta";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";

@Component({
    selector: 'app-manager-document-list',
    templateUrl: './manager-document-list.component.html',
    styleUrl: './manager-document-list.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        AppPaginatorModule,
        NgIf,
        DatePipe,
        LoaderServiceModule
    ]
})
export class ManagerDocumentListComponent {

    @Input()
    loaderId: string;

    @Input()
    public downloadLoaderId: string;

    @Input()
    managerDocumentListLoaderId: string;

    @Input()
    model: Page<ApplicationResponseDto>;

    @Input()
    biddingId: string;

    @Input()
    applicationId: string;

    filterHistoryHelper = new FilterHistoryHelper();

    public modelIn = (model: BiddingDocumentResponseDto) => model;

    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() downloadEvent: EventEmitter<any> = new EventEmitter();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter();

    constructor(public loaderService: LoaderService,) {}

    async page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }
    
    async download(id: string) {
        this.downloadEvent.emit(id);
    }

    sort($event: SortMeta) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }
}
