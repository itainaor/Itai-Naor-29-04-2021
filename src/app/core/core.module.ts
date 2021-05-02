import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './api.service';
import {RequestService} from './request.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    RequestService
  ]
})
export class CoreModule { }
