import {Component} from '@angular/core';
import {OrganizationService} from "../../../../../shared/services/organization.service";
import {lastValueFrom} from "rxjs";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {OrganizationRequestDto} from "../../../../../../shared/models/organization-request-dto";

@Component({
    selector: 'app-organization-create',
    templateUrl: './organization-create.component.html',
    styleUrl: './organization-create.component.scss'
})
export class OrganizationCreateComponent {

    serviceSaveLoaderId = 'service-save-loader-id';

    constructor(
        private message: DefaultSystemMessagesService,
        public ref: DynamicDialogRef,
        public loaderService: LoaderService,
        private service: OrganizationService) {
    }

    async save($event: OrganizationRequestDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save($event)), this.serviceSaveLoaderId);
        this.ref.close('modified');
        this.message.success();
    }
}
