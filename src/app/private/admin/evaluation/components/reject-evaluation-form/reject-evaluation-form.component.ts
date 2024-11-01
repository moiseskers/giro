import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";

@Component({
    selector: 'app-reject-evaluation-form',
    templateUrl: './reject-evaluation-form.component.html',
    styleUrl: './reject-evaluation-form.component.scss'
})
export class RejectEvaluationFormComponent {

    form: FormGroup;
    buttonIsLoading: boolean;

    constructor(private fb: FormBuilder,
                public ref: DynamicDialogRef,) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            description: ['', Validators.required],
            allowToAppeal: [false, Validators.required],
        });
    }

    markAllAsTouched(form: FormGroup): void {
        GeneralHelper.formMarkAllAsTouchedModel1(form);
    }

    save() {
        this.ref.close(this.form.getRawValue());
    }

    cancel() {
        this.ref.close();
    }

    protected readonly close = close;

    allowToAppealOptions = [
        {
            key: 'No',
            value: false
        },
        {
            key: 'Sí',
            value: true
        }
    ]
}
