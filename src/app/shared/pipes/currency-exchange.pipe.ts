import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from '../../core/reducer/user.service';
import {Currency} from '../../models/currency';
import {ToastrService} from 'ngx-toastr';
import {CONSTANTS} from '../../../constants';
import {Observable} from 'rxjs';

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform {

  transform(value: number, args: number[]): number {
    if (args && args.length > 1) {
      return (value / args[0] * args[1]);
    }
    return value;
  }

}
