import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, symbol: string = '$'): string {
    if (value === null || value === undefined) {
      return '';
    }
    const formattedValue = (value / 100).toFixed(2);
    return `${formattedValue} ${symbol}`;
  }

}
