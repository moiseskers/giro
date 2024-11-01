import {Component, Input} from '@angular/core';
import {NgModel, UntypedFormGroup} from '@angular/forms';

// text,email,tel,textarea,password,
@Component({
    selector: 'date',
    template: `
        <ng-container [formGroup]="form" *ngIf="display">
            <app-p-calendar
                    appSingleDateRangeValidator
                    [view]="this.field?.config?.dateView ? this.field?.config?.dateView : 'date'"
                    [appSingleDateValidate]="field?.config?.selectionMode"
                    #dateNgModelChangeRef="ngModel"
                    [dateFormat]="this.field?.config?.dateFormat ? this.field?.config?.dateFormat : 'dd/mm/yy'"
                    [ngModel]="value"
                    [selectionMode]="field?.config?.selectionMode ? field?.config?.selectionMode : 'single'"
                    [ngModelOptions]="{standalone: true}"
                    [showTime]="field?.config?.dataAndTime"
                    [placeholder]="field?.placeholder"
                    [id]="field.name"
                    (ngModelChange)="ngModelChange($event, dateNgModelChangeRef)"
                    (onShow)="onShow($event)"
                    [name]="field.name"
                    [showIcon]="true"
                    inputId="icon">
            </app-p-calendar>
            <small app-form-error
                   [customErrorMessages]="[{ errorIdentifier: 'singleDateRange', message: 'La gama de fechas debe ser un arreglo de dos fechas en el formato DD/MM/YYYY - DD/MM/YYYY, por ejemplo, 01/07/2024 - 31/07/2024.' }]"
                   [formControl]="dateNgModelChangeRef?.control" ></small>
        </ng-container>
    `
})
export class DateComponent {

    @Input() field: any = {};
    @Input() form: UntypedFormGroup;

    display = false;

    value: any;

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }

    ngAfterViewInit(): void {
        // const date = this?.form?.controls[this?.field?.name]?.value;
        // if (date) {
        //     const parsed = Date.parse(date);
        //     if (isNaN(parsed)) {
        //     } else {
        //         this.form.controls[this.field.name].setValue('');
        //     }
        // }
        this.display = true;
    }

    onShow($event?: any) {

        if (this.field?.config?.range) {

            if (this?.field?.config?.rangePosition == undefined || this?.field?.config?.rangePosition == '') {
                throw new Error("Range position is required! please set it at: field.config.rangePosition, with values 1 or 2");
            }

            if (!(this?.field?.config?.rangePosition > 0 && this?.field?.config?.rangePosition < 3)) {
                throw new Error("Range position not allowed! please set it at: field.config.rangePosition, with values 1 or 2");
            }

            if (this.field.config.rangePosition == 1) {
                this.form.controls[this.field.name].setValue(this.getStartDate());
            }

            if (this.field.config.rangePosition == 2) {
                this.form.controls[this.field.name].setValue(this.getEndDate());
            }
        }
    }

    public getStartDate(): Date {
        const d1 = new Date();
        d1.setHours(0, 0, 0, 0);
        return d1;
    }

    public getEndDate(): Date {
        const d2 = new Date();
        d2.setHours(23, 59, 59, 999);
        return d2;
    }

    ngModelChange($event: any, dateNgModelChangeRef: NgModel): void {
        const isArray = Array.isArray($event);
        if (isArray) {
            $event = $event
                .filter((d: Date) => d)
                .map((date: Date) => date.toJSON());
            const value = $event.join(',');
            this.form.controls[this.field.name].setValue(value);
        } else {
            this.form.controls[this.field.name].setValue($event);
        }
        this.form.setErrors(dateNgModelChangeRef.errors);
    }
}
