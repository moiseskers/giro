import {Component, ViewChild} from '@angular/core';
import {BiddingStatus} from "../../../../../shared/enums/bidding-status.enum";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {BiddingResponseDto} from "../../../../../shared/models/bidding-response.dto";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {MenuItem} from "primeng/api";
import {
    GeneralInformationComponent
} from "../../../../shared/components/general-information/general-information.component";
import {BiddingService} from "../../../../shared/services/bidding.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {ActivatedRoute} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {SubmitOfferCreateComponent} from "../../components/submit-offer-create/submit-offer-create.component";

@Component({
    selector: 'app-manager-bidding-view',
    templateUrl: './manager-bidding-view.component.html',
    styleUrl: './manager-bidding-view.component.scss'
})
export class ManagerBiddingViewComponent {

    ref: DynamicDialogRef | undefined;
    id: string = this.activatedRoute.snapshot.params['id'];
    model: BiddingResponseDto;
    loaderId = UuidHelper.get();
    items: MenuItem[];

    public readonly biddingStatusEnum = BiddingStatus;
    public readonly updateLoaderId: string = UuidHelper.get();

    readonly dialogHeader = 'Presentar oferta';

    @ViewChild(GeneralInformationComponent) generalInformationComponentRef: GeneralInformationComponent;

    messages1 = [
        { severity: 'info', detail: 'Su oferta ya fue presentada. Acceda a “Mis postulaciones” para acompañar su inscripción.' },
    ];

    constructor(
        private service: BiddingService,
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private profileService: ProfileService,
        private activatedRoute: ActivatedRoute) {
    }

    async ngOnInit() {
        const organization = this.profileService.getProfile().organizations[0];
        this.model = await this.loaderService.activateLoader<BiddingResponseDto>(() => lastValueFrom(this.service.getByIdAndOrganizationId(this.id, organization.id)), this.loaderId);
    }

    submitOffer() {
        this.ref = this.dialogService.open(SubmitOfferCreateComponent, {
            header: this.dialogHeader,
            width: '40vw',
            modal: true,
            data: {
                biddingId: this.id,
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value === 'modified') {
                await this.ngOnInit();
            }
        });
    }
}
