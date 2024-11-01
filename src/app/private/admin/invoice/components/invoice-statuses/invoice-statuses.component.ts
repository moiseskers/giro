import {Component, Input,} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TagModule} from "primeng/tag";
import {InvoiceStatus} from 'src/app/shared/enums/invoice-status';

@Component({
    selector: 'app-invoice-statuses',
    template: `
        <ng-container [ngSwitch]="status">
            <p-tag [styleClass]=" bigger ?  'min-height' : ''" *ngSwitchCase="InvoiceStatus.APPROVED" [value]="statusAsString" severity="success"></p-tag>
            <p-tag [styleClass]=" bigger ?  'min-height' : ''" *ngSwitchCase="InvoiceStatus.PENDING"  [value]="statusAsString" severity="warning"></p-tag>
            <p-tag [styleClass]=" bigger ?  'min-height' : ''" *ngSwitchCase="InvoiceStatus.REFUSED"  [value]="statusAsString" severity="danger"></p-tag>
        </ng-container>
    `,
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
      
      :host ::ng-deep .min-height  {
        min-height: 40px !important;
      }
      
    `]
})
export class InvoiceStatusesComponent {

    @Input() bigger: boolean;
    @Input() status: InvoiceStatus;

    get statusAsString(): string {
        return this.status as string;
    }

    InvoiceStatus = InvoiceStatus;
}
