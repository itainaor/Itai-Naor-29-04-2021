import { Component, OnInit } from '@angular/core';
import {AppService} from '../../core/app.service';

@Component({
  selector: 'app-purchase-by-store',
  templateUrl: './purchase-by-store.component.html',
  styleUrls: ['./purchase-by-store.component.scss']
})
export class PurchaseByStoreComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.appService.pageTitle = 'Purchase by store';
    }, 0);

  }

}
