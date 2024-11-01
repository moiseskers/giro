import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Table} from 'primeng/table';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {QueryTableSorterHelper} from '../../helpers/query-table-sorter-helper';

@Component({
    selector: 'app-prime-ng-table-sort-helper',
    template: `
        <p-overlayPanel #op [showCloseIcon]="true">
            <ng-template pTemplate>
                <p style="width: 200px">Para ordenar por múltiplas colunas mantenha pressionado a tecla CTRL e então utilize o clique esquerdo do mouse para selecionar as colunas desejadas.</p>
                <p-checkbox *ngIf="_getAllSortParametersHelper" label="Limpar Ordenações" (onChange)="clear(op)" [binary]="true"></p-checkbox>
            </ng-template>
        </p-overlayPanel>
        
        <app-p-button [link]="true" severity="secondary" materialIcon="cancel"  iconPos="right" label="Limpiar filtro" (click)="clear(op)">
        </app-p-button>
<!--        <button pButton pTooltip="Clique para ver informações sobre a ordenação, ou desmarcar todas, caso alguma esteja selecionada." -->
<!--                tooltipPosition="bottom" type="button" class="p-button-secondary" icon="pi pi-sort-alt" iconPos="left" (click)="op.toggle($event)"></button>-->
    `
})
export class PrimeNgTableSortHelperComponent {

    @Input() table: Table;
    @Output() sortEvent = new EventEmitter();

    datatableLoadedListener: BehaviorSubject<boolean>;
    alreadyLoaded = false;

    @Output() clearAllFilterEvent = new EventEmitter();

    get _getAllSortParametersHelper(): string[] {
        return QueryTableSorterHelper.getAllSortParametersHelper();
    }

    ngAfterViewInit(): void {
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

    ngOnDestroy(): void {
        this.datatableLoadedListener.unsubscribe();
    }

    clear(op: any): void {
        QueryTableSorterHelper.clear(op, this.table);
        this.clearAllFilterEvent.emit();
    }
}
