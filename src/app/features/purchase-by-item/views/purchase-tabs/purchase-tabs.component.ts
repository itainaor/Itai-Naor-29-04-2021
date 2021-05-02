import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/reducer/user.service';
import {Store} from '@ngrx/store';
import {AppReducerState} from '../../../../core/reducer/app.reducer';
import {Observable} from 'rxjs';
import {Item} from '../../../../models/item';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-purchase-tabs',
  templateUrl: './purchase-tabs.component.html',
  styleUrls: ['./purchase-tabs.component.scss']
})
export class PurchaseTabsComponent implements OnInit {

  public waitingItems: Item[];
  public archiveItems: Item[];

  constructor(private store: Store<AppReducerState>, private user: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user.getAllStates().subscribe((state) => {
      this.waitingItems  = state.waitingItems;
      this.archiveItems  = state.archiveItems;
    }, () => {
      this.toastr.error('Oops...something went wrong.', 'Error!');
    });
  }

}
