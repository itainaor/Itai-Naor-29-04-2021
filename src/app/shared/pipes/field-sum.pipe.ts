import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to return the sum of `attr` fields in `items`
 */
@Pipe({
  name: 'fieldSum'
})
export class FieldSumPipe implements PipeTransform {
  transform(items: any[], attr: string): number {
    return items.reduce((a, b) => a + b[attr], 0);
  }
}
