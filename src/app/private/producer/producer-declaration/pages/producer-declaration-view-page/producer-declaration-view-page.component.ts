import { Component, ViewChild } from '@angular/core';
import { DeclarationStatus } from '../../../../../shared/enums/declaration-status';
import { DeclarationResponseDto } from '../../../../../shared/models/declaration-response.dto';
import { UuidHelper } from '../../../../../shared/helpers/uuid-helper';
import { OrganizationResponseDto } from '../../../../../shared/models/organization-response.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NGXLogger } from 'ngx-logger';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { BreadcrumbService } from '../../../../../shared/services/breadcrumb';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { DeclarationRequestRecurrence } from '../../../../../shared/enums/declaration-request-recurrence';
import { DeclarationType } from '../../../../../shared/enums/declaration-type';
import { DeclarationService } from '../../../../shared/services/declaration.service';
import { ProfileService } from '../../../../../shared/services/auth/profile.service';
import { ProducerDeclarationItemListContainerComponent } from '../../containers/producer-declaration-item-list-container/producer-declaration-item-list-container.component';
import { ProducerDeclarationContainerCreateComponent } from '../../containers/producer-declaration-container-create/producer-declaration-container-create.component';
import { ProducerDeclarationContainerEditComponent } from '../../containers/producer-declaration-container-edit/producer-declaration-container-edit.component';
import { WarningDialogComponent } from '../../../../shared/components/declaration-warning-dialog/warning-dialog.component';
import { DeclarationRequestStatus } from '../../../../../shared/enums/declaration-request-status';
import moment from 'moment';
import { ProducerDeclarationHelper } from '../../helpers/producer-declaration.helper';
import { LoaderServiceV2 } from '../../../../../shared/services/loader/loader.service-v2';
import { MenuItem } from 'primeng/api';
import { ProducerMassDeclarationComponent } from '../../containers/producer-mass-declaration/producer-mass-declaration.component';

@Component({
    selector: 'app-producer-declaration-view-page',
    templateUrl: './producer-declaration-view-page.component.html',
    styleUrl: './producer-declaration-view-page.component.scss',
})
export class ProducerDeclarationViewPageComponent {
    model: DeclarationResponseDto;
    loaderId = UuidHelper.get();
    id: string = this.activatedRoute.snapshot.params['id'];
    declarationOptions: MenuItem[] = [
        { label: 'Declarar manualmente', command: () => this.create() },
        {
            label: 'Declarar de manera masiva',
            command: () => this.createMassDeclaration(),
        },
    ];

    @ViewChild(ProducerDeclarationItemListContainerComponent)
    producerDeclarationItemListContainerComponentRef: ProducerDeclarationItemListContainerComponent;

    public organization: OrganizationResponseDto;
    DeclarationStatus = DeclarationStatus;
    public organizationId: string;
    protected readonly DeclarationType = DeclarationType;
    protected readonly DeclarationRequestRecurrence =
        DeclarationRequestRecurrence;
    private dialogHeaderEdit: string = 'Declarar toneladas';
    public modelIn = (model: DeclarationResponseDto) => model;

    messages1 = [
        {
            severity: 'info',
            detail: 'Si desea editar su declaración ya enviada, contactar con la persona/sector responsable de GIRO.',
        },
    ];

    constructor(
        private activatedRoute: ActivatedRoute,
        public loaderService: LoaderServiceV2,
        private dialogService: DialogService,
        private log: NGXLogger,
        private organizationService: OrganizationService,
        private breadcrumbService: BreadcrumbService,
        private profileService: ProfileService,
        private datePipe: DatePipe,
        private service: DeclarationService,
        private titleCasePipe: TitleCasePipe,
        private router: Router
    ) {}

    async ngOnInit() {
        this.organizationId =
            this.profileService.getProfile().organizations[0].id;
        this.model = await this.loaderService.activateLoader(
            () =>
                lastValueFrom(this.service.byId(this.organizationId, this.id)),
            this.loaderId
        );
        this.organization = await lastValueFrom(
            this.organizationService.getById(this.organizationId)
        );
        this.log.info(this.model);
        this.updateBreadcrumbByUrl(
            moment(this.model.declarationRequest.declaredMonthYear).toDate(),
            this.model.declarationRequest.recurrence
        );
    }

