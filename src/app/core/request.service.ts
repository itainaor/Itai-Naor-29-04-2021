import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private apiService: ApiService) { }

  public getExchangeRates(): Observable<any> {
    return this.apiService.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${environment.rateExchangeKey}&symbols=ILS,USD`);
  }

  public getStoreProducts(): Observable<any> {
    return this.apiService.get('https://fakestoreapi.com/products');
  }
}
