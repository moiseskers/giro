import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import {LoaderService} from "../../../../../shared/services/loader";
import {DeclarationRequestStatus} from "../../../../../shared/enums/declaration-request-status";
import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response.dto";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {MilligramsPipe} from '../../../../../shared/pipes/milligrams/milligrams.pipe';

@Component({
    selector: 'app-admin-backyard-declaration-request-list',
    templateUrl: './admin-backyard-declaration-request-list.component.html',
    styleUrl: './admin-backyard-declaration-request-list.component.scss',
    providers: [MilligramsPipe]
})
export class AdminBackyardDeclarationRequestListComponent {

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

    action(item: any, model: DeclarationRequestResponseDto) {
        this.actionEvent.emit({
            action: item,
            model: model,
        });
    }

    view(id: string) {
        this.viewEvent.emit(id)
    }

    protected readonly DeclarationRequestRecurrence =  DeclarationRequestRecurrence;
    protected readonly DeclarationRequestStatus =   DeclarationRequestStatus;
}
