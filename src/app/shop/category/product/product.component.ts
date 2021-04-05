import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedProductID: number;
  selectedProduct: Product;
  prevNextProducts: number[] = [0, 0];

  constructor(
    private _route: ActivatedRoute,
    private _shopService: ShopService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit() {
    this.selectedProductID = this._route.snapshot.params['id'];
    this._route.params
      .subscribe(
        (params: Params) => {
          this.selectedProductID = params['id'];
          this.getProductsByProductId();
          this.getPrevNextProducts();
        }
      )
  }

  getProductsByProductId() {
    this.selectedProduct = this._shopService.getProductsByProductId(this.selectedProductID);
  }

  getPrevNextProducts() {
    this.prevNextProducts = this._shopService.getPrevNextProducts(this.selectedProductID);
  }

  addToCart(selectedP: Product, quantity: number) {
    if (quantity < 100 && quantity > 0) {
      this._shopService.addToCart(selectedP, quantity);
      this._shopService.emitCartNumberChangeEvent('+');
      this._snackBar.open('The product is added to the cart.', 'OK', {
        duration: 2000,
      });
    }
    else {
      this._snackBar.open('Quantity is not valid!', 'OK', {
        duration: 2000,
      });
    }
  }

  goToPrevOrNextProduct(flag: string) {
    if (flag == 'prev' && this.prevNextProducts[0] != 0) {
      this._router.navigate(['/product/' + this.prevNextProducts[0]]);
    }
    else if (flag == 'next' && this.prevNextProducts[1] != 0) {
      this._router.navigate(['/product/' + this.prevNextProducts[1]]);
    }
  }

}
