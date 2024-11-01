import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'checkEmpty',
  standalone: true
})
export class CheckEmptyPipe implements PipeTransform {

  transform(value: any, defaultValue: string = '-'): string {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    return value;
  }

}
