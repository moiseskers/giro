import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Table, TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {MultiselectCheckbox} from "../../../../shared/components/app-dynamic-form-builder/atoms/multiselect-checkbox";
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FormErrorModule} from "../../../../shared/components/form-error";
import {AppCalendarModule} from "../../../../shared/components/calendar/calendar";
import {FocusFirstInvalidFieldModule} from "../../../../shared/directives/focus-first-invalid-field";
import {AppButtonModule} from "../../../../shared/components/button/button";
import {DividerModule} from "primeng/divider";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {DeclarationType} from "../../../../shared/enums/declaration-type";
import {DeclarationItemResponseDto} from "../../../../shared/models/declaration-item-response.dto";
import {DeclarationTableFormType} from "../../../../shared/enums/declaration-table-form-type";
import {DeclarationResponseDto} from "../../../../shared/models/declaration-response.dto";
import {UuidPipe} from "../../../../shared/pipes/uuid/uuid.pipe";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {cloneDeep} from 'lodash';
import {NGXLogger} from "ngx-logger";
import {LoaderService} from '../../../../shared/services/loader';
import {SkeletonModule} from 'primeng/skeleton';
import {
    MaxFloatValidatorDirective
} from '../../../../shared/directives/integer-validator/max-float-validator.directive';
import {SkeletonComponent} from '../../../../shared/components/skeleton/skeleton.component';
import {DeclarationTableFormService} from '../../services/declaration-table-form.service';
import {NgxCurrencyDirective, NgxCurrencyInputMode} from 'ngx-currency';
import {MilligramsPipe} from '../../../../shared/pipes/milligrams/milligrams.pipe';
import {DeclarationRequestStatus} from '../../../../shared/enums/declaration-request-status';
import {DeclarationStatus} from '../../../../shared/enums/declaration-status';
import {CategoryType} from '../../../../shared/types/category.type';
import {RedAsteriskDirective} from '../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';


@Component({
    selector: 'app-declaration-table-form',
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
        SkeletonModule,
        MaxFloatValidatorDirective,
        SkeletonComponent,
        CurrencyPipe,
        MilligramsPipe,
        RedAsteriskDirective
    ],
    templateUrl: './declaration-table-form.component.html',
    styleUrl: './declaration-table-form.component.scss'
})
export class DeclarationTableFormComponent {

    public declarationTypes = GeneralHelper.enumToList(DeclarationType, 'value', 'key');

    loaded: boolean = false;
    displayTable: boolean = true;

    @Input() isRegisterButtonLoading: boolean = false;
    @Input() declarationResponseDto: DeclarationResponseDto;
    @Input() isEditing: boolean;

    @ViewChild(Table, { static: false }) scrollContainer: Table;
    @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();

    @Input() public declarationTableFormType: DeclarationTableFormType = GeneralHelper.getKeyByValue(DeclarationTableFormType, DeclarationTableFormType.ANNUALLY);
    public modelIn = (model: DeclarationItemResponseDto) => model;

    @Input() producerType: CategoryType;

    constructor(
        protected loaderService: LoaderService,
        private log: NGXLogger,
        public ts: DeclarationTableFormService,
        public ref: DynamicDialogRef,
        ) {}

    async ngOnInit() {
        this.ts.producerType = this.producerType;
        this.log.info('producer type', this.producerType);
        this.loaded = false;
        this.ts.declarationTableFormType = this.declarationTableFormType;
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

    protected readonly DeclarationTableFormType = DeclarationTableFormType;
    protected readonly NgxCurrencyInputMode = NgxCurrencyInputMode;
    protected readonly DeclarationRequestStatus = DeclarationRequestStatus;
    protected readonly DeclarationStatus = DeclarationStatus;
}
