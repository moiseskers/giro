import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {ManagerResponseDto} from "../../../../../../shared/models/manager-response.dto";
import {OrganizationUserService} from "../../../../../shared/services/organization-user.service";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {OrganizationUserFormComponent} from "../organization-user-form/organization-user-form.component";

@Component({
    selector: 'app-organization-user',
    templateUrl: './organization-user-create.component.html',
    styleUrl: './organization-user-create.component.scss',
    standalone: true,
    imports: [
        OrganizationUserFormComponent
    ]
})
export class OrganizationUserCreateComponent {

    serviceSaveLoaderId = 'service-save-loader-id';
    organizationId: string = this.config.data.organizationId

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: OrganizationUserService,
        public ref: DynamicDialogRef,
    ) {
    }

    async save($event: ManagerResponseDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(this.organizationId, $event)), this.serviceSaveLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
