import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'addSymbol',
  standalone: true
})
export class AddSymbolPipe implements PipeTransform {

  transform(value: any, symbol: string, place?: string): string {

    if (value === undefined || value === null || value === '') {
      return '';
    }

    return `${value} ${symbol} `;
  }

}
