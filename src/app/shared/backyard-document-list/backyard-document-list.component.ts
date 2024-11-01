import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeclarationDocumentStatusEnum} from "../enums/declaration-document-status.enum";
import {Page} from "../objects/page";
import {BackyardDocumentResponseDto} from "../models/backyard-document-response.dto";
import {MenuItem} from "primeng/api";
import {TableModule} from "primeng/table";
import {
    DocumentDeclarationStatusesComponent
} from "../../private/admin/backyard-declaration-request/components/backyard-declaration-document-statuses/document-declaration-statuses.component";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {AppPaginatorModule} from "../components/app-paginator";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-backyard-document-list',
    templateUrl: './backyard-document-list.component.html',
    styleUrl: './backyard-document-list.component.scss',
    standalone: true,
    imports: [
        TableModule,
        DocumentDeclarationStatusesComponent,
        ButtonModule,
        MenuModule,
        AppPaginatorModule,
        NgIf
    ]
})
export class BackyardDocumentListComponent {

    isLoading: boolean = false;

    @Input() model: Page<BackyardDocumentResponseDto>;
    @Input() menuItems: MenuItem[];
    @Output() pageEvent = new EventEmitter();
    @Output() downloadEvent = new EventEmitter();

    protected readonly DeclarationDocumentStatusEnum = DeclarationDocumentStatusEnum;

    public modelIn = (model: BackyardDocumentResponseDto) => model;

    page($event: any) {
        this.pageEvent.emit($event)
    }

    download(id: string) {
        this.downloadEvent.emit(id)
    }

}
