import {Component, ViewChild} from '@angular/core';
import {DatePipe, TitleCasePipe} from "@angular/common";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {
    DeclarationItemListContainerComponent
} from "../../containers/declaration-item-list-container/declaration-item-list-container.component";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {lastValueFrom} from "rxjs";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {
    DeclarationContainerEditComponent
} from "../../containers/declaration-item-edit-container/declaration-container-edit.component";
import {DialogService} from "primeng/dynamicdialog";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {BreadcrumbService} from 'src/app/shared/services/breadcrumb';
import {
    DeclarationHistoryListContainerComponent
} from "../../containers/declaration-history-list-container/declaration-history-list-container.component";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {
    DeclarationContainerCreateComponent
} from '../../containers/declaration-item-create-container/declaration-container-create.component';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';

@Component({
    selector: 'app-declaration-request-detail-view-page',
    templateUrl: './declaration-request-detail-view-page.component.html',
    styleUrl: './declaration-request-detail-view-page.component.scss',
    providers: [TitleCasePipe]
})
export class DeclarationRequestDetailViewPageComponent {

    model: DeclarationResponseDto
    loaderId = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['declarationId'];
    requestId: string = this.activatedRoute.snapshot.params['id'];
    @ViewChild(DeclarationItemListContainerComponent) declaredTonsListContainerComponentRef: DeclarationItemListContainerComponent;
    @ViewChild(DeclarationHistoryListContainerComponent) declarationHistoryListContainerComponentRef: DeclarationHistoryListContainerComponent;
    public organization: OrganizationResponseDto;
    DeclarationStatus = DeclarationStatus
    protected readonly DeclarationType = DeclarationType;
    private dialogHeaderEdit: string = 'Editar declaración de toneladas';

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderServiceV2,
        private dialogService: DialogService,
        private log: NGXLogger,
        private organizationService: OrganizationService,
        private breadcrumbService: BreadcrumbService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private service: DeclarationRequestService) {
    }

    public modelIn = (model: DeclarationResponseDto) => model;

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationById(this.requestId, this.id)), this.loaderId);
        this.organization = await lastValueFrom(this.organizationService.getById(this.model.organization.id));
        this.log.info(this.model);
        this.updateBreadcrumbByUrl(this.model.declarationRequest.declaredMonthYear, this.model.declarationRequest.recurrence)
    }

    updateBreadcrumbByUrl(declaredMonthYear: string, type: string) {
        let date: string;
        if (DeclarationRequestRecurrence[type] === DeclarationRequestRecurrence.MONTHLY) {
            date = this.titleCasePipe.transform(this.datePipe.transform(declaredMonthYear, 'MMMM yyyy'));

        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, date);
    }

    edit() {
        const ref = this.dialogService.open(DeclarationContainerEditComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                model: this?.model,
                organization: this.organization
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
                await this.declaredTonsListContainerComponentRef.ngOnInit();
                await this.declarationHistoryListContainerComponentRef.ngOnInit();
            }
        });
    }

    create() {
        const ref = this.dialogService.open(DeclarationContainerCreateComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                model: this?.model,
                organization: this.organization
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
                await this.declaredTonsListContainerComponentRef.ngOnInit();
                await this.declarationHistoryListContainerComponentRef.ngOnInit();
            }
        });
    }
}
