import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shared/services/shop.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  subscription: any;
  private _completed = new Subject();
  cartNumber: number = 0;

  constructor(
    private _shopService: ShopService

  ) { }

  ngOnInit() {
    this.subscription = this._shopService.getCartNumberChangeEmitter()
      .pipe(takeUntil(this._completed))
      .subscribe(item => this.cartNumberChanged(item));
  }

  cartNumberChanged(numb: any) {
    this.cartNumber = numb;
  }

  ngOnDestroy() {
    this._completed.next();
    this._completed.complete();
  }

}
