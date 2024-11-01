import {Component, Input} from '@angular/core';
import {Page} from "../../../../../shared/objects/page";
import {DeclarationItemResponseDto} from "../../../../../shared/models/declaration-item-response.dto";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {lastValueFrom} from "rxjs";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {ProfileService} from '../../../../../shared/services/auth/profile.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-manager-backyard-declaration-item-list-container',
    templateUrl: './manager-backyard-declaration-item-list-container.component.html',
    styleUrl: './manager-backyard-declaration-item-list-container.component.scss'
})
export class ManagerBackyardDeclarationItemListContainerComponent {

    data: Page<DeclarationItemResponseDto>;
    public loaderId: string = UuidHelper.get();
    public modelIn = (model: DeclarationItemResponseDto) => model;
    @Input() declarationResponseDto: DeclarationResponseDto
    organizationId: string;

    constructor(
        public loaderService: LoaderServiceV2,
        private profileService: ProfileService,
        private service: DeclarationService) {
    }

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.items(this.organizationId, this.declarationResponseDto.id, null)), this.loaderId);
    }

    async page($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.items(this.organizationId, this.declarationResponseDto.id, $event)),       this.loaderId);
    }

    async sortEvent($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.items(this.organizationId, this.declarationResponseDto.id, $event)),       this.loaderId);
    }

}