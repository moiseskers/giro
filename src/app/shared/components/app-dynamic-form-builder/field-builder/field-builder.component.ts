import {Component, Input} from '@angular/core';

@Component({
    selector: '[field-builder]',
    template: `
        <ng-container [formGroup]="form">
            <ng-container    [ngSwitch]="field.type">
                <textbox              *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
                <dropdown             *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
                <checkbox             *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
                <radio                *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
                <file                 *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
                <date                 *ngSwitchCase="'date'" [field]="field" [form]="form"></date>
                <multiselect          *ngSwitchCase="'multiselect'" [field]="field" [form]="form"></multiselect>
                <multiselect-checkbox *ngSwitchCase="'multiselect-checkbox'" [field]="field" [form]="form"></multiselect-checkbox>
                <autocomplete         *ngSwitchCase="'autocomplete'" [field]="field" [form]="form"></autocomplete>
            </ng-container>
        </ng-container>
    `
})
export class FieldBuilderComponent {

    @Input() field: any;
    @Input() form: any;

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }

}
