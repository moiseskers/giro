import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {DeclarationDocumentService} from "../../../../shared/services/declaration-document.service";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-backyard-document-create-container',
    templateUrl: './backyard-document-create-container.component.html',
    styleUrl: './backyard-document-create-container.component.scss',
})
export class BackyardDocumentCreateContainerComponent {

    serviceSaveLoaderId = uuidv4();
    declarationResponseDto: DeclarationResponseDto = this.config.data.declarationResponseDto;
    declarationId: string;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        private service: DeclarationDocumentService,
        public ref: DynamicDialogRef,
    ) {}

    ngOnInit(): void {
        this.declarationId = this.declarationResponseDto.id;
    }

    async save($events: DocumentRequestDto[]) {
        await this.loaderService.activateLoader(() =>
                Promise.all(
                $events.map(async value => await lastValueFrom(this.service.createAdmin(this.declarationId, value)))
            ), this.serviceSaveLoaderId);

        this.message.success();
        this.ref.close(true);
    }

}
