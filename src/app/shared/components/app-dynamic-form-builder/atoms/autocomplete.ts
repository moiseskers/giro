import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {UuidHelper} from "../../../helpers/uuid-helper";
import {Field} from "../../app-filter/models/filter";
import {remove as removeDiacritics} from 'diacritics';

//  [disabled]="this.loaderService.loading[this.regionLoaderId]"
// //
@Component({
    selector: 'autocomplete',
    template: `
        <div [formGroup]="form">
            <div [formGroupName]="field.name" class="flex  flex-column gap-1">
                <app-p-autoComplete
                        [ngModel]="value"
                        (ngModelChange)="ngModelChange($event)"
                        [ngModelOptions]="{standalone: true}"
                        [id]="uuid"
                        styleClass="w-full"
                        [placeholder]="field?.placeholder"
                        (completeMethod)="filter($event)"
                        [dropdown]="true"
                        [multiple]="field?.config?.autoCompleteMultiple"
                        [suggestions]="filtered"
                        optionLabel="label">
                </app-p-autoComplete>
            </div>
        </div>
    `
})
export class Autocomplete {

    @Input() field: Field = {};
    @Input() form: UntypedFormGroup;

    public uuid = UuidHelper.get();
    data: any[] = [];
    value: any;
    filtered: any[];

    ngOnInit(): void {
        this.data = this.field?.options;
    }

    ngModelChange($event: any): void {

        const isArray = Array.isArray($event);

        if (isArray) {
            const value = $event
                .map(value => value.key)
                .join(',');

            this.form.controls[this.field.name].setValue(value);
        } else {
            const value = $event.key ? $event.key : $event
            this.form.controls[this.field.name].setValue(value);
        }
    }

    // ngModelChange(event: any[]) {
    //     this.currentValue = event.join(',');
    //     this.form.controls[this.field.name].setValue(this.currentValue)
    // }
    //

    async filter(event: AutoCompleteCompleteEvent) {
        // const x = await this.field.config.autocompleteHelper(event.query.toLowerCase());

        let filtered: any[] = [];
        let query = removeDiacritics(event.query.toLowerCase());
        for (let i = 0; i < (this.data as any[]).length; i++) {
            let item = (this.data as any[])[i];
            let label = removeDiacritics(item.label.toLowerCase());
            if (label.indexOf(query) === 0) {
                filtered.push(item);
            }
        }

        this.filtered = filtered;
    }

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }

}
