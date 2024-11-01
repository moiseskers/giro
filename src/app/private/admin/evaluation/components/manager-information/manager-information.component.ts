import {Component, Input} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {lastValueFrom} from "rxjs";
import {HiringStatus} from "../../../../../shared/enums/hiring-status";
import {ManagerResponseDto} from "../../../../../shared/models/manager-response.dto";
import {UserType} from "../../../../../shared/enums/user-type";
import {LoaderService} from "../../../../../shared/services/loader";
import {OrganizationTypeEnum} from "../../../../../shared/enums/organization-type.enum";
import {SkeletonModule} from "primeng/skeleton";
import {GiroDataViewComponent} from "../../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {AppViewDataComponent} from "../../../../../shared/components/app-view-data/app-view-data.component";
import {NgIf} from "@angular/common";
import {OrganizationService} from "../../../../shared/services/organization.service";

@Component({
    selector: 'app-manager-information',
    templateUrl: './manager-information.component.html',
    styleUrl: './manager-information.component.scss',
    standalone: true,
    imports: [
        SkeletonModule,
        GiroDataViewComponent,
        AppViewDataComponent,
        NgIf
    ]
})
export class ManagerInformationComponent {

    @Input()
    managerId: string;

    @Input()
    organizationId: string;

    model: ManagerResponseDto;

    loaderId: string = 'service-get';
    ref: DynamicDialogRef | undefined;

    loading = true;

    constructor(private service: OrganizationService, public loaderService: LoaderService,) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader<ManagerResponseDto>(() => lastValueFrom(this.service.getManager(this.managerId, this.organizationId)), this.loaderId);
        this.loading = false;
    }

    protected readonly OrganizationTypes = OrganizationTypeEnum;
    protected readonly HiringStatus = HiringStatus;
    protected readonly UserType = UserType;
}
