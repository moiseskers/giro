import {Component, Input} from '@angular/core';
import {DatePipe, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {BiddingResponseDto} from "../../../../shared/models/bidding-response.dto";
import {LoaderService} from "../../../../shared/services/loader";
import {AppViewDataComponent} from "../../../../shared/components/app-view-data/app-view-data.component";
import {GiroDataViewComponent} from "../../../../shared/components/giro-menu-bar/giro-data-view.component";
import {SkeletonModule} from "primeng/skeleton";
import {HasAnyRolePipeModule} from "../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {SafePipe} from '../../../../shared/pipes/safe/safe-pipe.pipe';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    standalone: true,
    imports: [
        GiroDataViewComponent,
        AppViewDataComponent,
        SkeletonModule,
        DatePipe,
        NgSwitch,
        NgSwitchCase,
        NgIf,
        HasAnyRolePipeModule,
        SafePipe
    ],
    selector: 'app-question-and-answers-form',
    templateUrl: './question-and-answers-form.component.html',
    styleUrl: './question-and-answers-form.component.scss'
})
export class QuestionAndAnswersFormComponent {

    @Input() formLink: string;

    @Input()
    display: boolean = true;

    safeFormLink: SafeResourceUrl;

    @Input()
    model: BiddingResponseDto;

    constructor(public loaderService: LoaderService,
                private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        const formLink = this.addQueryParam(this.formLink, 'embedded', 'true');
        this.safeFormLink = this.sanitizer.bypassSecurityTrustResourceUrl(formLink);
        this.display = false;
    }

    addQueryParam(url: string, param: string, value: string): string {
        if (url.includes('?')) {
            return `${url}&${param}=${value}`;
        } else {
            return `${url}?${param}=${value}`;
        }
    }
}
