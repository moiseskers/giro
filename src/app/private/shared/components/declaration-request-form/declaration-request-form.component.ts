import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FocusFirstInvalidFieldModule} from "../../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../../shared/components/form-error";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "../../../../shared/components/paginator/paginator";
import {FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {GeneralHelper} from "../../../../shared/helpers/general-helper";
import {NgIf} from "@angular/common";
import {AppAutoCompleteModule} from "../../../../shared/components/autocomplete/app-auto-complete.component";
import {AppCalendarModule} from "../../../../shared/components/calendar/calendar";
import {
    CreateDeclarationOrganizationRequestRequestDto,
    CreateDeclarationRequestRequestDto
} from "../../../../shared/models/create-declaration-request-request.dto";
import {DeclarationRequestResponseDto} from "../../../../shared/models/declaration-request-response.dto";
import {DeclarationRequestRecurrence} from "../../../../shared/enums/declaration-request-recurrence";
import {AutocompleteMultiSelectModule} from "../../../../shared/autocomplete-multiselect/multiselect";
import {
    CreateDeclarationRequestRequestForm
} from "../../../../shared/form-models/create-declaration-request-request.form";
import {MultiSelectModule} from "primeng/multiselect";
import moment from "moment";
import {LoaderService} from '../../../../shared/services/loader';
import {OrganizationResponseDto} from '../../../../shared/models/organization-response.dto';
import {lastValueFrom} from 'rxjs';
import {OrganizationTypeType} from '../../../../shared/types/organization-type.type';
import {DeclarationRequestService} from '../../services/declaration-request.service';
import {UuidHelper} from '../../../../shared/helpers/uuid-helper';
import {BranchService} from '../../services/branch.service';
import {BranchResponseDto} from '../../../../shared/models/branch-response.dto';
import {DeclarationRequestFormDropdown} from '../../../../shared/objects/declaration-request-form-dropdown';
import {AppValidators} from '../../../../shared/validators/app-validators';
import {RedAsteriskDirective} from '../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@Component({
    selector: 'app-declaration-request-form',
    standalone: true,
    imports: [
        ButtonModule,
        DividerModule,
        FocusFirstInvalidFieldModule,
        FormErrorModule,
        InputTextareaModule,
        PaginatorModule,
        ReactiveFormsModule,
        NgIf,
        AppAutoCompleteModule,
        AppCalendarModule,
        AutocompleteMultiSelectModule,
        MultiSelectModule,
        RedAsteriskDirective,
    ],
    templateUrl: './declaration-request-form.component.html',
    styleUrl: './declaration-request-form.component.scss',
    providers: [DialogService]
})
export class DeclarationRequestFormComponent {

    @Input()
    model: DeclarationRequestResponseDto;

    @Output() onSave: EventEmitter<CreateDeclarationRequestRequestDto> = new EventEmitter();
    @Input() saveLoader: boolean;

    @Input() editing: boolean;
    @Input() isBackyard: boolean = false;
    @Input() organizationType: OrganizationTypeType;

    form: FormGroup<CreateDeclarationRequestRequestForm>;
    options = GeneralHelper.enumToList(DeclarationRequestRecurrence);
    reload: boolean = true;
    endDateMin: Date = new Date();

    public formValueWasChanged: boolean = false;

    @ViewChild('producersNgModelChangeRef') producersNgModelChangeRef: NgModel;
    protected readonly DeclarationRequestRecurrence = DeclarationRequestRecurrence;
    private originalValue: any;

    dropdownValueIn: DeclarationRequestFormDropdown[] = [];
    dropdownValue:   DeclarationRequestFormDropdown[] = [];
    dropdownSearchLoaderId: string = UuidHelper.get();

    constructor(
        private service: DeclarationRequestService,
        public loaderService: LoaderService,
        private branchService: BranchService,
        public ref: DynamicDialogRef) {}

