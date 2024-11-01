import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {v4 as uuidv4} from 'uuid';
import {LoaderService} from "../../../../../shared/services/loader";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {SubmitOfferFormComponent} from "../submit-offer-form/submit-offer-form.component";
import {ApplicationCreateDto} from "../../models/application-create.dto";
import {lastValueFrom} from "rxjs";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {NgIf} from "@angular/common";
import {GroupResponseDto} from "../../../../../shared/models/group-response.dto";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-submit-offer-create',
    templateUrl: './submit-offer-create.component.html',
    styleUrl: './submit-offer-create.component.scss',
    standalone: true,
    imports: [
        SubmitOfferFormComponent,
        NgIf
    ],
})
export class SubmitOfferCreateComponent {

    serviceSaveLoaderId = uuidv4();
    getApplicationsAttachmentsLoaderId = uuidv4();
    biddingId: string = this.config.data.biddingId;
    organizationId: string;
    model: GroupResponseDto;

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
        this.organizationId = this.profileService.getProfile().organizations[0]?.id;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getApplicationsAttachments() ), this.getApplicationsAttachmentsLoaderId);
    }

    async save($events: ApplicationCreateDto) {
        this.log.info('ApplicationCreateDto {}', $events);
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.saveApplication(this.biddingId, $events) ), this.serviceSaveLoaderId);
        this.message.success();
        this.ref.close('modified');
    }

}
