import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-form-builder',
    template: `
        <form (ngSubmit)="submit()" [formGroup]="form" class="p-fluid">
            <ng-container *ngFor="let field of fields">
                <div class="field" field-builder [field]="field" [form]="form"></div>
            </ng-container>
        </form>
    `,
})
export class AppDynamicFormBuilderComponent implements OnInit {

    @Output() onSubmit = new EventEmitter();
    @Input() fields: any[] = [];
    form: UntypedFormGroup;

    ngOnInit() {
        let fieldsCtrls = {};
        for (let f of this.fields) {
            if (f.type != 'checkbox') {
                fieldsCtrls[f.name] = new UntypedFormControl(f.value || '')
            } else {
                let opts = {};
                if (f?.options) {
                    for (let opt of f.options) {
                        opts[opt.key] = new UntypedFormControl(opt.value);
                    }
                    fieldsCtrls[f.name] = new UntypedFormGroup(opts)
                }
            }
        }

        this.form = new UntypedFormGroup(fieldsCtrls);
    }

    submit() {
        this.onSubmit.emit(this.form.value);
    }

}
