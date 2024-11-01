import {Component, Input, ViewChild} from '@angular/core';
import {FieldV2} from './models/fieldV2';
import {FieldBuilderType} from '../app-dynamic-form-builder/models/field-builder.type';
import {NgForOf, NgIf, NgSwitch, NgTemplateOutlet} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {UuidHelper} from '../../helpers/uuid-helper';

@Component({
  selector: 'app-dynamic-form-builder-ng-model',
  templateUrl: './dynamic-form-builder-ng-model.component.html',
  styleUrl: './dynamic-form-builder-ng-model.component.scss',
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgIf,
    FormsModule,
    ChipsModule,
    NgSwitch
  ],
  standalone: true
})
export class DynamicFormBuilderNgModelComponent {

  @ViewChild('form')
  form: NgForm

  @Input()
  fields: FieldV2[] = [];

  defaultIdValue = UuidHelper.get();

  isBasicInputType(type: FieldBuilderType): boolean {
    const basicInputTypes: Set<FieldBuilderType> = new Set([
      'password',
      'email',
      'number',
      'tel',
      'url',
      'time',
      'range',
      'hidden',
      'submit',
      'reset',
      'text'
    ]);
    return basicInputTypes.has(type);
  }


}
