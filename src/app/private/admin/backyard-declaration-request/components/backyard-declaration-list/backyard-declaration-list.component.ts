import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Filter} from "../../../../../shared/components/app-filter/models/filter";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";
import {MilligramsPipe} from '../../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-backyard-declaration-list',
    templateUrl: './backyard-declaration-list.component.html',
    styleUrl: './backyard-declaration-list.component.scss',
    providers:[MilligramsPipe]
})
export class BackyardDeclarationListComponent {

    @Input()
    filters: Filter[];

    @Input()
    model: Page<DeclarationResponseDto>;

    @Input()
    loading: boolean = true;

    @Input() filterIsLoading: boolean = true;

    filterHistoryHelper = new FilterHistoryHelper();

    public modelIn = (model: DeclarationResponseDto) => model;

    @Output() sortEvent: EventEmitter<any> = new EventEmitter();
    @Output() filterEvent: EventEmitter<any> = new EventEmitter();
    @Output() pageEvent: EventEmitter<any> = new EventEmitter();
    @Output() viewEvent: EventEmitter<any> = new EventEmitter();

    constructor( private milligramsPipe: MilligramsPipe,) {}

    filter($event: any) {
        this.filterHistoryHelper.filter($event, async ($event: any) => {
            this.filterEvent.emit($event);
        });
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }

    page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    view(id: string) {
        this.viewEvent.emit(id);
    }

    get totalWeightSum() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalTons) ? this.milligramsPipe.transform(this.model?.meta?.totalTons) + ' t' : ''
    }

    protected readonly DeclarationStatus = DeclarationStatus;

}
