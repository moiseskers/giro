import {Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {AppCrudListQueryParametersHelper} from "../../helpers/app-crud-list-query-parameters.helper";
import {Table} from "primeng/table";
import {Paginator} from 'primeng/paginator';

@Component({
    selector: 'app-paginator',
    template: `
        <p-paginator
                #p
                [rows]="this.rows"
                     [first]="(this.page  - 1) * this.rows"
                     [totalRecords]="totalElements"
                     [rowsPerPageOptions]="rowsPerPageOptions"
                     (onPageChange)="onPageChange($event)">
        </p-paginator>
    `
})
export class AppPaginatorComponent {

    @Input()
    first: number = 0;

    @Input() totalElements: number = 0;
    @Input() rowsPerPageOptions = [10, 20, 30, 50, 100, 250, 500, 750, 1000];

    @Input() pageSizeParamName = 'itemsPerPage';
    @Input() pageParamName = 'pageIndex';

    @Input() rows: number;
    @Input() page: number;

    @Output() pageFunction = new EventEmitter();

    @Input() table: Table;

    _appCrudListQueryParametersHelper: AppCrudListQueryParametersHelper;

    showPaginator: boolean = true;

    @ViewChild('p', {static: false}) paginator: Paginator;

    constructor(private injector: Injector) {
        this._appCrudListQueryParametersHelper = new AppCrudListQueryParametersHelper(injector);
    }

    ngDoCheck(): void {
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(new URL(currentUrl).search);
        const pageIndex = urlParams.get(this.pageSizeParamName);
        const itemsPerPage = urlParams.get(this.pageParamName);

        this.rows = parseInt(pageIndex) || this.rowsPerPageOptions[0];
        this.page = parseInt(itemsPerPage) || 1;
    }

    onPageChange($event: any) {

        $event.page = $event.page + 1;
        this.page = $event.page

        // this.page = ($event?.first / $event?.rows);
        this.rows = $event?.rows;

        let output = {
            [this.pageParamName]: this.page?.toString(),
            [this.pageSizeParamName]: this.rows?.toString()
        }

        this.pageFunction.emit(output);
    }
}
