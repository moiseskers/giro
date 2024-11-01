import {Component, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {RejectedFormComponent} from "../../components/rejected-form/rejected-form.component";
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";
import {OrganizationDataComponent} from "../../components/organization/organization-data/organization-data.component";
import {OrganizationStatusEnum} from "../../../../../shared/enums/organization-status-enum";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {
    OrganizationUserListComponent
} from "../../components/organization-user/organization-user-list/organization-user-list.component";
import {
    OrganizationDocumentListContainerComponent
} from "../../../../shared/components/document/document-list/organization-document-list-container.component";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {
    LegalRepresentativeListComponent
} from "../../../../shared/components/legal-representative/legal-representative-list/legal-representative-list.component";
import {BranchesListComponent} from "../../../../shared/components/branch/branch-list/branches-list.component";

@Component({
    selector: 'app-view-organization',
    templateUrl: './view-organization.component.html',
    styleUrl: './view-organization.component.scss',
})
export class ViewOrganizationComponent {

    ref: DynamicDialogRef | undefined;
    id: string = this.activatedRoute.snapshot.params['id'];
    model: OrganizationResponseDto;

    organizationDataLoaderId = UuidHelper.get();

    @ViewChild(OrganizationDataComponent)        orgDataComponent: OrganizationDataComponent;
    @ViewChild(LegalRepresentativeListComponent) legalRepListComponent: LegalRepresentativeListComponent;
    @ViewChild(OrganizationUserListComponent)    orgUserListComponent: OrganizationUserListComponent;
    @ViewChild(BranchesListComponent)            branchesListComponent: BranchesListComponent;
    @ViewChild(OrganizationDocumentListContainerComponent)            docListComponent: OrganizationDocumentListContainerComponent;

    constructor(
        private service: OrganizationService,
        public  loaderService: LoaderService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private message: DefaultSystemMessagesService) {
    }

    async ngOnInit() {
        // get organization-data
        this.model = await this.loaderService.activateLoader<OrganizationResponseDto>(() => lastValueFrom(this.service.getByIdStatusHelper(this.id)), this.organizationDataLoaderId);
        this.updateBreadcrumbByUrl();
    }

    updateBreadcrumbByUrl() {
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, this.model.businessName);
    }

    ngInitAllChildComponents() {
        this.ngOnInit();
        this.legalRepListComponent?.ngOnInit();
        this.orgUserListComponent?.ngOnInit();
        this.branchesListComponent?.ngOnInit();
        this.docListComponent?.ngOnInit();
    }

    async menuAction(item:any) {
        const status = OrganizationStatusEnum[item.id];
        if (status === OrganizationStatusEnum.ACTIVE) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.updateStatusApprove(this.id)), this.organizationDataLoaderId);
            this.ngInitAllChildComponents();
            this.message.success();
            return ;
        }

        if (status === OrganizationStatusEnum.REFUSED) {
            const response = await this.rejected();
            if (response) {
                await this.loaderService.activateLoader(() => lastValueFrom(this.service.updateStatusReprove(this.id, response.rejectedDescription)), this.organizationDataLoaderId);
                this.message.success();
                this.ngInitAllChildComponents();
            }
            return ;
        }

        if (status === OrganizationStatusEnum.INACTIVE) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.updateStatusDisable(this.id)), this.organizationDataLoaderId);
            this.message.success();
            this.ngInitAllChildComponents();
            return ;
        }
    }

    rejected(): Promise<any> {
        return new Promise(resolve => {
            this.ref = this.dialogService.open(RejectedFormComponent, {
                header: 'Descripción de rechazo',
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

    protected readonly organizationTypes = OrganizationTypeEnum;
}
