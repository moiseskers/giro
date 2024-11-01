import {Component, Input,} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TagModule} from "primeng/tag";
import {CigStatus} from 'src/app/shared/enums/cig-status';

@Component({
    selector: 'app-cig-statuses',
    templateUrl: './cig-statuses.component.html',
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
export class CigStatusesComponent {

    @Input() bigger: boolean;
    @Input() status: CigStatus;

    get statusAsString(): string {
        return this.status as string;
    }

    CigStatus = CigStatus;

}
