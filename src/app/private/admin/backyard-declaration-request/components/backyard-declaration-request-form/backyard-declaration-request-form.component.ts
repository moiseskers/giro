// import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
// import {FormBuilder, FormGroup, NgModel, Validators} from "@angular/forms";
// import {DynamicDialogRef} from "primeng/dynamicdialog";
// import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
// import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
// import {remove as removeDiacritics} from 'diacritics';
// import {ManagerInModel} from "../../../../../shared/models/manager-in.model";
// import {
//     CreateDeclarationRequestRequestForm
// } from "../../../../../shared/form-models/create-declaration-request-request.form";
// import {DeclarationRequestRecurrence} from "../../../../../shared/enums/declaration-request-recurrence";
// import {CreateDeclarationRequestRequestDto} from "../../../../../shared/models/create-declaration-request-request-dto";
// import {DeclarationRequestResponseDto} from "../../../../../shared/models/declaration-request-response-dto";
// import {OrganizationResponseDto} from "../../../../../shared/models/organization-response.dto";
//
// @Component({
//     selector: 'app-backyard-declaration-request-form',
//     templateUrl: './backyard-declaration-request-form.component.html',
//     styleUrl: './backyard-declaration-request-form.component.scss',
// })
// export class BackyardDeclarationRequestFormComponent {
//
//     @Input()
//     model: DeclarationRequestResponseDto;
//
//     form: FormGroup<CreateDeclarationRequestRequestForm>;
//
//     options = GeneralHelper.enumToList(DeclarationRequestRecurrence);
//
//
//     reload: boolean = true;
//
//     @Output() onSave: EventEmitter<CreateDeclarationRequestRequestDto> = new EventEmitter();
//     @Output() searchOrganizationEventEmitter: EventEmitter<string> = new EventEmitter();
//     @Input() saveLoader: boolean;
//     @Input() editing: boolean;
//     @Input() organizationResponseDto:  OrganizationResponseDto[] = []
//
//     public formValueWasChanged: boolean = false;
//
//     @Input()
//     organizationsValueIn:  { businessName: string, id: string } [] = [];
//     organizationsValue:    { businessName: string, id: string } [] = [];
//
//     defaultConsumersValue: { businessName: string, id: string } [] = [];
//
//     @ViewChild('producersNgModelChangeRef') producersNgModelChangeRef: NgModel;
//     protected readonly DeclarationType = DeclarationRequestRecurrence;
//     private originalValue: any;
//
//     constructor(private fb: FormBuilder,
//                 public ref: DynamicDialogRef,) {
//     }
//
//    async ngOnInit() {
//
//        this.organizationsValueIn = this.organizationResponseDto.map(value => {
//            return this.organizationToOrganizationValue(value);
//        });
//
//         this.form = this.fb.group({
//             declaredMonthYear: [{
//                 disabled: this.editing
//             }, Validators.required],
//             organizations: [this.model?.organizations.map(value => {
//                 return {
//                     id: value?.id
//                 }
//             }), Validators.required],
//         });
//
//         // used to check if the form was altered
//         this.originalValue = this.form.value;
//         this.defaultConsumersValue = this.model?.organizations || [];
//
//         this.organizationsValue = this.organizationsValueIn.filter(value => this.model?.organizations.map(organization => organization.id).includes(value.id));
//
//         // check if from was changed
//         this.valueChangesForm();
//
//         this.form.controls.declaredMonthYear.valueChanges.subscribe(value => {
//         });
//     }
//
//     valueChangesForm() {
//         this.form.valueChanges.subscribe(value => {
//             this.formValueWasChanged = JSON.stringify(value) !== JSON.stringify(this.originalValue);
//         });
//     }
//
//     markAllAsTouched(form: FormGroup): void {
//         GeneralHelper.formMarkAllAsTouchedModel1(form);
//         this.producersNgModelChangeRef.control.markAsTouched();
//     }
//
//     save() {
//         const rawValue: CreateDeclarationRequestRequestDto = this.form.getRawValue();
//         this.onSave.emit(rawValue);
//     }
//
//     cancel() {
//         this.ref.close(false);
//     }
//
//     async filterProducers($event: AutoCompleteCompleteEvent) {
//         let query: string = removeDiacritics($event.query.toLowerCase());
//         this.searchOrganizationEventEmitter.emit(query);
//     }
//
//     organizationsValueNgModelChange($event: any[]) {
//         $event = this.getUniqueListBy($event, 'id');
//         this.organizationsValue = $event;
//         this.form.controls.organizations.setValue($event.map(value => value?.id));
//     }
//
//     getUniqueListBy(arr: any[], key: string) {
//         return [...new Map(arr.map(item => [item[key], item])).values()]
//     }
//
//     organizationToOrganizationValue(organization: OrganizationResponseDto) {
//         return {
//             id: organization?.id,
//             businessName: `${organization?.businessName} | ${organization?.taxIdentificationNumber}`,
//         }
//     }
//
// }
