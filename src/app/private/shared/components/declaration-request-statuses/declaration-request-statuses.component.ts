import {Component, Input,} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TagModule} from "primeng/tag";
import {DeclarationRequestStatus} from "../../../../shared/enums/declaration-request-status";

@Component({
    selector: 'app-declaration-request-statuses',
    templateUrl: './declaration-request-statuses.component.html',
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

      :host ::ng-deep .min-height  {
        min-height: 40px !important;
      }
      
    `]
})
export class DeclarationRequestStatusesComponent {

    @Input() bigger: boolean;
    @Input() status: DeclarationRequestStatus;

    get statusAsString(): string {
        return this.status as string;
    }

    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
}
