import {Component, ViewChild} from '@angular/core';
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
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
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationType} from "../../../../../shared/enums/declaration-type";
import {DeclarationService} from "../../../../shared/services/declaration.service";
import {ProfileService} from "../../../../../shared/services/auth/profile.service";
import {
    WarningDialogComponent
} from "../../../../shared/components/declaration-warning-dialog/warning-dialog.component";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {
    IndustrialConsumerDeclarationContainerCreateComponent
} from "../../containers/industrial-consumer-declaration-item-create-container/industrial-consumer-declaration-container-create.component";
import {
    IndustrialConsumerDeclarationItemListContainerComponent
} from "../../containers/industrial-consumer-declaration-item-list-container/industrial-consumer-declaration-item-list-container.component";
import moment from "moment";

@Component({
    selector: 'app-industrial-consumer-declaration-view-page',
    templateUrl: './industrial-consumer-declaration-view-page.component.html',
    styleUrl: './industrial-consumer-declaration-view-page.component.scss'
})
export class IndustrialConsumerDeclarationViewPageComponent {

    model: DeclarationResponseDto
    loaderId = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['id'];

    @ViewChild(IndustrialConsumerDeclarationItemListContainerComponent) industrialConsumerDeclarationItemListContainerComponent: IndustrialConsumerDeclarationItemListContainerComponent;

    public organization: OrganizationResponseDto;
    DeclarationStatus = DeclarationStatus
    public organizationId: string;
    protected readonly DeclarationType = DeclarationType;
    protected readonly DeclarationRequestType = DeclarationRequestRecurrence;
    private dialogHeaderEdit: string = 'Declarar toneladas';

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private log: NGXLogger,
        private organizationService: OrganizationService,
        private breadcrumbService: BreadcrumbService,
        private profileService: ProfileService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private service: DeclarationService) {
    }

    public modelIn = (model: DeclarationResponseDto) => model;

    async ngOnInit() {
        this.organizationId = this.profileService.getProfile().organizations[0].id;
        this.log.info('this.organizationId', this.organizationId);
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.byId(this.organizationId, this.id)), this.loaderId);
        this.organization = await lastValueFrom(this.organizationService.getById(this.organizationId));
        this.log.info(this.model);
        this.updateBreadcrumbByUrl(moment(this.model.declarationRequest.declaredMonthYear).toDate(), this.model.declarationRequest.recurrence)
    }

    updateBreadcrumbByUrl(declaredMonthYear: Date | null, type: string) {
        let date: string;
        if (DeclarationRequestRecurrence[type] === DeclarationRequestRecurrence.MONTHLY) {
            date = this.titleCasePipe.transform(this.datePipe.transform(declaredMonthYear, 'MMMM yyyy'));
        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, date);
    }

    async edit() {
        if (DeclarationStatus[this.model.status] == DeclarationStatus.FINALIZED && DeclarationType[this.model.declarationType] === DeclarationType.CONSOLIDATED) {
            const date = this.datePipe.transform(this.model.declarationRequest.endDate, 'dd/MM/yyyy')
            const html = `El plazo de declaración de toneladas ya finalizó el ${date}. Si hay algún error, puedes modificar la información enviada, la cual declararemos a la SMA en el periodo que se habilite para ello. Deseas modificar las toneladas ya declaradas?`
            await this.openDeclarationWarningDialogComponent('Edición de declaración', html);
            this._edit();
            return;
        }
        this._edit();
    }

    async create() {
        if (DeclarationStatus[this.model.status] == DeclarationStatus.OVERDUE && DeclarationRequestRecurrence[this.model.declarationRequest.recurrence] === DeclarationRequestRecurrence.MONTHLY) {
            const date = this.datePipe.transform(this.model.declarationRequest.endDate, 'dd/MM/yyyy')
            const html = `El plazo de declaración de toneladas ya finalizó el ${date}. Por lo tanto, no reportaremos esta declaración a la autoridad, solo la registraremos internamente a menos que la SMA indique lo contrario.`
            await this.openDeclarationWarningDialogComponent('Declaración en retraso', html);
            this._create();
            return;
        }
        this._create();
    }

    openDeclarationWarningDialogComponent(header: string, html: string): Promise<boolean> {
        return new Promise((resolve) => {
            const ref = this.dialogService.open(WarningDialogComponent, {
                header: header,
                data: {
                    html: html,
                },
                width: '700px',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
            });
            ref.onClose.subscribe(async value => {
                if (value) {
                    resolve(true);
                }
            });
        });
    }

    _create() {
        const ref = this.dialogService.open(IndustrialConsumerDeclarationContainerCreateComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                model: this.model
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
                await this.industrialConsumerDeclarationItemListContainerComponent.ngOnInit();
            }
        });
    }

    _edit() {
        // const ref = this.dialogService.open(IndustrialConsumerDeclarationContainerEditComponent, {
        //     header: this.dialogHeaderEdit,
        //     width: '40vw',
        //     modal: true,
        //     data: {
        //         model: this.model
        //     },
        //     breakpoints: {
        //         '960px': '75vw',
        //         '640px': '90vw'
        //     },
        // });
        //
        // ref.onClose.subscribe(async value => {
        //     if (value) {
        //         await this.ngOnInit();
        //         await this.industrialConsumerDeclarationItemListContainerComponent.ngOnInit();
        //     }
        // });
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
}
