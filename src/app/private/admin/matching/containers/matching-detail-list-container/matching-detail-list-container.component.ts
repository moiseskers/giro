import {Component, Input} from '@angular/core';
import {MatchingService} from '../../../../shared/services/matching.service';
import {LoaderServiceV2} from '../../../../../shared/services/loader/loader.service-v2';
import {lastValueFrom} from 'rxjs';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {Page} from '../../../../../shared/objects/page';
import {MatchingItemResponseDto} from '../../../../../shared/models/matching-item-response.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-matching-detail-list-container',
    templateUrl: './matching-detail-list-container.component.html',
    styleUrl: './matching-detail-list-container.component.scss'
})
export class MatchingDetailListContainerComponent {

    @Input()category: string;

    loaderId: string = UuidHelper.get();
    model: Page<MatchingItemResponseDto>;
    skeletonIsLoading: boolean = true;

    code: string;
    subcategoryId: string;

    constructor(private service: MatchingService,
                public loaderService: LoaderServiceV2,
                private activatedRoute: ActivatedRoute,
    ) {}

    async ngOnInit() {
        this.code = decodeURIComponent(this.activatedRoute.snapshot.queryParamMap.get('code'));
        this.subcategoryId = decodeURIComponent(this.activatedRoute.snapshot.queryParamMap.get('subcategoryId'));

        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDetails(this.code, this.subcategoryId)), this.loaderId);
        this.skeletonIsLoading = false;
    }

    async sortEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDetails(this.code, this.subcategoryId, $event)), this.loaderId);
    }

    async pageEvent($event: any) {
        this.model = await this.loaderService.activateLoader(() => lastValueFrom(this.service.getDetails(this.code, this.subcategoryId, $event)), this.loaderId);
    }
}
