import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {DocumentService} from "../../../services/document.service";
import {DocumentFormComponent} from "../document-form/document-form.component";
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-document-create',
    templateUrl: './document-create.component.html',
    styleUrl: './document-create.component.scss',
    standalone: true,
    imports: [
        DocumentFormComponent
    ]
})
export class DocumentCreateComponent {

    serviceSaveLoaderId = uuidv4();
    organizationId: string = this.config.data.organizationId

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: DocumentService,
        public ref: DynamicDialogRef,
    ) {
    }

    async save($events: DocumentRequestDto[]) {
        await this.loaderService.activateLoader(() =>
                Promise.all(
                $events.map(async value => await lastValueFrom(this.service.save(this.organizationId, value)))
            ), this.serviceSaveLoaderId);

        this.message.success();
        this.ref.close('modified');
    }

}
