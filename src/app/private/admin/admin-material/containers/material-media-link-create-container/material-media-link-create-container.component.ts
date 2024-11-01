import {Component} from '@angular/core';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {NGXLogger} from 'ngx-logger';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {InformativeService} from '../../../../shared/services/informative.service';
import {CreateMediaLinkDto} from '../../../../../shared/models/create-media-link.dto';

@Component({
    selector: 'app-material-media-link-create-container',
    templateUrl: './material-media-link-create-container.component.html',
    styleUrl: './material-media-link-create-container.component.scss'
})
export class MaterialMediaLinkCreateContainerComponent {

    public readonly loaderId: string = UuidHelper.get();

    constructor(
        private log: NGXLogger,
        private service: InformativeService,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        public dynamicDialogRef: DynamicDialogRef,
        public loaderService: LoaderServiceV2) {
    }

    async save($event: CreateMediaLinkDto) {
        this.log.info($event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.addVideo($event)), this.loaderId);
        this.defaultSystemMessagesService.success();
        this.dynamicDialogRef.close(true);
    }

    closeDialog() {
        this.dynamicDialogRef.close(false);
    }
}
