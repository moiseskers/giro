import {Component, ViewChild} from '@angular/core';
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {ActivatedRoute} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {BreadcrumbService} from "../../../../../shared/services/breadcrumb";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {MenuItem} from "primeng/api";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestService} from "../../../../shared/services/declaration-request.service";
import {
    BackyardDeclarationRequestEditContainerComponent
} from "../../containers/backyard-declaration-request-edit-container/backyard-declaration-request-edit-container.component";
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {
    BackyardDeclarationListContainerComponent
} from '../../containers/backyard-declaration-list-container/backyard-declaration-list-container.component';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';

@Component({
    selector: 'app-backyard-declaration-request-view-page',
    templateUrl: './backyard-declaration-request-view-page.component.html',
    styleUrl: './backyard-declaration-request-view-page.component.scss',
    providers: [TitleCasePipe]
})
export class BackyardDeclarationRequestViewPageComponent {

    DeclarationStatus = DeclarationStatus;
    model: DeclarationRequestResponseDto;
    id: string = this.activatedRoute.snapshot.params['id'];
    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
    public modelIn = (model: DeclarationRequestResponseDto) => model;
    public byIdLoaderId: string = UuidHelper.get();
    items: MenuItem[];
    dialogHeaderEdit: string = 'Editar solicitud de declaración';

    changeStatusLoaderId: string = UuidHelper.get();
    downloadLoaderId: string = UuidHelper.get();

    @ViewChild(BackyardDeclarationListContainerComponent) backyardDeclarationListContainerComponent: BackyardDeclarationListContainerComponent;

    constructor(
        public loaderService: LoaderServiceV2,
        private dialogService: DialogService,
        private breadcrumbService: BreadcrumbService,
        private datePipe: DatePipe,
        private titleCasePipe: TitleCasePipe,
        private activatedRoute: ActivatedRoute,
        private service: DeclarationRequestService,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
    ) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.byIdStatusHelper(this.id)), this.byIdLoaderId);
        this.items = this.model.statuses;
        this.updateBreadcrumbByUrl(this.model.declaredMonthYear, this.model.recurrence)
    }

    updateBreadcrumbByUrl(declaredMonthYear: string, type: string): void {
        let date: string;
        if (DeclarationRequestRecurrence[type] === DeclarationRequestRecurrence.MONTHLY) {
            date = this.titleCasePipe.transform(this.datePipe.transform(declaredMonthYear, 'MMMM yyyy'));;
        } else {
            date = this.datePipe.transform(declaredMonthYear, 'yyyy');
        }
        this.breadcrumbService.updateBreadcrumbByUrl(`${location.pathname}`, date);
    }

    async download() {
        const blob = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(this.id)), this.downloadLoaderId);
        GeneralHelper.downloadBlob(blob);
    }

    edit() {
        const ref = this.dialogService.open(BackyardDeclarationRequestEditContainerComponent, {
            header: this.dialogHeaderEdit,
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
                await this.ngOnInit();
                await this.backyardDeclarationListContainerComponent.ngOnInit();
            }
        });
    }

    async action(item: any, id: any) {
        if (DeclarationRequestStatus[this.model.status] === DeclarationRequestStatus.BLOCKED) {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.unblock(this.id)), this.changeStatusLoaderId);
        } else {
            await this.loaderService.activateLoader(() => lastValueFrom(this.service.block(this.id)), this.changeStatusLoaderId);
        }
        this.defaultSystemMessagesService.success();
        await this.ngOnInit();
    }

}
