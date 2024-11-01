import {Component, ViewChild} from '@angular/core';
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader";
import {DialogService} from "primeng/dynamicdialog";
import {NGXLogger} from "ngx-logger";
import {OrganizationService} from "../../../../shared/services/organization.service";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {lastValueFrom} from "rxjs";
import {DeclarationType} from 'src/app/shared/enums/declaration-type';
import {ConfirmationService, MenuItem} from "primeng/api";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {
    BackyardDeclarationContainerEditComponent
} from "../../containers/backyard-declaration-item-edit-container/backyard-declaration-container-edit.component";
import {
    BackyardDeclarationItemListContainerComponent
} from "../../containers/backyard-declaration-item-list-container/backyard-declaration-item-list-container.component";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {
    BackyardDeclarationContainerCreateComponent
} from "../../containers/backyard-declaration-item-create-container/backyard-declaration-container-create.component";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';

@Component({
    selector: 'app-backyard-declaration-request-detail-view-page',
    templateUrl: './backyard-declaration-request-detail-view-page.component.html',
    styleUrl: './backyard-declaration-request-detail-view-page.component.scss',
    providers: [
        TitleCasePipe
    ]
})
export class BackyardDeclarationRequestDetailViewPageComponent {

    model: DeclarationResponseDto
    loaderId = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['declarationId'];
    requestId: string = this.activatedRoute.snapshot.params['id'];
    organization: OrganizationResponseDto;

    @ViewChild(BackyardDeclarationItemListContainerComponent) backyardDeclarationItemListContainerComponent: BackyardDeclarationItemListContainerComponent;

    DeclarationStatus                  = DeclarationStatus
    protected readonly DeclarationType = DeclarationType;
    private dialogHeaderEdit: string   = 'Editar declaración de toneladas';
    private dialogHeaderCreate: string = 'Declarar toneladas';

    public modelIn = (model: DeclarationResponseDto) => model;

    changeStatusLoaderId = UuidHelper.get();
    approveMessage: string = 'Una vez que apruebes esta declaración, las toneladas serán agregadas al stock no domiciliario ¿Estás seguro que deseas continuar?';

    public statuses: MenuItem[] = [
        {
            label: 'Aprobar',
            key: GeneralHelper.getKeyByValue(DeclarationStatus, DeclarationStatus.APPROVED)
        }
    ]

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private log: NGXLogger,
        private organizationService: OrganizationService,
        private breadcrumbService: BreadcrumbService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private confirmationService: ConfirmationService,
        private service: DeclarationRequestService,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        ) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.declarationById(this.requestId, this.id)), this.loaderId);
        this.organization = await lastValueFrom(this.organizationService.getById(this.model.organization.id));
        this.log.info(this.model);
        this.updateBreadcrumbByUrl(this.model.declarationRequest.declaredMonthYear, this.model.declarationRequest.recurrence)
    }

    updateBreadcrumbByUrl(declaredMonthYear: string, type: string) {
        let date: string;
        if (DeclarationRequestRecurrence[type] === DeclarationRequestRecurrence.MONTHLY) {
            date = this.titleCasePipe.transform(this.datePipe.transform(declaredMonthYear, 'MMMM yyyy'));;
        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, date);
    }

    edit() {
        const ref = this.dialogService.open(BackyardDeclarationContainerEditComponent, {
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
                await this.backyardDeclarationItemListContainerComponent.ngOnInit();
            }
        });
    }

   async action(item: any, id: string) {
       this.confirmationService.confirm({
           message: this.approveMessage,
           header: 'Advertencia',
           icon: 'pi pi-exclamation-triangle',
           acceptIcon: "Sí",
           rejectIcon: "No",
           rejectButtonStyleClass: "p-button-text",
           accept: async () => {
               this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.approve(this.requestId, id)), this.changeStatusLoaderId);
               this.defaultSystemMessagesService.success();
               await this.ngOnInit();
           },
       });
    }

    create() {
        const ref = this.dialogService.open(BackyardDeclarationContainerCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                model: this?.model
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
                await this.backyardDeclarationItemListContainerComponent.ngOnInit();
                // await this.declarationHistoryListContainerComponentRef.ngOnInit();
            }
        });
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
}
