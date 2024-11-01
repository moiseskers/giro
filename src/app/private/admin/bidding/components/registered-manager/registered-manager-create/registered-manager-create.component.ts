import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {ProcessFileService} from "../../../../../shared/services/process-file.service";
import {LoaderService} from "../../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {DocumentRequestDto} from '../../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-registered-manager-create',
    templateUrl: './registered-manager-create.component.html',
    styleUrl: './registered-manager-create.component.scss'
})
export class RegisteredManagerCreateComponent {

    serviceSaveLoaderId = uuidv4();
    biddingId: string = this.config.data.biddingId

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: ProcessFileService,
        public ref: DynamicDialogRef,
    ) {}

    async save($events: DocumentRequestDto[]) {

        await this.loaderService.activateLoader(() =>
                Promise.all(
                $events.map(async value => await lastValueFrom(this.service.save(this.biddingId, null)))
            ),
        this.serviceSaveLoaderId)

        this.message.success();
        this.ref.close('modified');
    }

}
