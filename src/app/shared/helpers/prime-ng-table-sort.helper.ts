import {EventEmitter} from '@angular/core';
import {Table} from 'primeng/table';

import {QueryTableSorterHelper} from './query-table-sorter-helper';
import {GeneralHelper} from './general-helper';

export class PrimeNgTableSortHelper {

    public sortEvent = new EventEmitter();
    public table: Table;
    public stopCalling: boolean = false;
    public hasSort: boolean = false;

    public startUp(table: Table) {
        console.log('initializing PrimeNgTableSortHelper...');
        this.tableCheck(table)
    }

    private tableCheck(table: Table) {
        if (this.shouldStopTableCheck(table)) {
            this.table = table;
            this.stopCalling = true;
            this.hasSort = true;
            console.log('initialized PrimeNgTableSortHelper');
            QueryTableSorterHelper.init(this.table).subscribe(value => {
                if (value.length != 0) {
                    this.sortEvent.emit(value);
                }
            });
        }
    }

    private  shouldStopTableCheck(table: Table): boolean {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(table);
    }

    public clear(): void {
        QueryTableSorterHelper.clearV2(this.table);
    }

    // sortEventFunction($event: SortMeta[]) {
    //     const sortValues = $event.map(v => {
    //         const order = v.order == -1 ? 'desc' : 'asc'
    //         return `${v.field}.${order}`
    //     }).join(',');
    //
    //     const sort = {
    //         sort: sortValues
    //     };
    //     this.sortEvent.emit(sort);
    // }

}
