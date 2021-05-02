import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseByStoreComponent } from './purchase-by-store.component';

const routes: Routes = [
    {
      path: '',
      component: PurchaseByStoreComponent
    },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PurchaseByStoreRoutingModule { }