    async ngOnInit() {
        this.form = new FormGroup<CreateDeclarationRequestRequestForm>({
            recurrence: new FormControl({
                value: this.isBackyard ? GeneralHelper.getKeyByValue(DeclarationRequestRecurrence, DeclarationRequestRecurrence.MONTHLY) : this.model?.recurrence ?? GeneralHelper.getKeyByValue(DeclarationRequestRecurrence, DeclarationRequestRecurrence.MONTHLY),
                disabled: this.editing,
            }),
            declaredMonthYear: new FormControl({
                value: this.model?.declaredMonthYear ? moment(this.model?.declaredMonthYear).toDate() : null,
                disabled: this.editing
            }, Validators.required),
            endDate: new FormControl(
                this.model?.endDate ? moment(this.model?.endDate).toDate() : null,
                Validators.required),
            organizations: new FormControl(
                this.model?.organizations.map(value => ({id: value?.id})),
                AppValidators.arrayNotEmptyValidator()
            )
        });

        // used to check if the form was altered
        this.originalValue = this.form.value;

        await this.setUpBranchValue();

        this.form.controls.recurrence.valueChanges.subscribe(value => {
            setTimeout(() => this.reload = false);
            setTimeout(() => this.reload = true);
        });

        // check if from was changed
        this.valueChangesForm();
    }

    ngAfterViewInit(): void {
        if(!this.organizationType) {
            throw new Error('organizationType must not be null');
        }
    }

    valueChangesForm() {
        this.form.valueChanges.subscribe(value => {
            this.formValueWasChanged = JSON.stringify(value) !== JSON.stringify(this.originalValue);
        });
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
        this.producersNgModelChangeRef.control.markAsTouched();
    }

    save() {
        const rawValue = this.form.getRawValue();
        this.onSave.emit(rawValue);
    }

    cancel() {
        this.ref.close(false);
    }

    getUniqueListBy(arr: any[], key: string) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    //####DROPDOWN START###############################################################################################################
    async setUpBranchValue() {
        if (this.isBackyard) {
            this.dropdownValueIn = (await this.loaderService.activateLoader(() => lastValueFrom(this.branchService.getAll(this.organizationType)), this.dropdownSearchLoaderId)).items.map(value => ( this.branchToDropdownValue(value) ));
            this.dropdownValue = this.dropdownValueIn.filter(value => this.model?.organizations.map(organization => organization.branchId).includes(value.id));
        } else {
            this.dropdownValueIn = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.organizationsSearch(this.organizationType)), this.dropdownSearchLoaderId)).items.map(value => this.organizationToDropdownValue(value));
            this.dropdownValue = this.dropdownValueIn.filter(value => this.model?.organizations.map(organization => organization.id).includes(value.id));
        }
    }

    organizationToDropdownValue(organization: OrganizationResponseDto): DeclarationRequestFormDropdown {
        return {
            id: organization?.id,
            organizationId: organization?.id,
            branchId: null,
            name: `${organization?.businessName} | ${organization?.taxIdentificationNumber}`,
        }
    }

    branchToDropdownValue(branch: BranchResponseDto): DeclarationRequestFormDropdown {
        return {
            id: branch?.id,
            organizationId: branch?.organization?.id,
            branchId: branch.id,
            name: `${branch.organization.businessName} | ${branch.organization.taxIdentificationNumber} | ${branch.code}`,
        }
    }

    producersValueNgModelChange($event: DeclarationRequestFormDropdown[]) {
        $event = this.getUniqueListBy($event, 'id');

        this.dropdownValue = $event;

        let values: CreateDeclarationOrganizationRequestRequestDto[];

        if (this.isBackyard) {
            values = $event.map(value => ({id: value.organizationId, branchId: value?.branchId}));
        } else {
            values = $event.map(value => ({id: value.id, branchId: null}));
        }

        this.form.controls.organizations.setValue(values);
    }
    //####DROPDOWN END###############################################################################################################

}
