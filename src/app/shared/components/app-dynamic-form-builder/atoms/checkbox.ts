import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'checkbox',
    template: `
        <div [formGroup]="form">
            <div [formGroupName]="field.name" class="flex  flex-column gap-1">
                <div *ngFor="let opt of field?.options">
                    <!--             <input [formControlName]="opt.key" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />{{opt.label}}</label>-->
                    <p-checkbox [binary]="true"
                                tooltipPosition="left"
                                [pTooltip]="opt?.label"
                                [label]="opt?.label" [formControlName]="opt.key"></p-checkbox>
                </div>
            </div>
        </div>
    `
})
export class CheckBoxComponent {

    @Input() field: any = {};

    @Input() form: UntypedFormGroup;

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }
}
