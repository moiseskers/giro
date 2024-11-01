import {Table} from 'primeng/table';
import {SortMeta} from 'primeng/api';
import {SortHelper} from './sort.helper';
import {EventEmitter} from '@angular/core';

// DO not use this method without adding [lazy]="true" at the source table
export class QueryTableSorterHelper {

    public static getAllSortParametersHelper(): string[] {
        let params: any = {};
        window.location.search.substring(1).split('&').forEach((pair: any) => {
            pair = pair.split('=');
            if (pair[1] !== undefined) {
                let key = decodeURIComponent(pair[0]);
                let val = decodeURIComponent(pair[1]);
                val = val ? val.replace(/\++/g, ' ').trim() : '';

                if (key.length === 0) {
                    return;
                }
                if (params[key] === undefined) {
                    params[key] = val;
                } else {
                    if ("function" !== typeof params[key].push) {
                        params[key] = [params[key]];
                    }
                    params[key].push(val);
                }
            }
        });
        if (params?.sort) {
            return !Array.isArray(params?.sort) ? [...[params?.sort]] : params?.sort;
        }
        return null;
    }

    // DO not use this method without adding [lazy]="true" at the source table
    public static init(tableInstance: Table): EventEmitter<any> {
        const onSort = new EventEmitter();
        tableInstance.customSort = true;
        tableInstance.sortMode = "multiple";

        if (tableInstance && (tableInstance instanceof Table)) {
            const sortParametersFromUrl = QueryTableSorterHelper.getAllSortParametersHelper();
            if (sortParametersFromUrl) {
                let buildDefaultParametersFromUrlToSortMeta: SortMeta[];
                buildDefaultParametersFromUrlToSortMeta = sortParametersFromUrl.map(value => {
                    const valueSplit = value?.split('.');
                    const field = valueSplit[0];
                    const order = valueSplit[1] == 'asc' ? 1 : -1;
                    return {field: field, order: order};
                });
                tableInstance.multiSortMeta = buildDefaultParametersFromUrlToSortMeta;
                tableInstance.sortMultiple();
            }

            tableInstance.onSort.subscribe(value => {
                onSort.emit(value?.multisortmeta)
                return onSort;
            });
        } else {
            throw new Error(QueryTableSorterHelper.errorMessage());
        }
        return onSort;
    }

    public static errorMessage(): string {
        return `
            <p>Please provide a valid instance of the datatable from <strong>prime ng.</strong></p>
            <p><strong>For example:</strong></p>
            <p>At the component that this lib is being used add:</p>
            <p><strong> @ViewChild('table') table: Table; </strong> then in the html:</p>
            <p>at the <strong>app-prime-ng-table-sort-helper</strong>, add the argument [table]="table"</p>
        `;
    }

    public static clear(op: any, tableInstance: Table): void {
        op.hide();
        SortHelper.removeAllSortsParamsAtCurrentUrl();
        tableInstance.multiSortMeta = [];
        tableInstance.sortMultiple();
    }

    public static clearV2(tableInstance: Table): void {
        SortHelper.removeAllSortsParamsAtCurrentUrl();
        tableInstance.multiSortMeta = [];
        tableInstance.sortMultiple();
    }
}
