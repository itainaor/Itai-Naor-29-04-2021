import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CONSTANTS} from '../constants';
import {SharedModule} from './shared/shared.module';

const routes: Routes = [
  {
    path: CONSTANTS.ROUTES.PURCHASE_BY_ITEM.BASE,
    pathMatch: 'full',
    loadChildren:  () => import('./features/purchase-by-item/purchase-by-item.module').then(m => m.PurchaseByItemModule)
  },
  {
    path: CONSTANTS.ROUTES.PURCHASE_BY_STORE.BASE,
    loadChildren: () => import('./features/purchase-by-store/purchase-by-store.module').then(m => m.PurchaseByStoreModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
