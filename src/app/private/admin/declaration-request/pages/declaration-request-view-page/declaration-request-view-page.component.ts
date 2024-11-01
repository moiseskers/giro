import {Component, ViewChild} from '@angular/core';
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {MenuItem} from "primeng/api";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {LoaderService} from "../../../../../shared/services/loader";
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {DialogService} from "primeng/dynamicdialog";
import {
    DeclarationRequestEditContainerComponent
} from "../../containers/declaration-request-edit-container/declaration-request-edit-container.component";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {
    DeclarationListContainerComponent
} from '../../containers/declaration-list-container/declaration-list-container.component';

@Component({
    selector: 'app-declaration-request-view-page',
    templateUrl: './declaration-request-view-page.component.html',
    styleUrl: './declaration-request-view-page.component.scss'
})
export class DeclarationRequestViewPageComponent {

    model: DeclarationRequestResponseDto;
    massStatus = DeclarationStatus;

    public modelIn = (model: DeclarationRequestResponseDto) => model;
    id: string = this.activatedRoute.snapshot.params['id'];
    public readonly byIdLoaderId: string = UuidHelper.get();
    private readonly dialogHeader = 'Editar solicitud de declaración';
    public downloadLoaderId = UuidHelper.get();

    items: MenuItem[];
    changeStatusLoaderId: string = UuidHelper.get();

    @ViewChild(DeclarationListContainerComponent) declarationListContainerComponent: DeclarationListContainerComponent

    constructor(
        public loaderService: LoaderService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private service: DeclarationRequestService) {}

    async ngOnInit() {
        this.stateDisabled = true;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.byIdStatusHelper(this.id)), this.byIdLoaderId);
        this.items = this.model.statuses;
        this.updateBreadcrumbByUrl(this.model.declaredMonthYear, this.model.recurrence);
        this.stateDisabled = false;
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
        const ref = this.dialogService.open(DeclarationRequestEditContainerComponent, {
            header: this.dialogHeader,
            data: {
                model: this.model,
            },
            width: '40vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.declarationListContainerComponent.ngOnInit();
                await this.ngOnInit();
            }
        });
    }

    async download() {
        this.service.downloadDirectly(this.id);
    }

    async action(item: any, id: any) {
        console.log(this.model.status);

        if (DeclarationRequestStatus[this.model.status] === DeclarationRequestStatus.BLOCKED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.unblock(this.id)), this.changeStatusLoaderId);
        } else {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.block(this.id)), this.changeStatusLoaderId);
        }
        await this.ngOnInit();
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
    stateDisabled: boolean | undefined = false;
}
