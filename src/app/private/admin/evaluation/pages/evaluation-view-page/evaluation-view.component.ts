import {Component, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActivatedRoute} from "@angular/router";
import {ManagerInformationComponent} from "../../components/manager-information/manager-information.component";
import {EvaluationService} from "../../services/evaluation.service";
import {lastValueFrom} from "rxjs";
import {RejectEvaluationFormComponent} from "../../components/reject-evaluation-form/reject-evaluation-form.component";
import {ApplicationResponseDto} from "../../../../../shared/models/application-response.dto";
import {EvaluationComponent} from "../../../../shared/components/evaluation/evaluation.component";
import {ManagerDocumentListComponent} from "../../components/manager-document/manager-document-list.component";
import {LoaderService} from "../../../../../shared/services/loader";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {ApplicationStatusEnum} from "../../../../../shared/enums/application-status.enum";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {Page} from "../../../../../shared/objects/page";
import {ApplicationService} from "../../../../shared/services/application.service";

@Component({
    selector: 'app-evaluation-view',
    templateUrl: './evaluation-view.component.html',
    styleUrl: './evaluation-view.component.scss'
})
export class EvaluationViewComponent {

    ref: DynamicDialogRef | undefined;
    biddingId: string = this.activatedRoute.snapshot.params['biddingId'];
    applicationId: string = this.activatedRoute.snapshot.params['applicationId'];
    managerId: string;
    organizationId: string;
    model: ApplicationResponseDto;

    managerDocumentListLoaderId = UuidHelper.get();
    public readonly updateStatusLoaderId: string = UuidHelper.get();
    public downloadLoaderId: string = UuidHelper.get();
    public readonly getByBiddingIdAndApplicationIdLoaderId = UuidHelper.get();

    readonly currentPage = `/private/admin/evaluation/pages/evaluation-details/view`;
    public readonly applicationStatus = ApplicationStatusEnum;
    public readonly dialogHeader = 'Descripción de rechazo';
    @ViewChild(ManagerInformationComponent) generalInformationComponentRef: ManagerInformationComponent;
    @ViewChild(EvaluationComponent) evaluationComponentRef: EvaluationComponent;
    @ViewChild(ManagerDocumentListComponent) managerDocumentListComponentRef: ManagerDocumentListComponent;

    applicationResponseDto: Page<ApplicationResponseDto>;

    public modelIn = (model: ApplicationResponseDto) => model;

    constructor(
        private service: EvaluationService,
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private applicationService: ApplicationService,
        private message: DefaultSystemMessagesService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getByBiddingIdAndApplicationIdStatusHelper(this.biddingId, this.applicationId)), this.getByBiddingIdAndApplicationIdLoaderId);
        this.managerId = this.model.managerId;
        this.organizationId = this.model.organizationId;
        this.updateBreadcrumbByUrl();
        await this.managerDocumentListInit();

    }

    updateBreadcrumbByUrl() {
        this.breadcrumbService.updateBreadcrumbByUrl(`${this.currentPage}/${this.model.bidding.id}/${this.model.id}`, this.model.code);
    }

    cancel(): Promise<any> {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(RejectEvaluationFormComponent, {
                header: this.dialogHeader,
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

    async action(item: any, applicationResponseDto: ApplicationResponseDto) {
        switch (ApplicationStatusEnum[item.id]) {
            case ApplicationStatusEnum.REFUSED:
                const response: any = await this.cancel();
                if (response) {
                    await this.loaderService.activateLoader(() => lastValueFrom(this.service.reject(applicationResponseDto.bidding.id, applicationResponseDto.id, response?.description, response?.allowToAppeal)), this.updateStatusLoaderId);
                    this.message.success();
                    await this.ngInitAll();
                }
                return;
            case ApplicationStatusEnum.APPROVED:
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.approve(applicationResponseDto.bidding.id, applicationResponseDto.id,)), this.updateStatusLoaderId);
                this.message.success();
                await this.ngInitAll();
                return;
            case ApplicationStatusEnum.PENDING:
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.pending(applicationResponseDto.bidding.id, applicationResponseDto.id,)), this.updateStatusLoaderId);
                this.message.success();
                await this.ngOnInit();
                return;
        }
    }

    async ngInitAll() {
        await this.ngOnInit();
        await this.generalInformationComponentRef.ngOnInit();
    }

    /// document list
    async managerDocumentListInit() {
        this.applicationResponseDto = await this.loaderService.activateLoader(() => lastValueFrom(this.applicationService.getAttachmentsByApplicationId(this.applicationId, null)), this.managerDocumentListLoaderId);
    }

    async managerDocumentListPage($event: any) {
        this.applicationResponseDto  = await this.loaderService.activateLoader(() => lastValueFrom(this.applicationService.getAttachmentsByApplicationId(this.applicationId, $event)), this.managerDocumentListLoaderId);
    }

    async managerDocumentListDownload(id: string) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.applicationService.download(this.applicationId, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }

    async managerDocumentListSort($event: any) {
        this.applicationResponseDto = await this.loaderService.activateLoader(() => lastValueFrom(this.applicationService.getAttachmentsByApplicationId(this.applicationId, $event)), this.managerDocumentListLoaderId);
    }
}
