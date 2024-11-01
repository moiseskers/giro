import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {v4 as uuidv4} from 'uuid';
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {AppealOfferFormComponent} from "../appeal-offer-form/appeal-offer-form.component";
import {lastValueFrom} from "rxjs";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {NgIf} from "@angular/common";
import {GroupResponseDto} from "../../../../../shared/models/group-response.dto";
import {NGXLogger} from "ngx-logger";
import {ApplicationCreateDto} from "../../../bidding/models/application-create.dto";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";


// Descripción de rechazo
// ID DE INSCRIPCIÓN
// code: "ABC123"
// FECHA DE EVALUACIÓN:
//     pegar o ultimo index do model array evaluation
// evaluationDate
// DESCRIPCIÓN
// pegar o ultimo index do model array evaluation
// refuseReason

@Component({
    selector: 'app-appeal-offer-create',
    templateUrl: './appeal-offer-create.component.html',
    styleUrl: './appeal-offer-create.component.scss',
    standalone: true,
    imports: [
        AppealOfferFormComponent,
        NgIf
    ],
})
export class AppealOfferCreateComponent {

    serviceSaveLoaderId = uuidv4();
    getApplicationsAttachmentsLoaderId = uuidv4();
    organizationId: string;
    model: GroupResponseDto;

    applicationResponseDto: ApplicationResponseDto = this.config.data.model;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        private service: BiddingService,
        public loaderService: LoaderService,
        public ref: DynamicDialogRef,
        private profileService: ProfileService,
        private log: NGXLogger,
    ) {}

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsAttachments() ), this.getApplicationsAttachmentsLoaderId);
    }

    async save($events: ApplicationCreateDto) {
        this.log.info('ApplicationCreateDto {}', $events);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.appealApplication(this.applicationResponseDto.organizationId, this.applicationResponseDto.id, $events) ), this.serviceSaveLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
