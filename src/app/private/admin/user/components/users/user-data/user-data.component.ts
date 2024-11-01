import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ManagerResponseDto} from "../../../../../../shared/models/manager-response.dto";
import {ManagerService} from "../../../../../shared/services/manager.service";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {OrganizationTypeEnum} from "../../../../../../shared/enums/organization-type.enum";
import {UserType} from "../../../../../../shared/enums/user-type";
import {LoaderService} from "../../../../../../shared/services/loader";
import {BreadcrumbService} from "../../../../../../shared/services/breadcrumb";
import {AppViewData} from "../../../../../../shared/components/app-view-data/app-view-data.component";

@Component({
    selector: 'app-user-data',
    templateUrl: './user-data.component.html',
})
export class UserDataComponent {

    id: string = this.activatedRoute.snapshot.params['id'];

    appViewData: AppViewData[] = [];
    model: ManagerResponseDto;

    loaderId: string = 'service-get';
    ref: DynamicDialogRef | undefined;

    readonly dialogHeaderEdit = 'Editar usuario';
    private readonly _updateBreadcrumbByUrl = `/private/admin/user/pages/view`;

    constructor(private service: ManagerService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private breadcrumbService: BreadcrumbService,
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader<ManagerResponseDto>(() => lastValueFrom(this.service.getById(this.id)), this.loaderId);
        this.updateBreadcrumbByUrl();
    }

    updateBreadcrumbByUrl() {
        this.breadcrumbService.updateBreadcrumbByUrl(`${this._updateBreadcrumbByUrl}/${this.model.id}`, this.model.name);
    }

    edit() {
        this.ref = this.dialogService.open(UserEditComponent, {
            header: this.dialogHeaderEdit,
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

        this.ref.onClose.subscribe(async value => {
            if (value === 'modified') {
                await this.ngOnInit();
            }
        });
    }


    protected readonly OrganizationTypes = OrganizationTypeEnum;
    protected readonly UserType = UserType;
}
