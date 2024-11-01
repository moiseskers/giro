import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {LegalRepresentativeRequestDto} from "../../../../../shared/models/legal-representative-request.dto";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {AutofocusModule} from "../../../../../shared/directives/autofocus";
import {FormErrorModule} from "../../../../../shared/components/form-error";
import {FocusFirstInvalidFieldModule} from "../../../../../shared/directives/focus-first-invalid-field";
import {NgxMaskDirective} from "ngx-mask";
import {DividerModule} from "primeng/divider";
import {LegalRepresentativeResponseDto} from "../../../../../shared/models/legal-representative-response.dto";
import {ToUpperCaseDirective} from "../../../../../shared/directives/to-upper-case/to-upper-case.directive";
import {RedAsteriskDirective} from '../../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';

@Component({
    selector: 'app-legal-representative-form',
    templateUrl: './legal-representative-form.component.html',
    styleUrl: './legal-representative-form.component.scss',
    standalone: true,
    imports: [
        AutofocusModule,
        FormErrorModule,
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        NgxMaskDirective,
        DividerModule,
        ButtonModule,
        ToUpperCaseDirective,
        RedAsteriskDirective
    ]
})
export class LegalRepresentativeFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<LegalRepresentativeRequestDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: LegalRepresentativeResponseDto;
    @Input() buttonIsLoading: boolean;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.model?.name, [Validators.required, Validators.maxLength(150)]],
            nationality: [this.model?.nationality, [Validators.required, Validators.maxLength(150)]],
            taxIdentificationNumber: [this.model?.taxIdentificationNumber, [Validators.required, Validators.maxLength(150)]],
            email: [this.model?.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
            phone: [this.model?.phone, [Validators.maxLength(20)]]
        });
    }

    markAllAsTouched(form: FormGroup) {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.saveEvent.emit(this.form.getRawValue());
    }
}
