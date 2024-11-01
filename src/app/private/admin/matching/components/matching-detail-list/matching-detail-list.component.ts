import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from '../../../../../shared/objects/page';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {TableModule} from 'primeng/table';
import {AppViewDataComponent} from '../../../../../shared/components/app-view-data/app-view-data.component';
import {CheckEmptyPipe} from '../../../../../shared/pipes/check-empty/check-empty.pipe';
import {GiroDataViewComponent} from '../../../../../shared/components/giro-menu-bar/giro-data-view.component';
import {SkeletonModule} from 'primeng/skeleton';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {MatchingItemResponseDto} from '../../../../../shared/models/matching-item-response.dto';
import {MilligramsPipe} from '../../../../../shared/pipes/milligrams/milligrams.pipe';
import {AddSymbolPipe} from '../../../../../shared/pipes/add-symbol/add-symbol.pipe';
import {CategoryTypeEnum} from '../../../../../shared/enums/category-type.enum';
import {DeclarationItemTypeEnum} from '../../../../../shared/enums/declaration-item-type.enum';
import {AppPaginatorModule} from '../../../../../shared/components/app-paginator';

@Component({
    selector: 'app-matching-detail-list',
    templateUrl: './matching-detail-list.component.html',
    styleUrl: './matching-detail-list.component.scss',
    imports: [
        TableModule,
        DecimalPipe,
        AppViewDataComponent,
        CheckEmptyPipe,
        DatePipe,
        GiroDataViewComponent,
        NgIf,
        SkeletonModule,
        MilligramsPipe,
        AddSymbolPipe,
        AppPaginatorModule,
    ],
    standalone: true,
    providers: [MilligramsPipe]
})
export class MatchingDetailListComponent {

    @Input() model: Page<MatchingItemResponseDto>;
    @Input() isLoading: boolean = false;
    @Input() category: string;

    @Output() sortEvent = new EventEmitter();
    @Output() pageEvent = new EventEmitter();

    modelIn = (model: MatchingItemResponseDto) => model;

    filterHistoryHelper = new FilterHistoryHelper();

    constructor(public loaderService: LoaderServiceV2, private milligramsPipe: MilligramsPipe,
    ) {
    }

    get meta() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalGoal) ? this.milligramsPipe.transform(this.model?.meta?.totalGoal) + ' t' : ''
    }

    get compensatedTons() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.model?.meta?.totalAcquired) ? this.milligramsPipe.transform(this.model?.meta?.totalAcquired) + ' t' : ''
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

    protected readonly CategoryTypeEnum = CategoryTypeEnum;
    protected readonly DeclarationItemTypeEnum = DeclarationItemTypeEnum;
}
