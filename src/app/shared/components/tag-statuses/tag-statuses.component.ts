import {Component, Input,} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
    selector: 'app-tag-statuses',
    templateUrl: './tag-statuses.component.html',
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

      :host ::ng-deep .p-tag {
        height: 40px !important;
      }
      
    `]
})
export class TagStatusesComponent {

    @Input() bigger: boolean;

}
