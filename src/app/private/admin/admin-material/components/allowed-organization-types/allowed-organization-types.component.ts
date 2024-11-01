import {Component, Input,} from '@angular/core';
import {TagModule} from "primeng/tag";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {AllowedOrganizationTypesEnum} from '../../../../../shared/enums/allowed-organization-types.enum';

@Component({
    selector: 'app-allowed-organization-types',
    templateUrl: './allowed-organization-types.component.html',
    standalone: true,
    imports: [
        TagModule,
        NgSwitchCase,
        NgSwitch
    ],
    styles: [`
      :host ::ng-deep .p-tag-value {
        white-space: nowrap;
      }

      .blue {
        color: var(--blue-500);
        background-color: rgba(20, 123, 209, 0.16) !important;
      }

      :host ::ng-deep .min-height {
        min-height: 40px !important;
      }
    `]
})
export class AllowedOrganizationTypesComponent {

    @Input() bigger: boolean;
    @Input() status: AllowedOrganizationTypesEnum;

    get statusAsString(): string {
        return this.status as string;
    }

    protected readonly AllowedOrganizationTypesEnum = AllowedOrganizationTypesEnum;
}
