import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from "../../../../shared/objects/page";
import {LoaderService} from "../../../../shared/services/loader";
import {BiddingType} from "../../../../shared/enums/bidding-type.enum";
import {DeclarationItemTypeEnum} from "../../../../shared/enums/declaration-item-type.enum";
import {DeclarationItemResponseDto} from "../../../../shared/models/declaration-item-response.dto";
import {TableModule} from "primeng/table";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {FilterHistoryHelper} from "../../../../shared/helpers/filter-history.helper";
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';
import {Role} from '../../../../shared/enums/role';
import {HasAnyRolePipeModule} from '../../../../shared/pipes/has-any-role/has-any-role-pipe.module';

@Component({
    selector: 'app-backyard-declaration-item-list',
    templateUrl: './backyard-declaration-item-list.component.html',
    styleUrl: './backyard-declaration-item-list.component.scss',
    standalone: true,
    providers: [DecimalPipe, MilligramsPipe],
    imports: [
        TableModule,
        DecimalPipe,
        DatePipe,
        MilligramsPipe,
        HasAnyRolePipeModule,
        NgIf
    ]
})
export class BackyardDeclarationItemListComponent {

    @Input() data: Page<DeclarationItemResponseDto>;
    public modelIn = (model: DeclarationItemResponseDto) => model;

    @Output() sortEvent = new EventEmitter();
    protected readonly BiddingType = BiddingType;
    protected readonly DeclarationItemType = DeclarationItemTypeEnum;
    filterHistoryHelper = new FilterHistoryHelper();
    @Input() loading: boolean = true;

    constructor(
        private milligramsPipe: MilligramsPipe,
        public loaderService: LoaderService,
        private decimalPipe: DecimalPipe,
        ) {
    }

    get totalQuantity() {
        return this.data?.meta?.totalQuantity;
    }

    get totalTons() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.data?.meta?.totalTons) ? this.milligramsPipe.transform(this.data?.meta?.totalTons) + ' t' : ''
    }

    get materialCost() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.data?.meta?.totalCost) ? this.decimalPipe.transform(this.data?.meta?.totalCost, '1.2-2') + ' CLP' : ''
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }

    protected readonly Role = Role;
}
