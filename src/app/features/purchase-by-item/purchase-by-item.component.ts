import { Component, OnInit } from '@angular/core';
import {AppService} from '../../core/app.service';

@Component({
  selector: 'app-purchase-by-item',
  templateUrl: './purchase-by-item.component.html',
  styleUrls: ['./purchase-by-item.component.scss']
})
export class PurchaseByItemComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.appService.pageTitle = 'Purchase by item';
    }, 0);
  }

}