    get displayCreateAndEditButtons(): boolean {
        if (
            DeclarationRequestRecurrence[
                this.model?.declarationRequest?.recurrence
            ] === DeclarationRequestRecurrence.MONTHLY
        ) {
            return true;
        }

        return (
            DeclarationRequestStatus[this.model?.declarationRequest?.status] !==
                DeclarationRequestStatus.COMPLETED ||
            DeclarationStatus[this.model?.status] === DeclarationStatus.OVERDUE
        );
    }

    updateBreadcrumbByUrl(declaredMonthYear: Date | null, type: string): void {
        let date: string;
        if (
            DeclarationRequestRecurrence[type] ===
            DeclarationRequestRecurrence.MONTHLY
        ) {
            date = this.titleCasePipe.transform(
                this.datePipe.transform(declaredMonthYear, 'MMMM yyyy')
            );
        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }

        this.breadcrumbService.updateBreadcrumbByUrl(
            `${location.pathname}`,
            date
        );
    }

    async edit() {
        if (this.displayModal()) {
            const date = this.datePipe.transform(
                this.model.declarationRequest.endDate,
                'dd/MM/yyyy'
            );
            const html = `El plazo de declaración de toneladas ya finalizó el ${date}. Si hay algún error, puedes modificar la información enviada, la cual declararemos a la SMA en el periodo que se habilite para ello. Deseas modificar las toneladas ya declaradas?`;
            await this.openDeclarationWarningDialogComponent(
                'Edición de declaración',
                html
            );
            this._edit();
            return;
        }
        this._edit();
    }

    handleMenuItemClick(item: MenuItem, event: Event) {
        event.stopPropagation();

        if (item.command) {
            item.command({ originalEvent: event, item });
        }
    }

    async create() {
        if (
            DeclarationStatus[this.model.status] ===
                DeclarationStatus.OVERDUE &&
            DeclarationRequestRecurrence[
                this.model.declarationRequest.recurrence
            ] === DeclarationRequestRecurrence.MONTHLY
        ) {
            const date = this.datePipe.transform(
                this.model.declarationRequest.endDate,
                'dd/MM/yyyy'
            );
            const html = `El plazo de declaración de toneladas ya finalizó el ${date}. Por lo tanto, no reportaremos esta declaración a la autoridad, solo la registraremos internamente a menos que la SMA indique lo contrario.`;
            await this.openDeclarationWarningDialogComponent(
                'Declaración en retraso',
                html
            );
            this._create();
            return;
        }
        this._create();
    }

    createMassDeclaration() {
        const ref = this.dialogService.open(ProducerMassDeclarationComponent, {
            header: 'Declaración masiva de toneladas',
            width: '40vw',
            modal: true,
            data: {
                declarationType:
                    DeclarationRequestRecurrence[
                        this.model.declarationRequest.recurrence
                    ],
                id: this.id,
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
        });

        ref.onClose.subscribe(async () => {
            await this.ngOnInit();
        });
    }

    openDeclarationWarningDialogComponent(
        header: string,
        html: string
    ): Promise<boolean> {
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
                    '640px': '90vw',
                },
            });
            ref.onClose.subscribe(async (value) => {
                if (value) {
                    resolve(true);
                }
            });
        });
    }

    _create() {
        const ref = this.dialogService.open(
            ProducerDeclarationContainerCreateComponent,
            {
                header: this.dialogHeaderEdit,
                width: '40vw',
                modal: true,
                data: {
                    model: this?.model,
                    organization: this.organization,
                },
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw',
                },
            }
        );

        ref.onClose.subscribe(async (value) => {
            if (value) {
                await this.ngOnInit();
                await this.producerDeclarationItemListContainerComponentRef.ngOnInit();
            }
        });
    }

    _edit() {
        const ref = this.dialogService.open(
            ProducerDeclarationContainerEditComponent,
            {
                header: this.dialogHeaderEdit,
                width: '40vw',
                modal: true,
                data: {
                    model: this?.model,
                    organization: this.organization,
                },
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw',
                },
            }
        );

        ref.onClose.subscribe(async (value) => {
            if (value) {
                await this.ngOnInit();
                await this.producerDeclarationItemListContainerComponentRef.ngOnInit();
            }
        });
    }

    private displayModal(): boolean {
        return ProducerDeclarationHelper.displayModal(
            DeclarationStatus[this.model.status],
            this.model?.declarationRequest?.endDate,
            DeclarationRequestRecurrence[
                this.model.declarationRequest.recurrence
            ]
        );
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
}
