import {Component, Input} from '@angular/core';
import {DatePipe, DecimalPipe, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Page} from "../../../../shared/objects/page";
import {UuidHelper} from "../../../../shared/helpers/uuid-helper";
import {LoaderService} from "../../../../shared/services/loader";
import {DeclarationItemResponseDto} from "../../../../shared/models/declaration-item-response.dto";
import {DeclarationItemTypeEnum} from "../../../../shared/enums/declaration-item-type.enum";
import {DeclarationType} from "../../../../shared/enums/declaration-type";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {DeclarationTableFormType} from "../../../../shared/enums/declaration-table-form-type";
import {DeclarationCategory} from '../../../../shared/enums/declaration-category';
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-declaration-item-list',
    providers: [MilligramsPipe],
    standalone: true,
    imports: [
        DatePipe,
        DecimalPipe,
        SharedModule,
        TableModule,
        NgSwitchCase,
        NgTemplateOutlet,
        NgSwitch,
        MilligramsPipe
    ],
    templateUrl: './declaration-item-list.component.html',
    styleUrl: './declaration-item-list.component.scss'
})
export class DeclarationItemListComponent {

    @Input()
    public declarationTableFormType: DeclarationTableFormType = GeneralHelper.getKeyByValue(DeclarationTableFormType, DeclarationTableFormType.ANNUALLY);

    @Input()
    data: Page<DeclarationItemResponseDto>;

    public loaderId: string = UuidHelper.get();
    protected readonly DeclarationType = DeclarationType;
    protected readonly DeclarationItemType = DeclarationItemTypeEnum;
    protected readonly DeclarationTableFormType = DeclarationTableFormType;

    constructor(
        private milligramsPipe:  MilligramsPipe,
        public loaderService: LoaderService) {
    }

    get totalQuantity() {
        return this.data?.meta?.totalQuantity;
    }

    get totalTons() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.data?.meta?.totalTons) ? this.milligramsPipe.transform(this.data?.meta?.totalTons) + ' t' : ''
    }

    public modelIn = (model: DeclarationItemResponseDto) => model;
    protected readonly DeclarationCategory = DeclarationCategory;
}
