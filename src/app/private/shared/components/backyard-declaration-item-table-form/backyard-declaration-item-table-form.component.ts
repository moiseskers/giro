import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Table, TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {cloneDeep} from 'lodash';
import {NGXLogger} from "ngx-logger";
import {MultiselectCheckbox} from "../../../../shared/components/app-dynamic-form-builder/atoms/multiselect-checkbox";
import {DecimalPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FormErrorModule} from "../../../../shared/components/form-error";
import {AppCalendarModule} from "../../../../shared/components/calendar/calendar";
import {FocusFirstInvalidFieldModule} from "../../../../shared/directives/focus-first-invalid-field";
import {AppButtonModule} from "../../../../shared/components/button/button";
import {DividerModule} from "primeng/divider";
import {UuidPipe} from "../../../../shared/pipes/uuid/uuid.pipe";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {DeclarationItemResponseDto} from "../../../../shared/models/declaration-item-response.dto";
import {DeclarationResponseDto} from "../../../../shared/models/declaration-response.dto";
import {AppAutoCompleteModule} from "../../../../shared/components/autocomplete/app-auto-complete.component";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {ManagerTypeEnum} from "../../../../shared/enums/manager-type.enum";
import {OrganizationResponseDto} from "../../../../shared/models/organization-response.dto";
import {DeclarationTableFormService} from '../../services/declaration-table-form.service';
import {LoaderService} from '../../../../shared/services/loader';
import {NgxCurrencyDirective, NgxCurrencyInputMode} from 'ngx-currency';
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';
import {YearValidatorDirective} from '../../../../shared/directives/app-year-validator/year-validator.directive';
import {HasAnyRolePipeModule} from '../../../../shared/pipes/has-any-role/has-any-role-pipe.module';
import {Role} from '../../../../shared/enums/role';
import {YearPickerComponent} from '../../../../shared/components/year-picker/year-picker.component';

@Component({
    selector: 'app-backyard-declaration-item-table-form',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        MultiselectCheckbox,
        NgSwitchCase,
        NgForOf,
        NgSwitch,
        FormErrorModule,
        NgIf,
        NgTemplateOutlet,
        FormsModule,
        AppCalendarModule,
        FocusFirstInvalidFieldModule,
        AppButtonModule,
        DividerModule,
        DecimalPipe,
        NgxCurrencyDirective,
        UuidPipe,
        AppAutoCompleteModule,
        MilligramsPipe,
        YearValidatorDirective,
        HasAnyRolePipeModule,
        YearPickerComponent,
    ],
    templateUrl: './backyard-declaration-item-table-form.component.html',
    styleUrl: './backyard-declaration-item-table-form.component.scss'
})
export class BackyardDeclarationItemTableForm {

    @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(Table, {static: false}) scrollContainer: Table;
    @Output() filterAutocompleteEvent: EventEmitter<any> = new EventEmitter();
    @Input()  organizationsFiltered: OrganizationResponseDto[] = [];
    @Input()  saveButtonLoading: boolean = false;
    @Input() declarationResponseDto: DeclarationResponseDto;
    private readonly errorMessage = 'Por favor, verifique que todas las columnas <strong>Recolector</strong>, <strong>Pretratamiento</strong> y <strong>Valorizador</strong>, al menos una por línea, deben estar completadas.';

    loaded: boolean;
    displayTable: boolean = true;

    modelIn = (model: DeclarationItemResponseDto) => model;

    constructor(
        private log: NGXLogger,
        public ref: DynamicDialogRef,
        public loaderService: LoaderService,
        public ts: DeclarationTableFormService,

        ) {}

    async ngOnInit() {
        this.ts.isBackyard = true;
        this.ts.producerType = 'NON_DOMICILIARY'

        this.loaded = false;
        this.ts.declarationResponseDtoRef = cloneDeep(this.declarationResponseDto);

        this.log.info('initialized with  ', this.ts.declarationResponseDtoRef);

        await this.ts.startUpHelper();

        this.loaded = true;
    }

    ngAfterViewInit(): void {
        this.ts.displayTable = this.displayTable;
        this.ts.saveEvent = this.saveEvent;
    }

    ngDoCheck(): void {
        if (!GeneralHelper.isEmptyOrUndefinedOrNull(this.scrollContainer)) {
            this.ts.scrollContainer = this.scrollContainer;
        }
    }

    markAllAsTouched(f: NgForm): void {
        Object.keys(f.form.controls).forEach(key => {
            f.form.controls[key].markAllAsTouched();
            f.form.controls[key].markAsDirty();
        });
    }

    filterOrganizations($event: AutoCompleteCompleteEvent, type: string): void {
        const helpedType = this.filterOrganizationTypeHelper()[type];
        this.filterAutocompleteEvent.emit({
            event: $event.query,
            type: helpedType
        });
    }

    filterOrganizationTypeHelper() {
        return {
            PRETREATMENT: 'pretreatments',
            VALUER: 'valuers',
            PICKUP: 'pickups'
        }
    }

    async addNewRow() {
        if (this.hasAtLeastOneNotNullError()) {
            throw Error(this.errorMessage);
        } else {
            await this.ts.addNewRow();
        }
    }

    save(backyardDeclarationForm: NgForm): void {
        if (this.hasAtLeastOneNotNullError()) {
            throw Error(this.errorMessage);
        } else {
            this.ts.save(backyardDeclarationForm);
        }
    }

    hasAtLeastOneNotNullError(): boolean {
        if (GeneralHelper.isEmptyOrUndefinedOrNull(this.ts.declarationResponseDtoRef?.items)) {
            return false;
        }

        return this.ts.declarationResponseDtoRef.items.some(value =>
            GeneralHelper.isEmptyOrUndefinedOrNull(value.pickupId) &&
            GeneralHelper.isEmptyOrUndefinedOrNull(value.pretreatmentId) &&
            GeneralHelper.isEmptyOrUndefinedOrNull(value.valuerId)
        )
    }

    protected readonly GeneralHelper = GeneralHelper;
    protected readonly ManagerType = ManagerTypeEnum;
    protected readonly NgxCurrencyInputMode = NgxCurrencyInputMode;

    valuerNgModelChange($event: any, declarationItemResponseDto: DeclarationItemResponseDto) {
        declarationItemResponseDto.valuerId = $event;
    }

    pretreatmentNgModelChange($event: any, declarationItemResponseDto: DeclarationItemResponseDto) {
        declarationItemResponseDto.pretreatmentId = $event;
    }

    pickupNgModelChange($event: any, declarationItemResponseDto: DeclarationItemResponseDto) {
        declarationItemResponseDto.pickupId = $event;
    }

    protected readonly Role = Role;
}
