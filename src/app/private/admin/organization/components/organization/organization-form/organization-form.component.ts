import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NGXLogger} from "ngx-logger";
import {OrganizationService} from "../../../../../shared/services/organization.service";
import {DropdownChangeEvent} from "primeng/dropdown";
import {HandleValidatorsHelper} from "../../../../../../auth/pages/request-access/helpers/handle-validators-helper";
import {GeneralHelper} from "../../../../../../shared/helpers/general-helper";
import {OrganizationResponseDto} from "../../../../../../shared/models/organization-response.dto";
import {GiroValidators} from "../../../../../../shared/validators/giro-validators";
import {HiringStatus} from "../../../../../../shared/enums/hiring-status";
import {CategoryTypeEnum} from "../../../../../../shared/enums/category-type.enum";
import {OrganizationTypeEnum} from "../../../../../../shared/enums/organization-type.enum";
import {ManagerTypeEnum} from "../../../../../../shared/enums/manager-type.enum";
import {PartnerTypeEnum} from "../../../../../../shared/enums/partner-type.enum";
import {OrganizationRequestDto} from "../../../../../../shared/models/organization-request-dto";

@Component({
    selector: 'app-organization-form',
    templateUrl: './organization-form.component.html',
    styleUrl: './organization-form.component.scss'
})
export class OrganizationFormComponent {

    form: FormGroup;

    @Input()
    model: OrganizationResponseDto;

    @Output() saveEvent: EventEmitter<OrganizationRequestDto> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();

    @Input()
    isEditing: boolean = false;

    @Input()
    buttonIsLoading: boolean;

    constructor(private fb: FormBuilder,
                private log: NGXLogger,
                private service: OrganizationService) {}

    ngOnInit(): void {
        const organizationType = this.model?.organizationType || 'MANAGER';

        this.form = this.fb.group({
            organizationType: [organizationType, Validators.required],

            // INDUSTRIAL_CONSUMER and commons with MANAGER and PRODUCER
            businessName: [this.model?.businessName],
            tradeName: [this.model?.tradeName],
            taxIdentificationNumber: [this.model?.taxIdentificationNumber, { emitEvent: false }],

            // MANAGER
            managerTypes: [this.model?.managerTypes],
            bidManager: [this.model?.bidManager],
            hiringStatus:  [this.model?.hiringStatus],

            // PRODUCER
            producerType: [this.model?.producerType],
            partnerType: [this.model?.partnerType],
            sector: [this.model?.sector],
            producerIsIndustrialConsumer: [this.model?.producerIsIndustrialConsumer || false],

            documents: [[]],
        });

        if (this.isEditing) {
            this.startUpEditing(organizationType)
        } else {
            this.startUp(organizationType);
        }
    }

    organizationTypeOnChange($event: DropdownChangeEvent) {
        this.startUp($event.value);
    }

    save() {
        this.log.info(`[${this.constructor.name}]`, 'Saving form data:', this.form.getRawValue());
        this.saveEvent.emit(this.form.getRawValue());
    }

    startUp(entityType: string) {
        this.log.info(`[${this.constructor.name}]`, 'Starting up with entity type:', entityType);
        this.clearValidationStates();
        switch (entityType) {
            case 'INDUSTRIAL_CONSUMER':
                this.commonsValidations();
                break;
            case 'MANAGER':
                this.commonsValidations();
                this.managerValidations();
                this.form.controls['hiringStatus'].setValue('NOT_HIRED');
                break;
            case 'PRODUCER':
                this.commonsValidations();
                this.producerValidations();
                this.form.controls['producerType'].setValue('DOMICILIARY');
                this.form.controls['partnerType'].setValue('FOUNDER');
                break;
            case 'CITY':
                this.municipalityValidations();
                break;
        }
    }


    startUpEditing(entityType: string) {
        this.log.info(`[${this.constructor.name}]`, 'Starting up with entity type:', entityType);

        this.clearValidationStates();

        switch (entityType) {
            case 'INDUSTRIAL_CONSUMER':
                this.commonsValidations();
                break;
            case 'MANAGER':
                this.commonsValidations();
                this.managerValidations();
                break;
            case 'PRODUCER':
                this.commonsValidations();
                this.producerValidations();
                break;
            case 'CITY':
                this.municipalityValidations();
                break;
        }
    }

    commonsValidations(): void {
        this.log.info(`[${this.constructor.name}]`, 'Applying common validations.');
        this.businessName();
        HandleValidatorsHelper.set('tradeName', this.form, [Validators.required]);
        if (this.isEditing) {
            this.taxIdentificationNumber();
        } else {
            HandleValidatorsHelper.set('taxIdentificationNumber', this.form, [Validators.required, Validators.maxLength(150)], GiroValidators.checkIfIdentityExists(this.service), "blur");
        }
    }

    managerValidations(): void {
        this.log.info(`[${this.constructor.name}]`, 'Applying manager-specific validations.');
        HandleValidatorsHelper.set('managerTypes', this.form, Validators.required);
        HandleValidatorsHelper.set('bidManager', this.form, [Validators.required, Validators.maxLength(150)]);
        HandleValidatorsHelper.set('hiringStatus', this.form, Validators.required);
    }

    producerValidations(): void {
        this.log.info(`[${this.constructor.name}]`, 'Applying producer-specific validations.');
        HandleValidatorsHelper.set('producerType', this.form, Validators.required);
        HandleValidatorsHelper.set('sector', this.form, [Validators.maxLength(150)]);
        HandleValidatorsHelper.set('partnerType', this.form, Validators.required);
        HandleValidatorsHelper.set('producerIsIndustrialConsumer', this.form, Validators.required);
    }

    municipalityValidations(): void {
        this.log.info(`[${this.constructor.name}]`, 'Applying municipality-specific validations.');
        this.businessName();
        this.taxIdentificationNumber();
    }

    businessName() {
        HandleValidatorsHelper.set('businessName', this.form, [Validators.required]);
    }

    taxIdentificationNumber() {
        HandleValidatorsHelper.set('taxIdentificationNumber', this.form, [Validators.required, Validators.maxLength(150)]);
    }

    clearValidationStates(): void {
        GeneralHelper.formClearValidationStatesOrganization(this.form);
    }

    markAllAsTouched(form: any): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    organizationType = GeneralHelper.enumToList(OrganizationTypeEnum)
    managerTypes = GeneralHelper.enumToList(ManagerTypeEnum);
    hiringStatuses = GeneralHelper.enumToList(HiringStatus);
    producerTypes = GeneralHelper.enumToList(CategoryTypeEnum);
    partnerType: any = GeneralHelper.enumToList( PartnerTypeEnum);

    documents: any;
}
