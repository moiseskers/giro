import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {GiroUploadComponent} from '../../../../../shared/components/upload/giro-upload.component';
import {FocusFirstInvalidFieldModule} from '../../../../../shared/directives/focus-first-invalid-field';
import {Button} from 'primeng/button';
import {FormErrorModule} from '../../../../../shared/components/form-error';
import {
    MultiselectCheckboxComponent
} from '../../../../../shared/components/multiselect-checkbox/multiselect-checkbox.component';
import {
    RedAsteriskV2Directive
} from '../../../../../shared/directives/red-asterisk-directive/red-asterisk-v2.directive';
import {AllowedOrganizationTypesEnum} from '../../../../../shared/enums/allowed-organization-types.enum';
import {MaterialDocumentRequestDto} from '../../../../../shared/models/material-document-request.dto';
import {MaterialDocumentRequestForm} from '../../../../../shared/form-models/material-document-request.form';
import {AllowedOrganizationTypes} from '../../../../../shared/types/allowed-organization.types';
import {MaterialDocumentResponseDto} from '../../../../../shared/models/material-document-response.dto';
import {NGXLogger} from 'ngx-logger';
import {AppValidators} from '../../../../../shared/validators/app-validators';

@Component({
    selector: 'app-material-document-form',
    templateUrl: './material-document-form.component.html',
    styleUrl: './material-document-form.component.scss',
    standalone: true,
    imports: [
        GiroUploadComponent,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        Button,
        FormErrorModule,
        MultiselectCheckboxComponent,
        RedAsteriskV2Directive
    ]
})
export class MaterialDocumentFormComponent {

    form: FormGroup<MaterialDocumentRequestForm>;

    @Output() saveEvent: EventEmitter<MaterialDocumentRequestDto> = new EventEmitter();
    @Output() cancelEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: MaterialDocumentResponseDto;
    @Input() buttonIsLoading: boolean;

    @Input() multiple: boolean = false;

    options = [
        {
            label: 'Productores',
            key: GeneralHelper.getKeyByValue(AllowedOrganizationTypesEnum, AllowedOrganizationTypesEnum.PRODUCER )
        },
        {
            label: 'Consumidores industriales',
            key: GeneralHelper.getKeyByValue( AllowedOrganizationTypesEnum, AllowedOrganizationTypesEnum.INDUSTRIAL_CONSUMER)
        }
    ];


    constructor(private log: NGXLogger) {
    }

    ngOnInit(): void {
        this.form = new FormGroup<MaterialDocumentRequestForm>({
            file: new FormControl(null, AppValidators.arrayNotEmptyValidator()),
            allowedOrganizationTypes: new FormControl<AllowedOrganizationTypes[]>(null, {
                validators: Validators.required,
                nonNullable: true
            }),
        });
    }

    save() {
        this.log.info('material document form', this.form.getRawValue())
        const form = this.form.getRawValue();

        const request: MaterialDocumentRequestDto  = {
            contentType: form.file[0].contentType,
            file: form.file[0].file,
            allowedOrganizationTypes: form.allowedOrganizationTypes,
            name: form.file[0].name,
        };

        this.log.info('material request document', request);
        this.saveEvent.emit(request);
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }
}
