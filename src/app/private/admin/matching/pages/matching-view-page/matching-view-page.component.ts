import {Component} from '@angular/core';
import {MatchingResponseDto} from '../../../../../shared/models/matching-response.dto';
import {MatchingService} from '../../../../shared/services/matching.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-matching-view-page',
    templateUrl: './matching-view-page.component.html',
    styleUrl: './matching-view-page.component.scss'
})
export class MatchingViewPageComponent {

    model: MatchingResponseDto;
    downloadLoaderId: string = UuidHelper.get();
    loaderId: string = UuidHelper.get();

    code: string =  decodeURIComponent(this.activatedRoute.snapshot.queryParamMap.get('code'));
    subcategoryId: string =  decodeURIComponent(this.activatedRoute.snapshot.queryParamMap.get('subcategoryId'));

    constructor(private service: MatchingService,
                public loaderService: LoaderServiceV2,
                private activatedRoute: ActivatedRoute,
    ) {}

    async ngOnInit() {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getById(this.code, this.subcategoryId)), this.loaderId);
    }

    async download() {
        const response = await this.loaderService.activateLoader(() => lastValueFrom(this.service.download(this.model.id, this.model.attachmentId)), this.downloadLoaderId);
        window.open(response?.signedUrl, '_blank');
    }
}
