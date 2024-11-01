import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from '../../../../shared/objects/page';
import {FilterHistoryHelper} from '../../../../shared/helpers/filter-history.helper';
import {MaterialDocumentResponseDto} from '../../../../shared/models/material-document-response.dto';
import {AllowedOrganizationTypesEnum} from '../../../../shared/enums/allowed-organization-types.enum';
import {AllowedOrganizationTypes} from '../../../../shared/types/allowed-organization.types';
import {TableModule} from 'primeng/table';
import {AppPaginatorModule} from '../../../../shared/components/app-paginator';
import {Button} from 'primeng/button';
import {DatePipe, NgIf} from '@angular/common';
import {LoaderServiceV2} from '../../../../shared/services/loader/loader.service-v2';
import {HasAnyRolePipeModule} from '../../../../shared/pipes/has-any-role/has-any-role-pipe.module';
import {Role} from '../../../../shared/enums/role';

@Component({
    selector: 'app-material-document-list',
    templateUrl: './material-document-list.component.html',
    styleUrl: './material-document-list.component.scss',
    standalone: true,
    imports: [
        TableModule,
        AppPaginatorModule,
        Button,
        NgIf,
        DatePipe,
        HasAnyRolePipeModule
    ]
})
export class MaterialDocumentListComponent {

    filterHistoryHelper = new FilterHistoryHelper();

    @Input() loaderId: string;
    @Input() deleteLoaderId: string[] = [];
    @Input() downloadLoaderId: string[] = [];

    @Output() downloadButtonEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteButtonEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter<any>();

    @Input() model: Page<MaterialDocumentResponseDto>;
    @Input() loading: boolean;

    public modelIn = (model: MaterialDocumentResponseDto) => model;

    constructor(public loaderService: LoaderServiceV2) {}

    page($event: any) {
        this.filterHistoryHelper.page($event, async ($event: any) => {
            this.pageEvent.emit($event);
        });
    }

    sort($event: any) {
        this.filterHistoryHelper.sort($event, async ($event: any) => {
            this.sortEvent.emit($event);
        });
    }

    getAllowedOrganizationTypes(allowedOrganizationTypes: AllowedOrganizationTypes[] | undefined) {
        const values: any = allowedOrganizationTypes?.map(value => AllowedOrganizationTypesEnum[value])
        return values?.join(', ');
    }

    protected readonly Role = Role;
}
