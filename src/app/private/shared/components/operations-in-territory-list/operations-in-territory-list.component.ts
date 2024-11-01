import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AppPaginatorComponent, AppPaginatorModule} from '../../../../shared/components/app-paginator';
import {Button} from 'primeng/button';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {LoaderServiceModule} from '../../../../shared/services/loader';
import {PrimeTemplate} from 'primeng/api';
import {Table, TableModule} from 'primeng/table';
import {Page} from '../../../../shared/objects/page';
import {ResponseCityDto} from '../../../../shared/models/response-city.dto';
import {FilterHistoryHelper} from '../../../../shared/helpers/filter-history.helper';

@Component({
    selector: 'app-operations-in-territory-list',
    templateUrl: './operations-in-territory-list.component.html',
    styleUrl: './operations-in-territory-list.component.scss',
    imports: [
        AppPaginatorModule,
        Button,
        DatePipe,
        LoaderServiceModule,
        NgIf,
        PrimeTemplate,
        TableModule,
        DecimalPipe
    ],
    standalone: true
})
export class OperationsInTerritoryListComponent {

    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    isLoading: boolean = true;

    @ViewChild('table') table: Table
    @ViewChild('p', {static: false}) paginator: AppPaginatorComponent;


    @Input()
    model: Page<ResponseCityDto>;
    filterHistoryHelper = new FilterHistoryHelper();

    public modelIn = (model: ResponseCityDto) => model;

    currentId = null;

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }

    page($event: any): void {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    reset() {
        this.table.sortOrder = 0;
        this.table.sortField = '';
        if (this?.paginator?.paginator)
            this.paginator.paginator.changePage(0) ;

        this.table.reset();
    }

    // ngOnChanges(): void {
    //     if (this.currentId !== this.id) {
    //         this.reset();
    //         this.currentId = this.id;
    //     }
    // }
}
