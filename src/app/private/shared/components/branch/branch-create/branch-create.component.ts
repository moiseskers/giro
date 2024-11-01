import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {BranchFormComponent} from "../branch-form/branch-form.component";
import {BranchService} from "../../../services/branch.service";
import {BranchRequestDto} from "../../../../../shared/models/branch-request.dto";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';

@Component({
    selector: 'app-branch-create',
    templateUrl: './branch-create.component.html',
    styleUrl: './branch-create.component.scss',
    standalone: true,
    imports: [
        BranchFormComponent
    ]
})
export class BranchCreateComponent {

    serviceSaveLoaderId = UuidHelper.get();

    organizationId: string = this.config.data.organizationId

    organization: OrganizationResponseDto = this.config.data?.model

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: BranchService,
        public ref: DynamicDialogRef,
    ) {
    }

    async save($event: BranchRequestDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(this.organizationId, $event)), this.serviceSaveLoaderId);
        this.message.success();
        this.ref.close('modified');
    }
}
