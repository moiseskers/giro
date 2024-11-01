import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Table} from 'primeng/table';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {QueryTableSorterHelper} from '../../helpers/query-table-sorter-helper';
import {AppButtonModule} from '../button/button';
import {SortMeta} from 'primeng/api/sortmeta';

@Component({
    selector: 'app-prime-ng-table-sort-helper-v2',
    template: `
        <app-p-button [link]="true" [style]="{ 'color': 'var(--surface-200)' }" materialIcon="cancel" [outlined]="true" iconPos="right" label="Limpiar filtro" (click)="clear()"></app-p-button>
    `,
    standalone: true,
    imports: [
        AppButtonModule
    ]
})
export class PrimeNgTableSortHelperV2Component {

    @Input() table: Table;
    @Output() sortEvent = new EventEmitter();

    datatableLoadedListener: BehaviorSubject<boolean>;
    alreadyLoaded = false;

    @Output() clearAllFilterEvent = new EventEmitter();


    ngAfterViewInit(): void {

        // if (!this.table) {
        //     throw new Error('app-prime-ng-table-sort-helper table attribute must not be null!!')
        // }

        this.datatableLoadedListener.pipe(filter(value => value))
            .subscribe(() => {
                QueryTableSorterHelper.init(this.table).subscribe(value => {
                    if (value.length != 0) {
                        this.sortEvent.emit(value);
                    }
                });
            });
    }

    ngOnInit(): void {
        this.datatableLoadedListener = new BehaviorSubject<boolean>(false);
    }

    ngDoCheck(): void {
        if (this.table) {
            if (!this.alreadyLoaded) {
                this.alreadyLoaded = true;
                this.datatableLoadedListener.next(true);
            }
        }
    }

    clear(): void {
        QueryTableSorterHelper.clearV2(this.table);
        this.clearAllFilterEvent.emit();
    }

    ngOnDestroy(): void {
        this.datatableLoadedListener.unsubscribe();
    }

    sortEventFunction($event: SortMeta[]) {
        const sortValues = $event.map(v => {
            const order = v.order == -1 ? 'desc' : 'asc'
            return `${v.field}.${order}`
        }).join(',');

        const sort = {
            sort: sortValues
        };
        this.sortEvent.emit(sort);
    }

}
