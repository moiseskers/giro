import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-rejected-form',
    templateUrl: './rejected-form.component.html',
    styleUrl: './rejected-form.component.scss'
})
export class RejectedFormComponent {

    form: FormGroup;
    buttonIsLoading: boolean;

    constructor(private fb: FormBuilder,
                public ref: DynamicDialogRef,) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            rejectedDescription: ['', Validators.required],
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
}
