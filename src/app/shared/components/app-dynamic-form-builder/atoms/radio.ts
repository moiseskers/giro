import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {Field} from '../../app-filter/models/filter';

@Component({
    selector: 'radio',
    template: `
        <div [formGroup]="form">
            <!--        <div class="form-check" *ngFor="let opt of field.options">-->
            <!--          <input class="form-check-input" type="radio" [value]="opt.key" >-->
            <!--          <label class="form-check-label">-->
            <!--            {{opt.label}}-->
            <!--          </label>-->
            <!--        </div>-->
            <div class="flex flex-column gap-1">
                <ng-container *ngFor="let opt of field?.options">
                    <div>
                        <p-radioButton class="p-mr-1" [name]="this.field?.name" [value]="opt?.key"
                                       [formControlName]="this.field.name"></p-radioButton>
                        <label for="city2">{{opt?.label}}</label>
                    </div>
                </ng-container>
            </div>

        </div>
    `
})
export class RadioComponent {
    @Input() field: Field = {};
    @Input() form: UntypedFormGroup;
}
