import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GeneralHelper} from "../../../../../../shared/helpers/general-helper";
import {FocusFirstInvalidFieldModule} from "../../../../../../shared/directives/focus-first-invalid-field";
import {FormErrorModule} from "../../../../../../shared/components/form-error";
import {RadioButtonModule} from "primeng/radiobutton";
import {NgForOf} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {NgxMaskDirective} from "ngx-mask";
import {DropdownModule} from "primeng/dropdown";
import {RedAsteriskDirective} from '../../../../../../shared/directives/red-asterisk-directive/red-asterisk.directive';
import {ManagerResponseDto} from '../../../../../../shared/models/manager-response.dto';

@Component({
    selector: 'app-organization-user-form',
    templateUrl: './organization-user-form.component.html',
    styleUrl: './organization-user-form.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FocusFirstInvalidFieldModule,
        FormErrorModule,
        RadioButtonModule,
        NgForOf,
        DividerModule,
        ButtonModule,
        NgxMaskDirective,
        DropdownModule,
        RedAsteriskDirective
    ]
})
export class OrganizationUserFormComponent {

    form: FormGroup;

    @Output() saveEvent: EventEmitter<ManagerResponseDto> = new EventEmitter();
    @Output() closeEvent: EventEmitter<void> = new EventEmitter();

    @Input() model: ManagerResponseDto;
    @Input() buttonIsLoading: boolean;

    types: any[] = [
        {
            value: 'Miembro',
            key: 'MEMBER'
        },
        {
            value: 'Moderador',
            key: 'MODERATOR'
        }
    ];

    @Input()
    isEditing: boolean;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.model?.name, [Validators.required]],
            email: [this.model?.email, [Validators.required, Validators.email]],
            phone: [this.model?.phone, [Validators.maxLength(20)]],
            role: [this.model?.role, Validators.required],
            responsibility: [this.model?.responsibility, Validators.required]
        });

        if (this.isEditing) {
            this.form.controls['email'].disable();
        }
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.saveEvent.emit(this.form.getRawValue());
    }

}
