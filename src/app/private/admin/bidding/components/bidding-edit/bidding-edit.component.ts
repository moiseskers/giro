import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {BiddingRequestDto} from "../../../../../shared/models/bidding-request.dto";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {LoaderService} from "../../../../../shared/services/loader";

@Component({
    selector: 'app-bidding-edit',
    templateUrl: './bidding-edit.component.html',
    styleUrl: './bidding-edit.component.scss'
})
export class BiddingEditComponent {

    id: string;
    organizationId: string;
    serviceUpdateLoaderId = 'service-update-loader-id';
    model: BiddingResponseDto;

    constructor(
        public config: DynamicDialogConfig,
        public message: DefaultSystemMessagesService,
        public loaderService: LoaderService,
        public service: BiddingService,
        public ref: DynamicDialogRef,
    ) {
    }

    ngOnInit(): void {
        this.model = this.config.data.model;
        this.id = this.config.data.model.id;
    }

    async save($event: BiddingRequestDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.update(this.id, $event)), this.serviceUpdateLoaderId);
        this.message.success();
        this.ref.close(true);
    }

}
