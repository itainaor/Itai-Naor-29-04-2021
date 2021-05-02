import { Component, OnInit } from '@angular/core';
import {CONSTANTS} from '../../../../../constants';
import {UserService} from '../../../../core/reducer/user.service';
import {ToastrService} from 'ngx-toastr';
import {Item} from '../../../../models/item';
import {Store} from '../../../../models/store';
import {Currency} from '../../../../models/currency';
import {AppReducerState} from '../../../../core/reducer/app.reducer';
import {AppService} from '../../../../core/app.service';

@Component({
  selector: 'app-purchase-by-store-table',
  templateUrl: './purchase-by-store-table.component.html',
  styleUrls: ['./purchase-by-store-table.component.scss']
})
export class PurchaseByStoreTableComponent implements OnInit {

  public storesSum: Store[];
  public defaultCurrency: Currency;
  public selectedCurrency: Currency;

  constructor(private user: UserService, private toastr: ToastrService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.user.getAllStates().subscribe((state) => {
      this.selectedCurrency = state.selectedCurrency;
      this.defaultCurrency = state.defaultCurrency;
      this.storesSum = this.getStoresSum(state);
    }, () => {
      this.toastr.error('Oops...something went wrong.', 'Error!');
    });
  }

  private getStoresSum(state: AppReducerState): Store[] {
    const storesData = [];
    const archiveItems: Item[] = state.archiveItems;
    const waitingItems: Item[] = state.waitingItems;
    const allItems: Item[] = [...waitingItems, ...archiveItems];
    if (allItems?.length) {
      const storesGrouped = this.appService.groupByKey(allItems, 'store');
      Object.keys(storesGrouped).map((key) => {
        storesData.push({
          name: key,
          quantity: storesGrouped[key].length,
          price: storesGrouped[key].reduce((total, obj) => obj?.price + total, 0)
        });
      });
    }
    return storesData;
  }

}
