import {Component} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

    public readonly loaderId: string = UuidHelper.get()

    constructor(
        public loaderService: LoaderServiceV2,
        private dashboardService: DashboardService) {
    }

    async download() {
        await this.loaderService.activateLoader(() => lastValueFrom(this.dashboardService.download()), this.loaderId);
    }
}
