import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DatePipe, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {BiddingResponseDto} from "../../../../shared/models/bidding-response.dto";
import {LoaderService} from "../../../../shared/services/loader";
import {BreadcrumbService} from "../../../../shared/services/breadcrumb";
import {BiddingEditComponent} from "../../../admin/bidding/components/bidding-edit/bidding-edit.component";
import {AppViewDataComponent} from "../../../../shared/components/app-view-data/app-view-data.component";
import {BiddingType} from 'src/app/shared/enums/bidding-type.enum';
import {GiroDataViewComponent} from "../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {SkeletonModule} from "primeng/skeleton";
import {HasAnyRolePipeModule} from "../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {Role} from "../../../../shared/enums/role";

@Component({
    standalone: true,
    imports: [
        GiroDataViewComponent,
        AppViewDataComponent,
        SkeletonModule,
        DatePipe,
        NgSwitch,
        NgSwitchCase,
        NgIf,
        HasAnyRolePipeModule
    ],
    selector: 'app-general-information',
    templateUrl: './general-information.component.html',
    styleUrl: './general-information.component.scss'
})
export class GeneralInformationComponent {

    @Input()
    model: BiddingResponseDto;

    loaderId: string = 'service-get';
    ref: DynamicDialogRef | undefined;
    readonly dialogHeaderEdit = 'Editar licitación';

    @Output() updatedEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(public loaderService: LoaderService,
                private dialogService: DialogService,
                private breadcrumbService: BreadcrumbService,

    ) {}

    async ngOnInit() {
        this.updateBreadcrumbByUrl();
    }

    updateBreadcrumbByUrl() {
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, this.model.idBali);
    }

    entityDataEdit() {
        this.ref = this.dialogService.open(BiddingEditComponent, {
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

        this.ref.onClose.subscribe(async value => {
            if (value) {
                this.updatedEvent.emit()
            }
        });
    }

    protected readonly BiddingType = BiddingType;
    protected readonly Roles = Role;
}
