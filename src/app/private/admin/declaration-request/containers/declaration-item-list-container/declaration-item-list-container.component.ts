import {Component, Input} from '@angular/core';
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationItemResponseDto} from "../../../../../shared/models/declaration-item-response.dto";
import {DeclarationTableFormType} from "../../../../../shared/enums/declaration-table-form-type";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {NGXLogger} from "ngx-logger";
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-declaration-item-list-container',
    templateUrl: './declaration-item-list-container.component.html',
    styleUrl: './declaration-item-list-container.component.scss'
})
export class DeclarationItemListContainerComponent {

    data: Page<DeclarationItemResponseDto>;

    public loaderId: string = UuidHelper.get();

    @Input()
    requestId: string;

    @Input()
    id: string;

    @Input()
    model: DeclarationResponseDto
    declarationTableFormType: DeclarationTableFormType;

    public modelIn = (model: DeclarationItemResponseDto) => model;

    constructor(
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private service: DeclarationRequestService) {
    }

    async ngOnInit() {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationItems(this.requestId, this.id, null)), this.loaderId);
    }

    async page($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationItems(this.requestId, this.id, $event)), this.loaderId);
    }

    get getDeclarationTableFormType(): DeclarationTableFormType {

        if (GeneralHelper.isEmptyOrUndefinedOrNull(this.model)) {
            return null;
        }

        const declarationRequestType = DeclarationRequestRecurrence[this.model.declarationRequest.recurrence];
        const declarationType = DeclarationType[this.model.declarationType];

        if (DeclarationRequestRecurrence.ANNUAL === declarationRequestType) {
            return DeclarationTableFormType.ANNUALLY;
        }

        if (DeclarationType.CONSOLIDATED === declarationType) {
            return DeclarationTableFormType.MONTHLY_CONSOLIDATED;
        }

        if (DeclarationType.DETAILED === declarationType) {
            return DeclarationTableFormType.MONTHLY_DETAILED;
        }

        this.log.info('Unable to match DeclarationTableFormType! declarationRequestType, declarationType', this?.model?.declarationRequest?.recurrence, this?.model?.declarationType)

        return null;
    }

}
