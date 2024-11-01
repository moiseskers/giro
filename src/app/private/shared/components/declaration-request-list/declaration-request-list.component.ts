import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {LoaderService} from "../../../../shared/services/loader";
import {
    DeclarationRequestStatusesComponent
} from "../declaration-request-statuses/declaration-request-statuses.component";
import {ButtonModule} from "primeng/button";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {Role} from "../../../../shared/enums/role";
import {HasAnyRolePipeModule} from "../../../../shared/pipes/has-any-role/has-any-role-pipe.module";
import {DeclarationRequestResponseDto} from "../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestRecurrence} from "../../../../shared/enums/declaration-request-recurrence";
import {DeclarationRequestStatus} from "../../../../shared/enums/declaration-request-status";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-declaration-request-list',
    standalone: true,
    providers: [MilligramsPipe],
    imports: [
        TableModule,
        DeclarationRequestStatusesComponent,
        ButtonModule,
        DatePipe,
        MenuModule,
        HasAnyRolePipeModule,
        NgIf,
        MilligramsPipe,
        TitleCasePipe
    ],
    templateUrl: './declaration-request-list.component.html',
    styleUrl: './declaration-request-list.component.scss'
})
export class DeclarationRequestListComponent {

    @Input()
    loaderId: string;

    @Input()
    totalTons: any;

    @ViewChild(Table) table: Table;

    @Input()
    public model: DeclarationRequestResponseDto[];

    items: MenuItem[];

    public modelIn = (model: DeclarationRequestResponseDto) => model;

    @Output() viewEvent = new EventEmitter();
    @Output() actionEvent = new EventEmitter();

    constructor(
        private milligramsPipe: MilligramsPipe,
        public loaderService: LoaderService) {}

    get declaredTonsSum() {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(this.totalTons) ? this.milligramsPipe.transform(this.totalTons) + ' t' : ''
    }

    protected readonly Roles = Role;
    protected readonly DeclarationRequestRecurrence = DeclarationRequestRecurrence;
    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;

    action(item: any, model: DeclarationRequestResponseDto) {
        this.actionEvent.emit({
            action: item,
            model: model,
        });
    }

    view(id: string) {
        this.viewEvent.emit(id)
    }

}
