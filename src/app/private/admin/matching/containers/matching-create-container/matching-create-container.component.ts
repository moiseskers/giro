import {Component} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MatchingType} from '../../../../../shared/types/matching.type';
import {NGXLogger} from 'ngx-logger';
import {MatchingRequestDto} from '../../../../../shared/models/./matching-request.dto';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {lastValueFrom} from 'rxjs';
import {MatchingService} from '../../../../shared/services/matching.service';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {
    WarningDialogComponent
} from '../../../../shared/components/declaration-warning-dialog/warning-dialog.component';

@Component({
    selector: 'app-matching-create-container',
    templateUrl: './matching-create-container.component.html',
    styleUrl: './matching-create-container.component.scss'
})
export class MatchingCreateContainerComponent {

    type: MatchingType = 'MATCHING';
    readonly dialogHeaderCreate = 'Hacer Matching';
    loaderId: string = UuidHelper.get();
    successMessage = 'Matching fué empezado. Una vez que se finalize el matching, el vá a quedar disponible en la listage.';

    constructor(
        private log: NGXLogger,
        public loaderService: LoaderServiceV2,
        private service: MatchingService,
        public dynamicDialogRef: DynamicDialogRef,
        private message: DefaultSystemMessagesService,
        private dialogService: DialogService,
        ) {
    }

    ngOnInit(): void {
        this.log.info('matching create container initialized with type ', this.type)
    }



    async save(event: MatchingRequestDto) {

        const ref = this.dialogService.open(WarningDialogComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                html: 'A hacer la confirmación se vá a realizar todo el matching del año seleccionado y solo se cerrara una vez que se cumple todas las metas. Deseas confirmar y empezar el matching?'
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                this.log.info('creating match', event);
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.save(event)), this.loaderId);
                this.message.success(this.successMessage, 4000);
                this.dynamicDialogRef.close(true);
            }
        });
    }

}
