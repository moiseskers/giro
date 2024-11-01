import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'milligrams',
  standalone: true
})
export class MilligramsPipe implements PipeTransform {

  transform(input: number): string {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 9,
      maximumFractionDigits: 9,
      useGrouping: false // This removes the thousands separator
    }).format(input);
  }

}
