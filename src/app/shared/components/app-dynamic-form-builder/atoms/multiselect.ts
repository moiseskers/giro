import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'multiselect',
    template: `
        <div [formGroup]="form">
            <p-multiSelect
                    [filter]="false"
                    [ngModelOptions]="{standalone: true}"
                    [ngModel]="value"
                    (ngModelChange)="ngModelChange($event)"
                    [id]="field.name"
                    [placeholder]="field.label"
                    [options]="field?.options"
                    [name]="field.name"
                    optionValue="key">
            </p-multiSelect>
        </div>
    `,
    styles: [
        `
          :host ::ng-deep
          .p-multiselect-label {
              width: 180px;
          }`
    ]
})
export class Multiselect {

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
