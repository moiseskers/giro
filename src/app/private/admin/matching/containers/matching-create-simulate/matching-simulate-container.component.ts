import {Component} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MatchingType} from '../../../../../shared/types/matching.type';
import {NGXLogger} from 'ngx-logger';
import {MatchingRequestDto} from '../../../../../shared/models/./matching-request.dto';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {lastValueFrom} from 'rxjs';
import {MatchingService} from '../../../../shared/services/matching.service';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';

@Component({
    selector: 'app-matching-simulate-container',
    templateUrl: './matching-simulate-container.component.html',
    styleUrl: './matching-simulate-container.component.scss'
})
export class MatchingSimulateContainerComponent {

    type: MatchingType = 'SIMULATION';
    loaderId: string = UuidHelper.get();
    successMessage = 'La simulación fue empezada. Una vez que se finalize la simualación, usted vá a recibir el documento en su correo.';

    constructor(
        private log: NGXLogger,
        public loaderService: LoaderServiceV2,
        private service: MatchingService,
        public dynamicDialogRef: DynamicDialogRef,
        private message: DefaultSystemMessagesService,
        ) {
    }

    ngOnInit(): void {
        this.log.info('matching create container initialized with type ', this.type)
    }

    async save(event: MatchingRequestDto) {
        this.log.info('creating match', event);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(event)), this.loaderId);
        this.message.success(this.successMessage);
        this.dynamicDialogRef.close(true);
    }

}
