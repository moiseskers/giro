import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

// text,email,tel,textarea,password,
@Component({
    selector: 'textbox',
    template: `
        <ng-container [formGroup]="form">
            <div class="field">
                <input [placeholder]="field.label" *ngIf="!field.multiline" [attr.type]="field.type" [id]="field.name" [name]="field.name" [formControlName]="field.name" pInputText/>
            </div>
        </ng-container>
    `
})
export class TextBoxComponent {

    @Input() field: any = {};
    @Input() form: UntypedFormGroup;

    constructor() {

    }

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }
}
