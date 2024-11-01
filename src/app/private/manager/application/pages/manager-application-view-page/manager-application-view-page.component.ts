import {Component} from '@angular/core';
import {AppButtonModule} from "../../../../../shared/components/button/button";
import {AppCardModule} from "../../../../../shared/components/app-card";
import {AppToolbarModule} from "../../../../../shared/components/toolbar/toolbar";
import {
    GeneralInformationComponent
} from "../../../../shared/components/general-information/general-information.component";
import {MessagesModule} from "primeng/messages";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {ProcessFileModule} from "../../../../shared/components/process-files/process-file.module";
import {TagModule} from "primeng/tag";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";
import {LoaderService, LoaderServiceModule} from "../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {
    ManagerInformationComponent
} from "../../../../admin/evaluation/components/manager-information/manager-information.component";
import {lastValueFrom} from "rxjs";
import {ApplicationService} from "../../../../shared/services/application.service";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {ActivatedRoute} from "@angular/router";
import {EvaluationComponent} from "../../../../shared/components/evaluation/evaluation.component";
import {
    ManagerDocumentListComponent
} from "../../../../admin/evaluation/components/manager-document/manager-document-list.component";
import {Page} from "../../../../../shared/objects/page";
import {ApplicationStatusEnum} from "../../../../../shared/enums/application-status.enum";
import {ChevronDownIcon} from "primeng/icons/chevrondown";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppealOfferCreateComponent} from "../../components/appeal-offer-create/appeal-offer-create.component";
import {TagStatusesComponent} from '../../../../../shared/components/tag-statuses/tag-statuses.component';

@Component({
    selector: 'app-manager-application-view-page',
    standalone: true,
    imports: [
        AppButtonModule,
        AppCardModule,
        AppToolbarModule,
        GeneralInformationComponent,
        MessagesModule,
        NgIf,
        NgSwitchCase,
        ProcessFileModule,
        TagModule,
        NgSwitch,
        ManagerInformationComponent,
        LoaderServiceModule,
        EvaluationComponent,
        ManagerDocumentListComponent,
        ChevronDownIcon,
        TagStatusesComponent
    ],
    templateUrl: './manager-application-view-page.component.html',
    styleUrl: './manager-application-view-page.component.scss'
})
export class ManagerApplicationViewPageComponent {

    public readonly applicationStatus = ApplicationStatusEnum;
    public model: ApplicationResponseDto;

    loaderId = UuidHelper.get();
    managerDocumentListLoaderId = UuidHelper.get();
    public downloadLoaderId: string = UuidHelper.get();

    biddingDocumentInModel: Page<ApplicationResponseDto>;
    id: string = this.activatedRoute.snapshot.params['id'];

    readonly dialogHeader = 'Descripción de rechazo';
    ref: DynamicDialogRef | undefined;

    constructor(
        private service: ApplicationService,
        private profileService: ProfileService,
        public loaderService: LoaderService,
        private activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
    ) {
    }

    async ngOnInit() {
        const organizationId = this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader<ApplicationResponseDto>(() => lastValueFrom(this.service.byId(organizationId, this.id)), this.loaderId);
        await this.managerDocumentListInit();
    }

    appealOffer() {
        this.ref = this.dialogService.open(AppealOfferCreateComponent, {
            header: this.dialogHeader,
            width: '40vw',
            modal: true,
            data: {
                model: this.model,
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

    /// document list
    async managerDocumentListInit() {
        this.biddingDocumentInModel = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getAttachmentsByApplicationId(this.model.id, null)), this.managerDocumentListLoaderId);
    }

    async managerDocumentListPage($event: any) {
        this.biddingDocumentInModel = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getAttachmentsByApplicationId(this.model.id, $event)), this.managerDocumentListLoaderId);
    }

    async managerDocumentListDownload(id: string) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(this.model.id, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }

    async managerDocumentListSort($event: any) {
        this.biddingDocumentInModel = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getAttachmentsByApplicationId(this.model.id, $event)), this.managerDocumentListLoaderId);
    }
}
