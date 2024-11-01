import {Component} from '@angular/core';
import {DashboardService} from '../../../../shared/services/dashboard.service';
import {default as data} from '../../../../../../assets/documents/region_metropolitana_de_santiago.json';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {Page} from '../../../../../shared/objects/page';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {NGXLogger} from 'ngx-logger';
import {ResponseCityDto} from '../../../../../shared/models/response-city.dto';
import {DocumentRequestDto} from '../../../../../shared/models/document-request.dto';
import {DefaultSystemMessagesService} from '../../../../../shared/components/defaut-system-message-service';

@Component({
    selector: 'app-producer-operations-in-territory-container',
    templateUrl: './producer-operations-in-territory-container.component.html',
    styleUrl: './producer-operations-in-territory-container.component.scss'
})
export class ProducerOperationsInTerritoryContainerComponent {

    data: any;
    countersLoaderId = UuidHelper.get();
    loaderId = UuidHelper.get();
    model: Page<ResponseCityDto>;

    totalRoutes: number;
    totalCleanPoints: number;
    totalHouses: number;

    isLoadingMap: boolean = true;
    operationsInTerritoryListLoaderId: string = UuidHelper.get();
    operationsInTerritoryId: any = null;
    uploadButtonLoaderId: string = UuidHelper.get();

    constructor(
        private defaultSystemMessagesService: DefaultSystemMessagesService,
        private service: DashboardService,
                private log: NGXLogger,
                public loaderService: LoaderServiceV2) {
    }

    async ngOnInit() {
        this.data = data;
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getCities()), this.loaderId);

        this.updateCards(this.model.meta?.totalRoutes, this.model.meta?.totalCleanPoints, this.model?.meta?.totalHouses);

        this.log.info('cities',    this.model?.items.map(value => value.city));
        this.log.info('features ', this.data.features.map((value: any) => value.properties.NOM_COM));

        const serverData = this.model?.items || [];

        this.data.features = this.data.features.map((value: any, index: number) => {
            const data = serverData.filter(sd => sd.city === value.properties.NOM_COM)[0];
            if (data) {
                return {
                    ...value,
                    id: data?.id,
                    value: 100
                }
            } else {
                return {
                    ...value,
                    id: data?.id,
                    value: 0
                }
            }
        });

        this.isLoadingMap = false;
    }

    async operationsInTerritoryEvent(properties: any) {
        this.operationsInTerritoryId = {
            cities: properties?.NOM_COM
        };

        const model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getCities(this.operationsInTerritoryId)), this.countersLoaderId);
        this.updateCards(model.meta?.totalRoutes, model.meta?.totalCleanPoints, model?.meta?.totalHouses);
    }

    updateCards(routes: number, cleanPoints: number, houses: number) {
        this.totalRoutes = routes;
        this.totalCleanPoints = cleanPoints ;
        this.totalHouses = houses;
    }

    async pageEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getCities($event)), this.operationsInTerritoryListLoaderId);
    }

    async sortEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getCities($event)), this.operationsInTerritoryListLoaderId);
    }

    async uploadBase64($event: DocumentRequestDto) {
        try {

            await this.loaderService.activateLoader(() => lastValueFrom(this.service.uploadCities($event)), this.uploadButtonLoaderId);
            this.defaultSystemMessagesService.success();
            this.isLoadingMap = true;
            await this.ngOnInit();
        } catch (e) {
            this.defaultSystemMessagesService.error('El archivo subido no contiene las columnas requeridas. Por favor, asegúrese de que todas las columnas necesarias estén presentes y vuelva a intentarlo. Si el error persiste, contacte al administrador.');
            this.log.info(e);
        }

    }
}
