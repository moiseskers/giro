import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppFilterModule} from '../app-filter';
import {Filter} from '../app-filter/models/filter';
import {Table} from 'primeng/table';
import {SkeletonComponent} from '../skeleton/skeleton.component';
import {NgIf} from '@angular/common';

/**
 * @deprecated This class is deprecated
 */
@Component({
    selector: 'app-filter-with-loader',
    templateUrl: './app-filter-with-loader.component.html',
    standalone: true,
    imports: [
        AppFilterModule,
        SkeletonComponent,
        NgIf
    ],
    styleUrls: ['./app-filter-with-loader.component.scss']
})
export class AppFilterWithLoaderComponent {

    @Input() isLoading: boolean = true;
    @Input() filters: Filter[] = [];
    @Input() table: Table;
    @Input() addButtonTitle: string;
    @Input() addButtonLoading: boolean;

    @Output() actionButtonEvent = new EventEmitter();
    @Output() filterEvent = new EventEmitter();
    @Output() sortEvent = new EventEmitter();
    @Output() clearFilterEvent = new EventEmitter();

    handleActionButtonEvent() {
        this.actionButtonEvent.emit();
    }

    sort($event: any) {
        this.sortEvent.emit($event);
    }

    filter($event: any) {
        this.filterEvent.emit($event)
    }

    handleClearFilterEvent() {
        this.clearFilterEvent.emit();
    }
}
