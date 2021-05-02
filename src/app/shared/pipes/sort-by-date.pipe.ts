import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any, sortedColumn: string): Array<any> {
    if (sortedColumn) {
      const sortedValues = value.slice().sort((a, b) => a[sortedColumn].getTime() - b[sortedColumn].getTime());
      return sortedValues;
    }
  }
}
