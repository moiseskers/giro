import {Component, forwardRef, Injector, Input, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl,
    NgForm,
    ReactiveFormsModule
} from "@angular/forms";
import {Table, TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {cloneDeep} from 'lodash';
import {NGXLogger} from "ngx-logger";
import {
    MultiselectCheckbox
} from "../../../../../shared/components/app-dynamic-form-builder/atoms/multiselect-checkbox";
import {DecimalPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FormErrorModule} from "../../../../../shared/components/form-error";
import {AppCalendarModule} from "../../../../../shared/components/calendar/calendar";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {AppButtonModule} from "../../../../../shared/components/button/button";
import {DividerModule} from "primeng/divider";
import {UuidPipe} from "../../../../../shared/pipes/uuid/uuid.pipe";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DeclarationItemTypeEnum} from "../../../../../shared/enums/declaration-item-type.enum";
import {AppAutoCompleteModule} from "../../../../../shared/components/autocomplete/app-auto-complete.component";
import {InvoiceItemResponseDto} from '../../../../../shared/models/invoice-item-response.dto';
import moment from 'moment';
import {LeadsService} from '../../../../shared/services/leads.service';
import {LeadsMaterialResponseDto, LeadsResponseDto} from '../../../../../shared/models/leads-response.dto';
import {lastValueFrom} from 'rxjs';
import {LoaderService} from '../../../../../shared/services/loader';
import {UuidHelper} from '../../../../../shared/helpers/uuid-helper';
import {filter} from 'rxjs/operators';
import {NgxCurrencyDirective} from 'ngx-currency';
import {CategoryType} from '../../../../../shared/types/category.type';
import {YearPickerComponent} from '../../../../../shared/components/year-picker/year-picker.component';

@Component({
    selector: 'app-invoice-item-table-form',
    standalone: true,
    imports: [
        NgxCurrencyDirective,
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
        UuidPipe,
        AppAutoCompleteModule,
        YearPickerComponent
    ],
    templateUrl: './invoice-item-table-form.component.html',
    styleUrl: './invoice-item-table-form.component.scss',
    providers: [DecimalPipe,
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => InvoiceItemTableForm),
                multi: true
            },
        ]
    ]
})
export class InvoiceItemTableForm implements ControlValueAccessor {

    @ViewChild('itemTableForm') ngForm!: NgForm;

    @Input() public isEditing: boolean;

    materials: LeadsMaterialResponseDto[] = [];
    _materials: LeadsMaterialResponseDto[][] = [];

    subcategories: LeadsResponseDto[] = [];

    subcategoryLoaderId: string[] = [];

    @Input() declarationItemTypes  = GeneralHelper.enumToList(DeclarationItemTypeEnum, 'name', 'id');
    @Input() types: string[]             = GeneralHelper.enumToList(DeclarationItemTypeEnum).map((value: { key: any; }) => value.key);

    displayTable: boolean = true;

    @ViewChild(Table, {static: false}) scrollContainer: Table;
    @Input() public saveButtonLoading: boolean = false;

    public itemsRef: InvoiceItemResponseDto[] = [];

    public modelIn = (model: InvoiceItemResponseDto) => model;
    materialLoaderId: string = UuidHelper.get();
    ngControl: NgControl;

    // variable used in case you must validate all rows set,
    // it makes the user unable to add an empty row and register it
    @Input()
    validateRow: boolean = false;

    readonly category: CategoryType = 'DOMICILIARY';

    constructor(
        private decimalPipe: DecimalPipe,
        private log: NGXLogger,
        public ref: DynamicDialogRef,
        private leadsService: LeadsService,
        public loaderService: LoaderService,
        private injector: Injector,
        ) {
    }

    async ngOnInit() {
        this.subcategories = (await lastValueFrom(this.leadsService.subcategories(this.category)))?.items;
    }

    async startUpHelper() {
        const promises = this.itemsRef.map(async (value, rowIndex) => {
            value.complianceYear =  value?.complianceYear ? moment(value.complianceYear).toDate()  : null;
            await this.start(value.subcategoryId, rowIndex);
            return value;
        });
        await Promise.all(promises);
    }

    async start(
        subcategoryId: string,
        rowIndex: number,
    ) {
        this._materials[rowIndex] = await this.loaderService.activateLoader(
            () => this.getMaterials(subcategoryId),
            this.subcategoryLoaderId[rowIndex]
        );
        // const material = this.materials[rowIndex].filter(material => material.id === materialId)[0];
        // this.declarationItemTypeHelper(material, rowIndex);
    }


