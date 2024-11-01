import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {GeneralHelper} from "../../../../../shared/helpers/general-helper";

@Component({
    selector: 'app-cancel-bidding-form',
    templateUrl: './cancel-bidding-form.component.html',
    styleUrl: './cancel-bidding-form.component.scss'
})
export class CancelBiddingFormComponent {

    form: FormGroup;
    buttonIsLoading: boolean;

    constructor(private fb: FormBuilder,
                public ref: DynamicDialogRef,) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            description: ['', Validators.required],
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
}
