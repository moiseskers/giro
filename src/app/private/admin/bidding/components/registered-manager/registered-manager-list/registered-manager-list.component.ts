import {Component} from '@angular/core';
import {LoaderService} from "../../../../../../shared/services/loader";
import {Page} from "../../../../../../shared/objects/page";
import {lastValueFrom} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {v4 as uuidv4} from 'uuid';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DeleteService} from "../../../../../../shared/services/delete/delete.service";
import {UuidHelper} from "../../../../../../shared/helpers/uuid-helper";
import {RegisteredManagerCreateComponent} from "../registered-manager-create/registered-manager-create.component";
import {RegisteredManagerResponseDto} from "../../../../../../shared/models/registered-manager-response.dto";
import {RegisteredManagerService} from "../../../services/registered-manager.service";
import {MenuItem} from "primeng/api";
import {Filter} from "../../../../../../shared/components/app-filter/models/filter";
import {GeneralHelper} from "../../../../../../shared/helpers/general-helper";
import {DefaultSystemMessagesService} from "../../../../../../shared/components/defaut-system-message-service";
import {
    RegisteredManagerEvaluationStatus
} from "../../../../../../shared/enums/registered-manager-evaluation-status.enum";
import {FilterHistoryHelper} from "../../../../../../shared/helpers/filter-history.helper";

@Component({
    selector: 'app-registered-manager-list',
    templateUrl: './registered-manager-list.component.html',
    styleUrl: './registered-manager-list.component.scss'
})
export class RegisteredManagerListComponent {

    public readonly loaderUserServiceGet = uuidv4();
    public readonly downloadLoaderId: string = UuidHelper.get()

    model: Page<RegisteredManagerResponseDto>;
    public modelIn = (model: RegisteredManagerResponseDto) => model;

    biddingId: string = this.activatedRoute.snapshot.params['id'];
    ref: DynamicDialogRef | undefined;
    readonly deleteMessage = 'Desea confirmar la eliminación del documento?';
    readonly dialogHeaderCreate = 'Nuevo documento';
    items: MenuItem[] | undefined;

    filterHelper: FilterHistoryHelper = new FilterHistoryHelper();

    constructor(private service: RegisteredManagerService,
                public loaderService: LoaderService,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.biddingId, null)), this.loaderUserServiceGet);
    }

    async page($event: any) {
        this.filterHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.biddingId, $event)), this.loaderUserServiceGet);
        });
    }

    async filter($event: any) {
        this.filterHelper.filter($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.biddingId, $event)), this.loaderUserServiceGet);
        });
    }

    async sort($event: any) {
        this.filterHelper.sort($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.biddingId, $event)), this.loaderUserServiceGet);
        });
    }

    filterProcess($event: any): void {
        if ($event?.applicationDateBegin) {
            const applicationDateEnd = $event?.applicationDateBegin.split(',')[1];
            $event.applicationDateBegin = $event?.applicationDateBegin.split(',')[0];
            $event = {
                applicationDateEnd: applicationDateEnd,
                ...$event
            }
        }
        this.filter($event);
    }

    new(): void {
        this.ref = this.dialogService.open(RegisteredManagerCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                biddingId: this.biddingId
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

    async delete(id: string) {
        await this.deleteService.confirmationDialog({
            message: this.deleteMessage
        });

        await lastValueFrom(this.service.delete(this.biddingId, id));
        await this.ngOnInit();
        this.message.success();
    }

    async download() {
        this.service.download(this.biddingId).subscribe((blob: Blob) => {
            GeneralHelper.downloadBlob(blob);
        });
    }

    filters: Filter[] = [
        {
            base: true,
            fields: [
                {
                    term: 'Buscar por ID de inscripción',
                    type: 'text',
                    name: 'search',
                    label: 'Buscar por ID de inscripción',
                },
            ]
        },
        {
            title: 'Fecha de inscripción',
            fields: [
                {
                    term: 'Fecha de inscripción',
                    type: 'date',
                    name: 'applicationDateBegin',
                    label: 'Fecha de inscripción',
                    placeholder: '--/--/---- - --/--/----',
                    config: {
                        selectionMode: 'range'
                    },
                },
            ]
        },
        {
            title: 'Estado',
            fields: [
                {
                    term: 'Estado',
                    type: 'multiselect-checkbox',
                    name: 'status',
                    label: 'Estado',
                    options:   GeneralHelper.enumToList(RegisteredManagerEvaluationStatus, 'label', 'key')
                },
            ]
        },
    ];
}
