import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppAutoCompleteModule} from "../../../../../shared/components/autocomplete/app-auto-complete.component";
import {AppCalendarModule} from "../../../../../shared/components/calendar/calendar";
import {AppInputNumberModule} from "../../../../../shared/components/inputnumber/inputnumber";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../../../shared/components/form-error";
import {GiroUploadComponent} from "../../../../../shared/components/upload/giro-upload.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "../../../../../shared/components/paginator/paginator";
import {FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {LoaderService} from "../../../../../shared/services/loader";
import {NGXLogger} from "ngx-logger";
import {UuidHelper} from "../../../../../shared/helpers/uuid-helper";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {ControlsOfType} from "../../../../../shared/types/controls-of.type";
import {CigService} from "../../services/cig.service";
import {lastValueFrom} from "rxjs";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {CigRequestDto} from '../../../../../shared/models/cig-request.dto';
import {OrganizationResponseDto} from '../../../../../shared/models/organization-response.dto';
import {BranchResponseDto} from '../../../../../shared/models/branch-response.dto';
import {RedAsteriskDirective} from '../../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@Component({
    selector: 'app-cig-form',
    standalone: true,
    imports: [
        AppAutoCompleteModule,
        AppCalendarModule,
        AppInputNumberModule,
        ButtonModule,
        DividerModule,
        DropdownModule,
        FocusFirstInvalidFieldModule,
        FormErrorModule,
        GiroUploadComponent,
        InputTextareaModule,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        RedAsteriskDirective,
    ],
    templateUrl: './cig-form.component.html',
    styleUrl: './cig-form.component.scss'
})
export class CigFormComponent {

    form: FormGroup<ControlsOfType<CigRequestDto>>;

    consumerValue: any;
    consumerFiltered: {id: string, name: string}[];
    consumerLoaderId = UuidHelper.get();

    consumerIdValue: any;
    consumerIdFiltered: any[];
    consumerIdLoaderId = UuidHelper.get();

    collectorValue: any;
    collectorFiltered: any[];
    collectorLoaderId = UuidHelper.get();

    collectorIdValue: any;
    collectorIdFiltered: any[];
    collectorIdLoaderId = UuidHelper.get();

    pretreatmentValue: any;
    pretreatmentFiltered: any[];
    pretreatmentLoaderId = UuidHelper.get();

    pretreatmentIdValue: any;
    pretreatmentIdFiltered: any[];
    pretreatmentIdLoaderId = UuidHelper.get();

    valorizerValue: any;
    valorizerFiltered: any[];
    valorizerLoaderId = UuidHelper.get();

    valorizerIdValue: any;
    valorizerIdFiltered: any[];
    valorizerIdLoaderId = UuidHelper.get();

    @Input()
    saveLoaderId: string;

    @Output() saveEvent: EventEmitter<CigRequestDto> = new EventEmitter();

    constructor(
        public ref: DynamicDialogRef,
        private fb: FormBuilder,
        public loaderService: LoaderService,
        private service: CigService,
        private log: NGXLogger
    ) {
        this.log.debug('CigFormComponent constructor initialized');
    }

    async ngOnInit() {
        this.log.debug('CigFormComponent ngOnInit started');
        this.form = this.fb.group({
            industrialConsumerId: new FormControl('', {validators: Validators.required, nonNullable: true}),
            industrialConsumerBranchId: new FormControl('', {validators: Validators.required, nonNullable: true}),
            pickupId: new FormControl('',),
            pickupBranchId: new FormControl('',),
            pretreatmentId: new FormControl('',),
            pretreatmentBranchId: new FormControl('',),
            valuerId: new FormControl('',),
            valuerBranchId: new FormControl('',),
        });
        this.log.debug('Form initialized', this.form);
    }

    save() {
        const model: CigRequestDto = this.form.getRawValue();

        Object.keys(model).forEach(value => {
            if (GeneralHelper.isEmptyOrUndefinedOrNull(model[value]) ) {
                model[value] = undefined;
            }
        });

        if (!(model?.pickupId || model?.pretreatmentId || model?.valuerId)) {
            throw Error('Selecciona al menos un gestor!');
        }

        this.log.debug('Save called', model);
        this.saveEvent.emit(model);
    }

    ngModelChange(control: FormControl<any>, $event: any) {
        const value = $event?.id ? $event.id : $event;
        control.setValue(value);
    }

    // ngModelChange(controlName: any, $event: any) {
    //     const value = $event?.id ? $event.id : $event;
    //     this.log.debug(`ngModelChange called for control ${controlName} with value`, value);
    //     this.form.controls[controlName].setValue(value);
    // }

    async filterConsumer($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterConsumer called', $event);
        this.consumerFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.consumer($event.query)), this.consumerLoaderId))?.items.map(value => this.organizationMapper(value));
    }

    async filterConsumerId($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterConsumerId called', $event);
        const organizationId =  this.form.controls.industrialConsumerId.getRawValue();
        this.consumerIdFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.branches(organizationId, $event.query)), this.consumerIdLoaderId))?.items.map(value => this.branchMapper(value));
    }

    async filterCollector($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterCollector called', $event);
        this.collectorFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.collector($event.query)), this.collectorLoaderId))?.items.map(value => this.organizationMapper(value));
    }

    async filterCollectorId($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterCollectorId called', $event);
        const organizationId =  this.form.controls.pickupId.getRawValue();
        this.collectorIdFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.branches(organizationId, $event.query)), this.collectorIdLoaderId))?.items.map(value => this.branchMapper(value));
    }

    async filterPretreatment($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterPretreatment called', $event);
        this.pretreatmentFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.pretreatment($event.query)), this.pretreatmentLoaderId))?.items.map(value => this.organizationMapper(value));
    }

    async filterPretreatmentId($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterPretreatmentId called', $event);
        const organizationId =  this.form.controls.pretreatmentId.getRawValue();
        this.pretreatmentIdFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.branches(organizationId, $event.query)), this.pretreatmentIdLoaderId))?.items.map(value => this.branchMapper(value));
    }

    async filterValorizer($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterValorizer called', $event);
        this.valorizerFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.valorizer($event.query)), this.valorizerLoaderId))?.items.map(value => this.organizationMapper(value));
    }

    async filterValorizerId($event: AutoCompleteCompleteEvent) {
        this.log.debug('filterValorizerId called', $event);
        const organizationId =  this.form.controls.valuerId.getRawValue();
        this.valorizerIdFiltered = (await this.loaderService.activateLoader(() => lastValueFrom(this.service.branches(organizationId, $event.query)), this.valorizerIdLoaderId))?.items.map(value => this.branchMapper(value));
    }

    organizationMapper(model: OrganizationResponseDto): {id: string, name: string} {
        return {
            id: model.id,
            name: `${model.businessName} | ${model.taxIdentificationNumber}`
        }
    }

    branchMapper(model: BranchResponseDto): {id: string, name: string} {
        return {
            id: model.id,
            name: `${model.code} | ${model.address}`
        }
    }

    markAllAsTouched(f: NgForm) {
        this.log.debug('markAllAsTouched called');
        Object.keys(f.form.controls).forEach(key => {
            if (f.form.controls[key].status !== 'DISABLED') {
                f.form.controls[key].markAllAsTouched()
                f.form.controls[key].markAsDirty()
                this.log.debug(`Control ${key} marked as touched and dirty`);
            }
        });
    }


}
