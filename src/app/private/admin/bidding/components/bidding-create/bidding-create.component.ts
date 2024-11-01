import {Component} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {BiddingRequestDto} from "../../../../../shared/models/bidding-request.dto";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {LoaderService} from "../../../../../shared/services/loader";

@Component({
    selector: 'app-bidding-create',
    templateUrl: './bidding-create.component.html',
    styleUrl: './bidding-create.component.scss'
})
export class BiddingCreateComponent {

    public readonly saveLoaderId: string = UuidHelper.get()

    constructor(
        private message: DefaultSystemMessagesService,
        public ref: DynamicDialogRef,
        public loaderService: LoaderService,
        private service: BiddingService) {
    }

    async save($event: BiddingRequestDto) {
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.save($event)), this.saveLoaderId);
        this.ref.close('modified');
        this.message.success();
    }
}
