import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {ManagerService} from "../../../../../shared/services/manager.service";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {ManagerResponseDto} from '../../../../../../shared/models/manager-response.dto';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {

    id: string;
    organizationId: string;
    serviceUpdateLoaderId = 'service-update-loader-id';
    model: ManagerResponseDto;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: ManagerService,
        public ref: DynamicDialogRef,
    ) {
    }

    ngOnInit(): void {
        this.id = this.config.data.model.id;
        this.model = this.config.data.model;
    }

    async save($event: ManagerResponseDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.id, $event)), this.serviceUpdateLoaderId);
        this.message.success();
        this.ref.close('modified');
    }
}
