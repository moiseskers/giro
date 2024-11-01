import {Component} from '@angular/core';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {Page} from '../../../../../shared/objects/page';
import {MediaLinkResponseDto} from '../../../../../shared/models/media-link-response.dto';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {lastValueFrom} from 'rxjs';
import {InformativeService} from '../../../../shared/services/informative.service';

@Component({
    selector: 'app-producer-material-media-list-container',
    templateUrl: './producer-material-media-link-list-container.component.html',
    styleUrl: './producer-material-media-link-list-container.component.scss'
})
export class ProducerMaterialMediaLinkListContainerComponent {

    public readonly loaderId: string = UuidHelper.get();
    model: Page<MediaLinkResponseDto>;
    filterHistoryHelper = new FilterHistoryHelper();

    constructor(
        public loaderService: LoaderServiceV2,
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
}
