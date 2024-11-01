import {Component, Input} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Page} from "../../../../../shared/objects/page";
import {DeclarationItemResponseDto} from "../../../../../shared/models/declaration-item-response.dto";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-backyard-declaration-item-list-container',
    templateUrl: './backyard-declaration-item-list-container.component.html',
    styleUrl: './backyard-declaration-item-list-container.component.scss'
})
export class BackyardDeclarationItemListContainerComponent {

    data: Page<DeclarationItemResponseDto>;

    public loaderId: string = UuidHelper.get();

    public modelIn = (model: DeclarationItemResponseDto) => model;

    @Input()
    requestId: string;

    @Input()
    id: string;

    @Input()
    model: DeclarationResponseDto

    showSkeleton: boolean = true;

    constructor(
        public loaderService: LoaderServiceV2,
        private service: DeclarationRequestService) {
    }

    async ngOnInit() {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationItems(this.requestId, this.id, null)), this.loaderId);
        this.showSkeleton = false;
    }

    async page($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationItems(this.requestId, this.id, $event)), this.loaderId);
    }

    async sortEvent($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationItems(this.requestId, this.id, $event)), this.loaderId);
    }
}
