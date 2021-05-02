import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseByItemComponent } from './purchase-by-item.component';
import {PurchaseByItemRoutingModule} from './purchase-by-item-routing.module';
import { PurchaseTabsComponent } from './views/purchase-tabs/purchase-tabs.component';
import {RouterModule} from '@angular/router';
import { PurchaseByItemTableComponent } from './views/purchase-by-item-table/purchase-by-item-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    PurchaseByItemComponent,
    PurchaseTabsComponent,
    PurchaseByItemTableComponent
  ],
  imports: [
    CommonModule,
    PurchaseByItemRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    TypeaheadModule,
    TooltipModule,
    SharedModule
  ]
})
export class PurchaseByItemModule { }
