import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {BranchFormComponent} from "../branch-form/branch-form.component";
import {BranchResponseDto} from "../../../../../shared/models/branch-response.dto";
import {BranchService} from "../../../services/branch.service";
import {BranchRequestDto} from "../../../../../shared/models/branch-request.dto";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";

@Component({
    selector: 'app-branch-edit',
    templateUrl: './branch-edit.component.html',
    styleUrl: './branch-edit.component.scss',
    standalone: true,
    imports: [
        BranchFormComponent
    ]
})
export class BranchEditComponent {

    id: string;
    organizationId: string;
    serviceUpdateLoaderId = 'service-update-loader-id';
    model: BranchResponseDto;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: BranchService,
        public ref: DynamicDialogRef,
    ) {
    }

    ngOnInit(): void {
        this.organizationId = this.config.data.organizationId;
        this.id = this.config.data.id;
        this.model = this.config.data.model;
    }

    async save($event: BranchRequestDto) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.organizationId, this.id, $event)), this.serviceUpdateLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
