import {Component, OnInit} from '@angular/core';
import {RequestService} from './core/request.service';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {CONSTANTS} from '../constants';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {AppReducerState} from './core/reducer/app.reducer';
import * as actions from './core/reducer/app.actions';
import {AppService} from './core/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public constants = CONSTANTS;
  public firstExchangeRateFetch = true;
  public showErrorView = false;

  constructor(private requestService: RequestService, private spinner: NgxSpinnerService,
              private toastr: ToastrService, private store: Store<AppReducerState>,
              private appService: AppService) {
  }

  ngOnInit(): void {
    timer(0, CONSTANTS.EXCHANGE_RATES_FETCH_MS).pipe(
      switchMap(() => {
        if (this.firstExchangeRateFetch) {
          this.spinner.show();
        }
        return of(this.requestService.getExchangeRates().pipe(
          map((result: any) => {
            const currencies = Object.keys(result?.rates).map((key) => {
              return {
                name: key,
                rate: result?.rates[key]
              };
            });
            this.store.dispatch( {type: actions.ACTION_INIT_CURRENCIES, payload: currencies});

            // init USD as select currency
            if (this.firstExchangeRateFetch) {
              const selectedCurrency = currencies.filter(c => {
                return c.name === CONSTANTS.DEFAULT_CURRENCY;
              });

              if (selectedCurrency && selectedCurrency.length > 0){
                this.store.dispatch( {type: actions.ACTION_SELECTED_CURRENCY, payload: selectedCurrency[0]});
                this.store.dispatch( {type: actions.ACTION_SET_DEFAULT_CURRENCY, payload: selectedCurrency[0]});
              }

              this.firstExchangeRateFetch = false;
              this.showErrorView = false;
            }
          }),
          catchError((error: any) => {
            this.toastr.error('Failed to fetch exchange rates.', 'Error!');
            if (this.firstExchangeRateFetch) { // failed to fetch currencies. show error view
              this.showErrorView = true;
            }
            throw Error(error);
          }),
          finalize(() => {
            this.spinner.hide();
          })
        ).subscribe());
      })
    ).subscribe();
  }

  public get pageTitle(): string {
    return this.appService.pageTitle;
  }
}
