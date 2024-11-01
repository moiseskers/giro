import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {OrganizationUserService} from "../../../../../shared/services/organization-user.service";
import {OrganizationUserFormComponent} from "../organization-user-form/organization-user-form.component";
import {ManagerResponseDto} from '../../../../../../shared/models/manager-response.dto';

@Component({
    selector: 'app-organization-user-edit',
    templateUrl: './organization-user-edit.component.html',
    styleUrl: './organization-user-edit.component.scss',
    standalone: true,
    imports: [
        OrganizationUserFormComponent
    ]
})
export class OrganizationUserEditComponent {

    id: string;
    organizationId: string;
    serviceUpdateLoaderId = 'service-update-loader-id';
    model: ManagerResponseDto;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: OrganizationUserService,
        public ref: DynamicDialogRef,
    ) {
    }

    ngOnInit(): void {
        this.organizationId = this.config.data.organizationId;
        this.id = this.config.data.id;
        this.model = this.config.data.model;
    }

    async save($event: ManagerResponseDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId,  this.id, $event)), this.serviceUpdateLoaderId);
        this.message.success();
        this.ref.close('modified');
    }
}
