import {Component, Input,} from '@angular/core';

@Component({
    selector: 'app-user-statuses',
    templateUrl: './user-statuses.component.html',
    styles: [`
        :host ::ng-deep .p-tag-value {
            white-space: nowrap;
        }
    `]
})
export class UserStatusesComponent {

    @Input()
    status: string;

}
