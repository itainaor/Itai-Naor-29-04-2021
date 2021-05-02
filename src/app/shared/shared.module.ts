import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {SortByDatePipe} from './pipes/sort-by-date.pipe';
import { CurrencyExchangePipe } from './pipes/currency-exchange.pipe';
import { FieldSumPipe } from './pipes/field-sum.pipe';

const sharedDeclarations = [
  HeaderComponent,
  SortByDatePipe,
  CurrencyExchangePipe,
  FieldSumPipe
];

@NgModule({
  declarations: [sharedDeclarations],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    sharedDeclarations
  ]
})
export class SharedModule { }
