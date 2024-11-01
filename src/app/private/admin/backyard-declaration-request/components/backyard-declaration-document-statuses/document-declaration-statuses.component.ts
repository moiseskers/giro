import {Component, Input,} from '@angular/core';
import {DeclarationDocumentStatusEnum} from "../../../../../shared/enums/declaration-document-status.enum";
import {TagModule} from "primeng/tag";
import {NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
    selector: 'app-document-declaration-statuses',
    templateUrl: './document-declaration-statuses.component.html',
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
export class DocumentDeclarationStatusesComponent {

    @Input() bigger: boolean;
    @Input() status: DeclarationDocumentStatusEnum;

    get statusAsString(): string {
        if (this.status === DeclarationDocumentStatusEnum.PENDING) {
            return 'Validación pendiente'
        }

        return this.status as string;
    }

    BackyardDeclarationDocumentStatusEnum = DeclarationDocumentStatusEnum;




}
