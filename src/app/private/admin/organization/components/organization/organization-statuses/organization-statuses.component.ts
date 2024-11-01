import {Component, Input,} from '@angular/core';

@Component({
    selector: 'app-organization-statuses',
    templateUrl: './organization-statuses.component.html',
    styles: [`
        :host ::ng-deep .p-tag-value {
            white-space: nowrap;
        }
    `]
})
export class OrganizationStatusesComponent {

    @Input()
    status: string;

}
