import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProcessFileService} from "../../../services/process-file.service";
import {ProcessFilesCreateComponent} from "../process-files-create/process-files-create.component";
import {Page} from "../../../../../shared/objects/page";
import {LoaderService} from "../../../../../shared/services/loader";
import {DeleteService} from "../../../../../shared/services/delete/delete.service";
import {DefaultSystemMessagesService} from "../../../../../shared/components/defaut-system-message-service";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {Role} from "../../../../../shared/enums/role";
import {GroupResponseDto} from "../../../../../shared/models/group-response.dto";
import {FilterHistoryHelper} from "../../../../../shared/helpers/filter-history.helper";

@Component({
    selector: 'app-process-files-list',
    templateUrl: './process-files-list.component.html',
    styleUrl: './process-files-list.component.scss'
})
export class ProcessFilesListComponent {

    readonly loaderUserServiceGet = uuidv4();
    public readonly downloadLoaderId: string = UuidHelper.get()

    model: Page<GroupResponseDto>;
    public modelIn = (model: GroupResponseDto) => model;

    @Input()
    id: string;

    ref: DynamicDialogRef | undefined;
    readonly deleteMessage = 'Desea confirmar la eliminación del documento?';
    readonly dialogHeaderCreate = 'Nuevo documento';
    filterHistoryHelper = new FilterHistoryHelper();

    constructor(private service: ProcessFileService,
                public loaderService: LoaderService,
                private dialogService: DialogService,
                private message: DefaultSystemMessagesService,
                private deleteService: DeleteService
    ) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.id, null)), this.loaderUserServiceGet);
        this.countButtons();
    }

    async page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.id, $event)), this.loaderUserServiceGet);
        });
    }

    async sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(this.id, $event)), this.loaderUserServiceGet);
        });
    }

    new(): void {
        this.ref = this.dialogService.open(ProcessFilesCreateComponent, {
            header: this.dialogHeaderCreate,
            width: '40vw',
            modal: true,
            data: {
                biddingId: this.id
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

        await lastValueFrom(this.service.delete(this.id, id));
        await this.ngOnInit();
        this.message.success();
    }

    async download(id: string) {
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(this.id, id)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }

    // buttons
    @ViewChild('actionsTd') actionsTd: ElementRef;
    buttonCount: number;

    countButtons() {
        setTimeout(() => {
            const buttons = this.actionsTd?.nativeElement?.querySelectorAll('button');
            this.buttonCount = buttons?.length;
        }, 500);
    }
    // end count buttons

    protected readonly Roles = Role;


}
