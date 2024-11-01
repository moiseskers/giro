import {Component} from '@angular/core';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {Page} from '../../../../../shared/objects/page';
import {MediaLinkResponseDto} from '../../../../../shared/models/media-link-response.dto';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {DialogService} from 'primeng/dynamicdialog';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {NGXLogger} from 'ngx-logger';
import {InformativeService} from '../../../../shared/services/informative.service';
import {lastValueFrom} from 'rxjs';
import {
    MaterialMediaLinkCreateContainerComponent
} from '../material-media-link-create-container/material-media-link-create-container.component';

@Component({
    selector: 'app-material-media-list-container',
    templateUrl: './material-media-link-list-container.component.html',
    styleUrl: './material-media-link-list-container.component.scss'
})
export class MaterialMediaLinkListContainerComponent {

    public readonly loaderId: string = UuidHelper.get();
    public readonly deleteLoaderId = [];
    model: Page<MediaLinkResponseDto>;

    filterHistoryHelper = new FilterHistoryHelper();
    dialogHeaderCreate: string = 'Nuevo video';

    constructor(
        private dialogService: DialogService,
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        public loaderService: LoaderServiceV2,
        private log: NGXLogger,
        private service: InformativeService) {
    }

    async ngOnInit() {
        const page = {
            itemsPerPage: 8
        }
        this.filterHistoryHelper.filter(page, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get($event)), this.loaderId);
        });
    }

    async addVideo() {
        const ref = this.dialogService.open(MaterialMediaLinkCreateContainerComponent, {
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

    search($event: string) {
        const search = {
            itemsPerPage: 8,
            search: $event
        }
        this.filterHistoryHelper.filter(search, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get(search)), this.loaderId);
        });
    }

    page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.get($event)), this.loaderId);
        });
    }

    async deleteButtonEvent(id: string, i: number) {

        this.deleteLoaderId[i] = UuidHelper.get();

        await this.loaderService.activateLoader(() => lastValueFrom(this.service.delete(id)), this.deleteLoaderId[i]);
        this.defaultSystemMessagesService.success();
        await this.ngOnInit();
    }
}
