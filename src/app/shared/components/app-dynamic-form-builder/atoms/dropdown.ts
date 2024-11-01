import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: `
      <div [formGroup]="form">
          <p-dropdown [options]="field.options" 
                      [placeholder]="field?.placeholder" 
                      [id]="field.name" 
                      [name]="field.name" 
                      [formControlName]="field.name"
                      optionValue="key" 
                      [showClear]="field?.config?.showClear">

              <ng-template pTemplate="selectedItem" >
                  <div class="country-item country-item-value" *ngIf="form.controls[field.name].value">
                      <div>{{filter?.label}}</div>
                  </div>
              </ng-template>
              <ng-template let-option pTemplate="item">
                  <div class="country-item">
                      <div>{{option.label}}</div>
                  </div>
              </ng-template>
          </p-dropdown>
      </div>
    `
})
export class DropDownComponent {

    @Input() field: any = {};
    @Input() form: UntypedFormGroup;

    get filter(): any {
        return this?.field?.options?.filter((value: { key: any; }) => value.key == this.form.controls[this.field.name].value)[0];
    }

}
