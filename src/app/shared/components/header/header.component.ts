import { Component, OnInit } from '@angular/core';
import {NavItem} from '../../../models/nav-item';
import {CONSTANTS} from '../../../../constants';
import {Currency} from '../../../models/currency';
import {AppReducerState} from '../../../core/reducer/app.reducer';
import {Store} from '@ngrx/store';
import {UserService} from '../../../core/reducer/user.service';
import {ToastrService} from 'ngx-toastr';
import * as actions from '../../../core/reducer/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navItems: NavItem[] = [
    {
      display: 'Purchase by item',
      path: CONSTANTS.ROUTES.PURCHASE_BY_ITEM.BASE,
      iconClass: 'bi-bag'
    },
    {
      display: 'Purchase by store',
      path: CONSTANTS.ROUTES.PURCHASE_BY_STORE.BASE,
      iconClass: 'bi-shop'
    },
  ];

  public currencies: Currency[] = []
  public selectedCurrency: Currency;

  constructor(private user: UserService, private toastr: ToastrService,
              private store: Store<AppReducerState>) { }

  ngOnInit(): void {
    this.user.getAllStates().subscribe((state) => {
      this.currencies  = state.currencies;
      this.selectedCurrency = state.selectedCurrency;
    }, () => {
      this.toastr.error('Oops...something went wrong.', 'Error!');
    });
  }

  public changeCurrency(newSelectedCurrency: Currency): void {
    this.store.dispatch( {type: actions.ACTION_SELECTED_CURRENCY, payload: newSelectedCurrency});
  }
}
