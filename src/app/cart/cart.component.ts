import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../shared/models/cartProduct';
import { ShopService } from '../shared/services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: CartProduct[] = [];
  subtotal: number = 0;

  constructor(
    private _shopService: ShopService

  ) { }

  ngOnInit() {
    this.getCardData();

  }

  getCardData() {
    this.cartProducts = this._shopService.getCartProducts();
    this.calculateSubtotal();
  }

  removeProductFromCart(cartProductsID: number) {
    this.cartProducts = this._shopService.removeFromCart(cartProductsID);
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = 0;
    this.cartProducts.forEach(prod => {
      this.subtotal += prod.price * prod.quantity
    });
  }


}
