import {Component, Input} from '@angular/core';
import {Page} from "../../../../../shared/objects/page";
import {DeclarationItemResponseDto} from "../../../../../shared/models/declaration-item-response.dto";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {LoaderService} from "../../../../../shared/services/loader";
import {DeclarationTableFormType} from "../../../../../shared/enums/declaration-table-form-type";
import {lastValueFrom} from "rxjs";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationService} from "../../../../shared/services/declaration.service";

@Component({
    selector: 'app-producer-declaration-item-list-container',
    templateUrl: './producer-declaration-item-list-container.component.html',
    styleUrl: './producer-declaration-item-list-container.component.scss'
})
export class ProducerDeclarationItemListContainerComponent {

    data: Page<DeclarationItemResponseDto>;

    public loaderId: string = UuidHelper.get();

    @Input()
    id: string;

    @Input()
    organizationId: string;

    @Input()
    model: DeclarationResponseDto

    declarationTableFormType: DeclarationTableFormType;

    constructor(
        public loaderService: LoaderService,
        private service: DeclarationService) {
    }

    public modelIn = (model: DeclarationItemResponseDto) => model;

    async ngOnInit() {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.items(this.organizationId, this.id, null)), this.loaderId);

        if (this?.data?.items?.length > 0) {
            this.declarationTableFormType = this.getDeclarationTableFormType();
        }

    }

    async page($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.items(this.organizationId, this.id, $event)), this.loaderId);
    }

    getDeclarationTableFormType(): DeclarationTableFormType {
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

        return null;
    }
}
