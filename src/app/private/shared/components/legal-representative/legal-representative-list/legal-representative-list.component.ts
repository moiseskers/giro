import {Component, Input} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LegalRepresentativeCreateComponent} from "../legal-representative-create/legal-representative-create.component";
import {LegalRepresentativeEditComponent} from "../legal-representative-edit/legal-representative-edit.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {NgxMaskPipe} from "ngx-mask";
import {HasAnyRolePipeModule} from "../../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {AppPaginatorModule} from "../../../../../shared/components/app-paginator";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {LegalRepresentativeResponseDto} from "../../../../../shared/models/legal-representative-response.dto";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {PaginatorHelper} from "../../../../../shared/helpers/paginator.helper";
import {LegalRepresentativeService} from "../../../services/legal-representative.service";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {Role} from "../../../../../shared/enums/role";
import {BlockUIModule} from "primeng/blockui";
import {DockModule} from "primeng/dock";

@Component({
    selector: 'app-legal-representative-list',
    templateUrl: './legal-representative-list.component.html',
    styleUrl: './legal-representative-list.component.scss',
    standalone: true,
    imports: [
        GiroDataViewComponent,
        TableModule,
        ButtonModule,
        AppPaginatorModule,
        NgIf,
        NgxMaskPipe,
        HasAnyRolePipeModule,
        BlockUIModule,
        DockModule
    ]
})
export class LegalRepresentativeListComponent {

    @Input()
    blockedPanel: boolean = false;

    loaderId = UuidHelper.get();
    legalRepresentativeServiceGetById = UuidHelper.get();

    model: Page<LegalRepresentativeResponseDto>;
    organizationId: string = this.activatedRoute.snapshot.params['id'];
    ref: DynamicDialogRef | undefined;

    public modelIn = (model: LegalRepresentativeResponseDto) => model;
    isVisible: boolean = false;
    private dialogHeaderCreate: string = 'Nuevo representante';

    constructor(private service: LegalRepresentativeService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService,
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId);
    }

    page($event: any): void {
        PaginatorHelper.page($event, async () => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.organizationId)), this.loaderId);
        });
    }

    new(): void  {
        this.ref = this.dialogService.open(LegalRepresentativeCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value==='modified') {
                await this.ngOnInit();
            }
        });
    }

    async edit(id: string) {
        const model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getById(this.organizationId, id)), this.legalRepresentativeServiceGetById);

        this.ref = this.dialogService.open(LegalRepresentativeEditComponent, {
            header: 'Editar representante',
            width: '40vw',
            modal: true,
            data: {
                organizationId: this.organizationId,
                id: id,
                model: model
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value==='modified') {
                await this.ngOnInit();
            }
        });
    }

    async delete(id: string) {
        await this.deleteService.confirmationDialog({
            message: 'Deseas confirmar la exclusión del representante?'
        });

        await lastValueFrom(this.service.delete(this.organizationId, id));
        await this.ngOnInit();
        this.message.success();
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
    }

    protected readonly Roles = Role;

}
