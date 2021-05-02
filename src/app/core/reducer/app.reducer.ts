import * as actions from './app.actions';
import {Item} from '../../models/item';
import {Currency} from '../../models/currency';

export interface AppReducerState {
  readonly currencies: Currency[];
  readonly selectedCurrency: Currency;
  readonly defaultCurrency: Currency;
  readonly waitingItems: Item[];
  readonly archiveItems: Item[];
}

const initialState: AppReducerState = {
  currencies: [],
  selectedCurrency: null,
  defaultCurrency: null,
  waitingItems: [],
  archiveItems: []
}

export function reducer(state = initialState, action): AppReducerState {
  switch (action.type) {
    case actions.ACTION_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload
      };
    case actions.ACTION_INIT_CURRENCIES:
      return {
        ...state,
        currencies: action.payload
      };
    case actions.ACTION_SET_DEFAULT_CURRENCY:
      return {
        ...state,
        defaultCurrency: action.payload
      };
    case actions.ACTION_ADD_ARCHIVE_PRODUCT:
      const archiveItemsArr = [...state.archiveItems];
      archiveItemsArr.push(action.payload);
      return {
        ...state,
        archiveItems: archiveItemsArr
      };
    case actions.ACTION_ADD_WAITING_PRODUCT:
      const waitingItemsArr = [...state.waitingItems];
      waitingItemsArr.push(action.payload);
      return {
        ...state,
        waitingItems: waitingItemsArr
      };
    case actions.ACTION_REMOVE_WAITING_PRODUCT:
      const newWaitingProductsArr = state.waitingItems.filter((item: Item) => {
        return item.id !== action.payload?.id;
      });
      return {
        ...state,
        waitingItems: newWaitingProductsArr
      };
    case actions.ACTION_REMOVE_ARCHIVE_PRODUCT:
      const newArchiveProductsArr = state.archiveItems.filter((item: Item) => {
        return item.id !== action.payload?.id;
      });
      return {
        ...state,
        archiveItems: newArchiveProductsArr
      };
    default:
      return {
        ...state,
      };
  }
}
