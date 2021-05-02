import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Item} from '../../../../models/item';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsDaterangepickerConfig} from 'ngx-bootstrap/datepicker';
import {catchError, finalize, map} from 'rxjs/operators';
import {RequestService} from '../../../../core/request.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AppReducerState} from '../../../../core/reducer/app.reducer';
import * as actions from '../../../../core/reducer/app.actions';
import {ToastrService} from 'ngx-toastr';
import {CONSTANTS} from '../../../../../constants';
import {UserService} from '../../../../core/reducer/user.service';
import {Currency} from '../../../../models/currency';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-by-item-table.component.html',
  styleUrls: ['./purchase-by-item-table.component.scss']
})
export class PurchaseByItemTableComponent implements OnInit {

  @Input() isArchive: boolean = false;
  @Input() items: Item[];
  public constants = CONSTANTS;
  public modalRef: BsModalRef;
  public addItemFormGroup: FormGroup;
  public bsConfig: Partial<BsDaterangepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    selectFromOtherMonth: true,
    showWeekNumbers: false,
    containerClass: 'theme-red'
  };
  public minDate: Date = new Date();
  public selectedCurrency: Currency;
  public defaultCurrency: Currency;

  private products: string[] = [];

  constructor(private modalService: BsModalService, private requestService: RequestService,
              private spinner: NgxSpinnerService, private store: Store<AppReducerState>,
              private toastr: ToastrService, private user: UserService) { }

  ngOnInit(): void {
    this.user.getAllStates().subscribe((state) => {
      this.selectedCurrency = state.selectedCurrency;
      this.defaultCurrency = state.defaultCurrency;
    }, () => {
      this.toastr.error('Oops...something went wrong.', 'Error!');
    });
  }

  public addItem(): void {
    // form validation
    Object.keys(this.addItemFormGroup.controls).forEach(key => {
      this.addItemFormGroup.get(key).markAsDirty();
    });
    if (this.addItemFormGroup.invalid) {
      return;
    }

    // form is valid, dispatch new waiting product
    const newWaitingProduct: Item = {
      id: new Date().getTime(),
      name: this.addItemFormGroup.get('itemName').value,
      store: this.addItemFormGroup.get('store').value,
      price: this.addItemFormGroup.get('price').value,
      deliveryDate: this.addItemFormGroup.get('deliveryEstimation').value,
    };

    this.store.dispatch( {type: actions.ACTION_ADD_WAITING_PRODUCT, payload: newWaitingProduct});

    this.toastr.success('Item was successfully added to your delivery list.', 'Success!');

    this.modalService.hide();
  }

  public openModal(template: TemplateRef<any>): void {
    if (!this.isArchive) {
      this.addItemFormGroup = new FormGroup({
        itemName: new FormControl(null, [Validators.required, Validators.maxLength(CONSTANTS.ADD_ITEM_FORM.NAME_MAX_LEN)]),
        store: new FormControl(null, [Validators.required, Validators.maxLength(CONSTANTS.ADD_ITEM_FORM.STORE_MAX_LEN)]),
        price: new FormControl(null, [Validators.required]),
        deliveryEstimation: new FormControl(null, [Validators.required])
      });
    }

    this.spinner.show();
    this.requestService.getStoreProducts().pipe(
      map((result: any) => {
        this.products = result.map(product => {
          return product?.title?.trim();
        });
      }),
      catchError((error: any) => {
        this.toastr.error('Failed to fetch products.', 'Error!');
        throw Error(error);
      }),
      finalize(() => {
        this.modalRef = this.modalService.show(template, {class: 'add-item-modal-wrapper'});
        this.spinner.hide();
      })
    ).subscribe();
  }

  public markItemAsArchive(item: Item): void {
    this.store.dispatch( {type: actions.ACTION_REMOVE_WAITING_PRODUCT, payload: item});
    this.store.dispatch( {type: actions.ACTION_ADD_ARCHIVE_PRODUCT, payload: item});
    this.toastr.success('Item was successfully moved to your archive items.', 'Success!');
  }

  public markItemAsWaiting(item: Item): void {
    this.store.dispatch( {type: actions.ACTION_REMOVE_ARCHIVE_PRODUCT, payload: item});
    this.store.dispatch( {type: actions.ACTION_ADD_WAITING_PRODUCT, payload: item});
    this.toastr.success('Item was successfully moved back to your delivery items.', 'Success!');
  }
}
