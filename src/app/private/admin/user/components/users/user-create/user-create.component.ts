import {Component} from '@angular/core';
import {ManagerResponseDto} from "../../../../../../shared/models/manager-response.dto";
import {lastValueFrom} from "rxjs";
import {ManagerService} from "../../../../../shared/services/manager.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {

    serviceSaveLoaderId = 'service-save-loader-id';

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: ManagerService,
        public ref: DynamicDialogRef,
    ) {
    }

    async save($event: ManagerResponseDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save($event)), this.serviceSaveLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
