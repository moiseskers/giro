import {Component, Input,} from '@angular/core';
import {RegisteredManagerEvaluationStatus} from "../../../../../shared/enums/registered-manager-evaluation-status.enum";

@Component({
    selector: 'app-registered-manager-statuses',
    templateUrl: './registered-manager-statuses.component.html',
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
export class RegisteredManagerStatusesComponent {

    @Input()
    status: string;

    readonly registeredManagerEvaluationStatus = RegisteredManagerEvaluationStatus;

}
