import {Component, Input} from '@angular/core';
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {Page} from "../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-backyard-declaration-history-list-container',
    templateUrl: './backyard-declaration-history-list-container.component.html',
    styleUrl: './backyard-declaration-history-list-container.component.scss'
})
export class BackyardDeclarationHistoryListContainerComponent {

    data: Page<any>;

    public loaderId: string = UuidHelper.get();

    @Input()
    id: string;

    @Input()
    requestId: string;

    constructor(
        private loaderService: LoaderServiceV2,
        private service: DeclarationRequestService) {
    }

    async ngOnInit() {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.history(this.requestId, this.id, null)), this.loaderId);
    }

    async pageEvent($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.history(this.requestId, this.id, $event)), this.loaderId);
    }

    async sortEvent($event: any) {
        this.data = await this.loaderService.activateLoader(() => lastValueFrom(this.service.history(this.requestId, this.id, $event)), this.loaderId);
    }

    downloadEvent(auditId: string) {
        this.service.downloadHistoryDirectly(this.requestId, this.id, auditId);
    }
}
