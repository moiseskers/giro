import {Component} from '@angular/core';
import {OrganizationService} from "../../../../../shared/services/organization.service";
import {lastValueFrom} from "rxjs";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoaderService} from "../../../../../../shared/services/loader";
import {OrganizationResponseDto} from "../../../../../../shared/models/organization-response.dto";

@Component({
    selector: 'app-organization-edit',
    templateUrl: './organization-edit.component.html',
    styleUrl: './organization-edit.component.scss'
})
export class OrganizationEditComponent {

    model: OrganizationResponseDto;
    serviceMethodLoaderId = 'service-method-save-id';

    constructor(
        public config: DynamicDialogConfig,
        private message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        private service: OrganizationService,
        public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        this.model = this.config.data.organization;
    }

    async save($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.model.id, $event)), this.serviceMethodLoaderId);
        this.ref.close('modified');
        this.message.success();
    }

}
