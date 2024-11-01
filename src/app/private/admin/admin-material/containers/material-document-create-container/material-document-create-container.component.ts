import {Component} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {InformativeService} from '../../../../shared/services/informative.service';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {NGXLogger} from 'ngx-logger';
import {MaterialDocumentRequestDto} from '../../../../../shared/models/material-document-request.dto';

@Component({
    selector: 'app-material-document-create-container',
    templateUrl: './material-document-create-container.component.html',
    styleUrl: './material-document-create-container.component.scss'
})
export class MaterialDocumentCreateContainerComponent {

    loaderId: string = UuidHelper.get();

    constructor(
        private dynamicDialogRef: DynamicDialogRef,
        private log: NGXLogger,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        public loaderService: LoaderServiceV2,
        private service: InformativeService) {
    }

    async save($event: MaterialDocumentRequestDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.addInformativeMaterials($event)), this.loaderId);
        this.defaultSystemMessagesService.success();
        this.dynamicDialogRef.close(true);
    }

    closeDialog() {
        this.dynamicDialogRef.close(false);
    }
}
