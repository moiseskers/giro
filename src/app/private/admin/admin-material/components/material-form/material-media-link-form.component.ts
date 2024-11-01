import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateMediaLinkForm} from '../../../../../shared/form-models/create-media-link.form';
import {
    RedAsteriskV2Directive
} from '../../../../../shared/directives/red-asterisk-directive/red-asterisk-v2.directive';
import {FormErrorModule} from '../../../../../shared/components/form-error';
import {FocusFirstInvalidFieldModule} from '../../../../../shared/directives/focus-first-invalid-field';
import {GeneralHelper} from '../../../../../shared/helpers/general-helper';
import {NGXLogger} from 'ngx-logger';
import {CreateMediaLinkDto} from '../../../../../shared/models/create-media-link.dto';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {
    MultiselectCheckboxComponent
} from '../../../../../shared/components/multiselect-checkbox/multiselect-checkbox.component';
import {AllowedOrganizationTypes} from '../../../../../shared/types/allowed-organization.types';
import {AllowedOrganizationTypesEnum} from '../../../../../shared/enums/allowed-organization-types.enum';

@Component({
    selector: 'app-material-media-link-form',
    templateUrl: './material-media-link-form.component.html',
    styleUrl: './material-media-link-form.component.scss',
    standalone: true,
    imports: [
        Button,
        RedAsteriskV2Directive,
        ReactiveFormsModule,
        FormErrorModule,
        FocusFirstInvalidFieldModule,
        InputTextareaModule,
        MultiselectCheckboxComponent
    ]
})
export class MaterialMediaLinkFormComponent {

    @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
    @Output() saveEvent: EventEmitter<CreateMediaLinkDto> = new EventEmitter();

    @Input() buttonIsLoading: boolean;

    form: FormGroup<CreateMediaLinkForm>;

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

    constructor(private log: NGXLogger) {}

    async ngOnInit() {
        this.form = new FormGroup<CreateMediaLinkForm>({
            url: new FormControl(null, {validators: [Validators.pattern('https?://.+'), Validators.required], nonNullable: true}),
            allowedOrganizationTypes: new FormControl<AllowedOrganizationTypes[]>(null, {
                validators: Validators.required,
                nonNullable: true
            }),
        });
    }

    markAllAsTouched(form: FormGroup<CreateMediaLinkForm>) {
        form.controls.allowedOrganizationTypes.markAsTouched()
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        const model = this.form.getRawValue();
        this.log.debug('save called', model);
        this.saveEvent.emit(model);
    }
}
