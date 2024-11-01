import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {MultiselectCheckboxComponent} from "../../multiselect-checkbox/multiselect-checkbox.component";

@Component({
    selector: 'multiselect-checkbox',
    template: `
        <div [formGroup]="form">
            <app-multiselect-checkbox
                    [id]="field.name"
                    [name]="field.name"
                    [ngModel]="value"
                    (ngModelChange)="ngModelChange($event)"
                    [ngModelOptions]="{standalone: true}"
                    [options]="field?.options"
                    optionLabel="label"
                    optionValue="key">
            </app-multiselect-checkbox>
        </div>
    `,
    styles: [
        `
          :host ::ng-deep
          .p-multiselect-label {
            width: 180px;
          }`
    ],
    imports: [
        MultiselectCheckboxComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    standalone: true
})
export class MultiselectCheckbox {

    @Input() field: any = {};

    @Input() form: UntypedFormGroup;

    value: any;
    currentValue: string = '';

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }

    ngModelChange(event: any[]) {
        this.currentValue = event.join(',');
        this.form.controls[this.field.name].setValue(this.currentValue)
    }
}
