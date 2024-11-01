import {Component, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from "primeng/api";
import {CancelBiddingFormComponent} from "../../components/cancel-bidding-form/cancel-bidding-form.component";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {lastValueFrom} from "rxjs";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {BiddingStatus} from "../../../../../shared/enums/bidding-status.enum";
import {LoaderService} from "../../../../../shared/services/loader";
import {
    GeneralInformationComponent
} from "../../../../shared/components/general-information/general-information.component";

@Component({
    selector: 'app-bidding-view',
    templateUrl: './bidding-view.component.html',
    styleUrl: './bidding-view.component.scss'
})
export class BiddingViewComponent {

    ref: DynamicDialogRef | undefined;
    id: string = this.activatedRoute.snapshot.params['id'];

    model: BiddingResponseDto;

    loaderId = UuidHelper.get();

    items: MenuItem[];

    public readonly biddingStatusEnum = BiddingStatus;
    public readonly updateLoaderId: string = UuidHelper.get();

    @ViewChild(GeneralInformationComponent) generalInformationComponentRef: GeneralInformationComponent;

    constructor(
        private service: BiddingService,
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private message: DefaultSystemMessagesService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getByIdStatusHelper(this.id)), this.loaderId);
        this.handleBiddingStatusList();
    }

    handleBiddingStatusList() {
        this.items = [
            {
                label: 'Declarar adjudicada',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.AWARDED)]
            },
            {
                label: 'Declarar desierta',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.ABANDONED)]
            },
            {
                label: 'Declarar cancelada',
                id: Object.keys(BiddingStatus)[Object.values(BiddingStatus).indexOf(BiddingStatus.CANCELLED)]
            }
        ];
    }

    cancel(): Promise<any> {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(CancelBiddingFormComponent, {
                header: 'Cancelamiento de licitación',
                width: '40vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });

            this.ref.onClose.subscribe(async value => {
                if (value) {
                    resolve(value);
                }
                resolve(null);
            });
        });
    }

    async action(item: any) {
        switch (BiddingStatus[item.id]) {
            case BiddingStatus.CANCELLED:
                const response = await this.cancel();
                if (response) {
                    await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusCancel(this.id, response.description)), this.updateLoaderId);
                    this.message.success();
                    await this.generalInformationComponentRef.ngOnInit();
                    await this.ngOnInit();
                }
                return;
            case BiddingStatus.AWARDED:
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusAward(this.id)), this.updateLoaderId);
                this.message.success();
                await this.generalInformationComponentRef.ngOnInit();
                await this.ngOnInit();
                return;
            case BiddingStatus.ABANDONED:
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.statusAbandon(this.id)), this.updateLoaderId);
                this.message.success();
                await this.generalInformationComponentRef.ngOnInit();
                await this.ngOnInit();
                return;
        }
    }
}
