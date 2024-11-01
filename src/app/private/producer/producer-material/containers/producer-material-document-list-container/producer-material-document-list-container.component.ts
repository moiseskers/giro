import {Component} from '@angular/core';
import {Page} from '../../../../../shared/objects/page';
import {lastValueFrom} from 'rxjs';
import {FilterHistoryHelper} from '../../../../../shared/helpers/filter-history.helper';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {MaterialDocumentResponseDto} from '../../../../../shared/models/material-document-response.dto';
import {InformativeService} from '../../../../shared/services/informative.service';

@Component({
    selector: 'app-producer-material-document-list-container',
    templateUrl: './producer-material-document-list-container.component.html',
    styleUrl: './producer-material-document-list-container.component.scss'
})
export class ProducerMaterialDocumentListContainerComponent {

    model: Page<MaterialDocumentResponseDto>;
    filterHistoryHelper = new FilterHistoryHelper();
    loaderId: string = UuidHelper.get();
    downloadLoaderId: string[] = [];
    modelIn = (model: MaterialDocumentResponseDto) => model;

    constructor(
        public loaderService: LoaderServiceV2,
        private service: InformativeService) {
    }

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getInformativeMaterials()), this.loaderId);
    }

    async filter($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getInformativeMaterials($event)), this.loaderId);
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