    ngDoCheck(): void {
        const currentErrors = this.ngControl?.control?.errors;
        const newErrors = currentErrors ? { ...currentErrors, invalid: true } : { invalid: true };

        if (this.validateRow) {
            if (this.ngForm?.invalid) {
                this.ngControl?.control?.setErrors(newErrors);
            } else {
                this.ngControl?.control?.setErrors(currentErrors);
            }
        }
    }

    addNewRow() {
        const item = new InvoiceItemResponseDto();
        item.subcategoryId = this.subcategories[0]?.id;
        item.materialId = this.materials[0]?.id;
        item.withholdingTaxes = 0;
        this.itemsRef.push(item);
        this.scrollToBeginning();

    }

    removeRow(index: number): void {
        const length = this.itemsRef.length;

        if (length < 2) {
            this.displayTable = false;
        }

        if (index >= 0 && index < length) {
            this.itemsRef.splice(index, 1);
        }

        setTimeout(() => this.displayTable = true, 100);
    }

    markAllAsTouched(f: any): void {
        Object.keys(f.form.controls).forEach(key => {
            f.form.controls[key].markAllAsTouched()
            f.form.controls[key].markAsDirty()
        });
        this.ngControl.control.markAllAsTouched();
    }

    scrollToBeginning(): void {
        if (this.scrollContainer) {
            this.scrollContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    // ###############TABLE RESULTS##############################################################
    get totalKG() {
        const total = this?.itemsRef?.map(value => value?.quantity || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        return !GeneralHelper.isEmptyOrUndefinedOrNull(total) ? this.decimalPipe.transform(total, '1.0-2') + ' kg' : '';
    }

    get totalPrice() {
        const total = this?.itemsRef?.map(value => value?.netValue || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        return this.getHelper(total, 'CLP');
    }

    get totalIVA() {

        const total = this?.itemsRef?.map(value => value?.taxes || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        return this.getHelper(total, 'CLP');
    }

    get totalWithheldIVA() {
        const total = this?.itemsRef?.map(value => value?.withholdingTaxes || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        return this.getHelper(total, 'CLP');
    }

    get totalTotal() {
        const total = this?.itemsRef?.map(value => value?.totalAmount || 0).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        return this.getHelper(total, 'CLP');
    }

    getHelper(input: any, symbol: string) {
        return !GeneralHelper.isEmptyOrUndefinedOrNull(input) ? this.decimalPipe.transform(input, '1.2-2') + ' ' + symbol : ''
    }

    // ###############FORM RELATED##############################################################
    async writeValue(items: InvoiceItemResponseDto[]) {
        this.itemsRef = cloneDeep(items);

        if (!this.itemsRef) {
            this.itemsRef = []
        }

        await this.startUpHelper();
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }

    onChange: any = () => {}

    onTouch: any = () => {}

    iva(quantity: number, netValue: number, model: InvoiceItemResponseDto):     number {
        model.taxes = (quantity * netValue) * 0.19;
        return model.taxes;
    }

    total(quantity: number, netValue: number, model: InvoiceItemResponseDto):   number {
        model.totalAmount = (quantity * netValue) + (model.taxes - model.withholdingTaxes);
        return model.totalAmount;
    }

    //####INPUT CHANGES START####################################################################################################
    async subcategoryNgModelChange($event: any, rowIndex: any) {
        // initialize materials
        this._materials[rowIndex] = (await this.loaderService.activateLoader(() => this.getMaterials($event), this.materialLoaderId));
    }
    //####INPUT CHANGES END####################################################################################################

    async getMaterials(subcategoryId: string): Promise<LeadsMaterialResponseDto[]> {
        return (await lastValueFrom(this.leadsService.materialsBySubCategoryId(this.category, subcategoryId))).items;
    }

    private updateForm() {
        this.onChange(this.itemsRef);
        this.onTouch(this.itemsRef);
    }

    ngAfterViewInit() {
        this.ngForm
            .form
            .valueChanges
            .pipe(
                filter(() => this.ngForm.form.valid)
            ).subscribe(() => {
            this.updateForm();
        });

        this.ngControl = this.injector.get(NgControl);
    }

    protected readonly GeneralHelper = GeneralHelper;
}
