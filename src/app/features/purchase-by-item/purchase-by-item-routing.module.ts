import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchaseByItemComponent} from './purchase-by-item.component';
import {PurchaseTabsComponent} from './views/purchase-tabs/purchase-tabs.component';
import {CONSTANTS} from '../../../constants';

const routes: Routes = [
  {
    path: '',
    component: PurchaseByItemComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PurchaseByItemRoutingModule { }
