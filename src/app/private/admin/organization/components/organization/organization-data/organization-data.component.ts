import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoaderService} from '../../../../../../shared/services/loader';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {HiringStatus} from '../../../../../../shared/enums/hiring-status';
import {OrganizationEditComponent} from '../organization-edit/organization-edit.component';
import {CategoryTypeEnum} from "../../../../../../shared/enums/category-type.enum";
import {PartnerTypeEnum} from "../../../../../../shared/enums/partner-type.enum";
import {OrganizationTypeEnum} from "../../../../../../shared/enums/organization-type.enum";
import {OrganizationResponseDto} from "../../../../../../shared/models/organization-response.dto";
import {SkeletonModule} from "primeng/skeleton";
import {GiroDataViewComponent} from "../../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AppViewDataComponent} from "../../../../../../shared/components/app-view-data/app-view-data.component";
import {SeparationArrayPipeModule} from "../../../../../../shared/pipes/separation-array/separation-array-pipe.module";
import {HasAnyRolePipeModule} from "../../../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {Role} from "../../../../../../shared/enums/role";

@Component({
    selector: 'app-organization-data',
    templateUrl: './organization-data.component.html',
    standalone: true,
    imports: [
        SkeletonModule,
        GiroDataViewComponent,
        NgSwitch,
        AppViewDataComponent,
        NgSwitchCase,
        SeparationArrayPipeModule,
        NgIf,
        HasAnyRolePipeModule
    ]
})
export class OrganizationDataComponent {

    @Input()
    model: OrganizationResponseDto;

    @Input()
    loaderId: string;

    ref: DynamicDialogRef | undefined;

    readonly dialogHeaderEdit = 'Editar entidad';

    @Input()
    barTitle: string;

    @Output()
    closed: EventEmitter<any> = new EventEmitter<any>();

    constructor(public loaderService: LoaderService,
                private dialogService: DialogService,

    ) {}

    async ngOnInit() {
        if (!this.model) {
            throw Error('model must be defined!')
        }
    }

    entityDataEdit() {
        this.ref = this.dialogService.open(OrganizationEditComponent, {
            header: this.dialogHeaderEdit,
            width: '40vw',
            modal: true,
            data: {
                organization: this?.model
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe(async value => {
            if (value === 'modified') {
                await this.ngOnInit();
                this.closed.emit()
            }
        });
    }

    protected readonly OrganizationTypes = OrganizationTypeEnum;
    protected readonly HiringStatus = HiringStatus;
    protected readonly ProducerType = CategoryTypeEnum;
    protected readonly PartnerType = PartnerTypeEnum;
    protected readonly Roles = Role;
}
