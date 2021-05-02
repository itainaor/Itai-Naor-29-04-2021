import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseByStoreRoutingModule } from './purchase-by-store-routing.module';
import { PurchaseByStoreComponent } from './purchase-by-store.component';
import { PurchaseByStoreTableComponent } from './views/purchase-by-store-table/purchase-by-store-table.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    PurchaseByStoreComponent,
    PurchaseByStoreTableComponent
  ],
  imports: [
    CommonModule,
    PurchaseByStoreRoutingModule,
    TooltipModule,
    SharedModule
  ]
})
export class PurchaseByStoreModule { }
