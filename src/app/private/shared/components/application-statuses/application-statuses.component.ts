import {Component, Input,} from '@angular/core';
import {ApplicationStatusEnum} from "../../../../shared/enums/application-status.enum";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
    selector: 'app-application-statuses',
    templateUrl: './application-statuses.component.html',
    standalone: true,
    imports: [
        NgSwitch,
        TagModule,
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
export class ApplicationStatusesComponent {

    @Input()
    status: string;

    readonly statusEnum = ApplicationStatusEnum;

}
