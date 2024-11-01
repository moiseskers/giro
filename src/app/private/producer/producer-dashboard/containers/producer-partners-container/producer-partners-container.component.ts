import {Component} from '@angular/core';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {DashboardService} from '../../../../shared/services/dashboard.service';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';
import {PartnerResponseDto} from '../../../../../shared/models/partner-response.dto';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {NGXLogger} from 'ngx-logger';

@Component({
    selector: 'app-producer-partners-container',
    templateUrl: './producer-partners-container.component.html',
    styleUrl: './producer-partners-container.component.scss'
})
export class ProducerPartnersContainerComponent {

    public readonly loaderId: string = UuidHelper.get()
    model: PartnerResponseDto;
    uploadButtonLoaderId: string = UuidHelper.get();

    constructor(
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private service: DashboardService) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getReportsPartners()), this.loaderId);
    }

    async uploadBase64($event: DocumentRequestDto) {
        try {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.uploadReportsPartners($event)), this.uploadButtonLoaderId);
            this.defaultSystemMessagesService.success();
            await this.ngOnInit();
        } catch (e) {
            this.defaultSystemMessagesService.error('El archivo subido no contiene las columnas requeridas. Por favor, asegúrese de que todas las columnas necesarias estén presentes y vuelva a intentarlo. Si el error persiste, contacte al administrador.');
            this.log.info(e);
        }
    }
}
