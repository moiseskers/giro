import {Component, Input,} from '@angular/core';
import {EvaluationStatusEnum} from "../../../../../shared/enums/evaluation-status.enum";

@Component({
    selector: 'app-evaluation-statuses',
    templateUrl: './evaluation-statuses.component.html',
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
export class EvaluationStatusesComponent {

    @Input()
    status: string;

    readonly statusEnum = EvaluationStatusEnum;

}
