import {Component} from '@angular/core';
import {CigRequestDto} from "../../../../../shared/models/cig-request.dto";
import {CigService} from "../../services/cig.service";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {LoaderService} from "../../../../../shared/services/loader";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {NGXLogger} from "ngx-logger";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";

@Component({
    selector: 'app-cig-create-container',
    templateUrl: './cig-create-container.component.html',
    styleUrl: './cig-create-container.component.scss'
})
export class CigCreateContainerComponent {

    public readonly loaderId = UuidHelper.get();

    constructor(
        public ref: DynamicDialogRef,
        private log: NGXLogger,
        private message: DefaultSystemMessagesService,
        private loaderService: LoaderService,
        private service: CigService) {}

    async saveEvent($event: CigRequestDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save($event)), this.loaderId);
        this.message.success();
        this.ref.close(true);
    }

}
