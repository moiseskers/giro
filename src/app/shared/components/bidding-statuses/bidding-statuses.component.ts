import {Component, Input,} from '@angular/core';
import {TagModule} from "primeng/tag";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {BiddingStatus} from "../../enums/bidding-status.enum";

@Component({
    selector: 'app-bidding-statuses',
    templateUrl: './bidding-statuses.component.html',
    standalone: true,
    imports: [
        TagModule,
        NgSwitch,
        NgSwitchCase
    ],
    styles: [`
        :host ::ng-deep .p-tag-value {
            white-space: nowrap;
        }

        .blue {
          color: var(--blue-500);
          background-color: rgba(20, 123, 209, 0.16) !important;
        }
    `]
})
export class BiddingStatusesComponent {

    @Input()
    status: string;

    readonly statuses = BiddingStatus;

}
