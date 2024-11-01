import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgIf, TitleCasePipe} from "@angular/common";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {
    DeclarationRequestStatusesComponent
} from "../../../../shared/components/declaration-request-statuses/declaration-request-statuses.component";
import {LoaderService} from "../../../../../shared/services/loader";
import {DeclarationResponseDto} from "../../../../../shared/models/declaration-response.dto";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationStatus} from "../../../../../shared/enums/declaration-status";
import {Role} from "../../../../../shared/enums/role";
import {
    DeclarationStatusesComponent
} from "../../../../shared/components/declaration-statuses/declaration-statuses.component";
import {MilligramsPipe} from '../../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-declaration-request-producer-list',
    standalone: true,
    imports: [
        TableModule,
        DeclarationRequestStatusesComponent,
        ButtonModule,
        DatePipe,
        MenuModule,
        NgIf,
        DecimalPipe,
        DeclarationStatusesComponent,
        TitleCasePipe,
        MilligramsPipe
    ],
    templateUrl: './declaration-producer-list.component.html',
    styleUrl: './declaration-producer-list.component.scss'
})
export class DeclarationProducerListComponent {

    @Input()
    loaderId: string;

    @Input()
    totalProducerTons: any;

    @ViewChild(Table) table: Table;

    @Input()
    public model: DeclarationResponseDto[];

    items: MenuItem[];

    public modelIn = (model: DeclarationResponseDto) => model;

    @Output() viewEvent = new EventEmitter();

    constructor(public loaderService: LoaderService) {}

    view(id: string) {
        this.viewEvent.emit(id)
    }

    get declaredTonsSum() {
        return this.totalProducerTons || 0;
    }

    protected readonly DeclarationType = DeclarationRequestRecurrence;
    protected readonly DeclarationStatus = DeclarationStatus;
    protected readonly Roles = Role;
}
