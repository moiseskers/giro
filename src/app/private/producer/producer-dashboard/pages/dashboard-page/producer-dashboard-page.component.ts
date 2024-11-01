import {Component} from '@angular/core';
import {DashboardService} from '../../../../shared/services/dashboard.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-producer-dashboard-page',
  templateUrl: './producer-dashboard-page.component.html',
  styleUrl: './producer-dashboard-page.component.scss'
})
export class ProducerDashboardPageComponent {

    public readonly loaderId: string = UuidHelper.get()

    constructor(
        public loaderService: LoaderServiceV2,
        private dashboardService: DashboardService) {
    }

    async download() {
        await this.loaderService.activateLoader(() => lastValueFrom(this.dashboardService.download()), this.loaderId);
    }
}
