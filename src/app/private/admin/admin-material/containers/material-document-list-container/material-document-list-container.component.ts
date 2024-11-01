import {Component} from '@angular/core';
import {Page} from '../../../../../shared/objects/page';
import {lastValueFrom} from 'rxjs';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {InformativeService} from '../../../../shared/services/informative.service';
import {MaterialDocumentResponseDto} from '../../../../../shared/models/material-document-response.dto';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {DialogService} from 'primeng/dynamicdialog';
import {
    MaterialDocumentCreateContainerComponent
} from '../material-document-create-container/material-document-create-container.component';

@Component({
    selector: 'app-material-document-list-container',
    templateUrl: './material-document-list-container.component.html',
    styleUrl: './material-document-list-container.component.scss'
})
export class MaterialDocumentListContainerComponent {

    model: Page<MaterialDocumentResponseDto>;
    filterHistoryHelper = new FilterHistoryHelper();
    loaderId: string = UuidHelper.get();
    deleteLoaderId: string[] = [];
    downloadLoaderId: string[] = [];
    modelIn = (model: MaterialDocumentResponseDto) => model;
    dialogHeaderCreate: string = 'Nuevo documento';

    constructor(
        private dialogService: DialogService,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        public loaderService: LoaderServiceV2,
        private service: InformativeService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getInformativeMaterials()), this.loaderId);
    }

    add() {
        const ref = this.dialogService.open(MaterialDocumentCreateContainerComponent, {
            header: this.dialogHeaderCreate,
            width: '700px',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        ref.onClose.subscribe(async value => {
            if (value) {
                await this.ngOnInit();
            }
        });
    }

    async filter($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getInformativeMaterials($event)), this.loaderId);
    }

    async deleteButtonEvent($event: any) {
        this.deleteLoaderId[$event.index] = UuidHelper.get();
        await this.loaderService.activateLoader(() => lastValueFrom(this.service.deleteInformativeMaterials($event.id)), this.deleteLoaderId[$event.index]);
        this.defaultSystemMessagesService.success();
        await this.ngOnInit();
    }

    async download($event: any) {
        this.downloadLoaderId[$event.index] = UuidHelper.get();
        const response: any = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download($event.id)), this.downloadLoaderId[$event.index]);
        window.open(response?.signedUrl, '_blank');
    }

   async search($event: string) {
        const search = {
            itemsPerPage: 10,
            search: $event
        }
        this.filterHistoryHelper.filter(search, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getInformativeMaterials(search)), this.loaderId);
        });
    }

}
