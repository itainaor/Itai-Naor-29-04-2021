import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _pageTitle: string = '';

  constructor() { }

  get pageTitle(): string {
    return this._pageTitle;
  }

  set pageTitle(value: string) {
    this._pageTitle = value;
  }

  public groupByKey(list: any[], key: string): any[] {
    return list.reduce((hash, obj) => ({...hash, [obj[key]]: ( hash[obj[key]] || [] ).concat(obj)}), {});
  }
}
