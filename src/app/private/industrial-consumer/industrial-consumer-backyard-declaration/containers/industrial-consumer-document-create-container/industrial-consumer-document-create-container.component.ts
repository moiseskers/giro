import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationDocumentService} from "../../../../shared/services/declaration-document.service";
import {ProfileService} from '../../../../../shared/services/auth/profile.service';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';

@Component({
    selector: 'app-industrial-consumer-document-create-container',
    templateUrl: './industrial-consumer-document-create-container.component.html',
    styleUrl: './industrial-consumer-document-create-container.component.scss'
})
export class IndustrialConsumerDocumentCreateContainerComponent {

    serviceSaveLoaderId = UuidHelper.get();
    declarationResponseDto: DeclarationResponseDto = this.config.data.declarationResponseDto;

    private declarationId: string;
    private organizationId: string;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        private service: DeclarationDocumentService,
        public ref: DynamicDialogRef,
        protected profileService: ProfileService,
    ) {
    }

    ngOnInit() {
        this.declarationId = this.declarationResponseDto.id;
        this.organizationId = this.profileService.getProfile().organizations[0].id;
    }

    async save($events: DocumentRequestDto[]) {
        await this.loaderService.activateLoader(() =>
            Promise.all(
                $events.map(async value => await lastValueFrom(this.service.create(this.organizationId, this.declarationId, value)))
            ), this.serviceSaveLoaderId);

        this.message.success();
        this.ref.close(true);
    }

}
