import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from './../../../models/product-model';
import { CartService } from './../../services/cart.service';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('prod') productInCart: ProductModel[] = [];
  product: ProductModel;
  i = 1;
  limite = 0;
  quantity: number = this.i;
  total: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) { }

  updateQuantity2(p: ProductModel, ev: any, index: number) {
    const updatedInCartValue = ev.target.value;
    this.cartService.updateQuantity(index, updatedInCartValue);
  }
  updateQuantity(index: number) {
    const updatedInCartValue = this.quantity;
    this.cartService.updateQuantity(index, updatedInCartValue);
  }

  removeItemFromCart(prod: ProductModel) {
    this.productInCart = this.cartService.removeFromCart(prod);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { product: ProductModel }) => {
      this.product = data.product;
    //   console.log('data.product: ' + data.product);
    //   console.log('antes');
    //   if (data.product.price) {
    //     console.log('I have something');
    // } else {
    //     console.log('Nothing here...');
    // }
      // console.log('stock_quantity antes: ' + this.product.stock_quantity);
      // if (this.product.stock_quantity.valueOf === undefined){
      //   console.log('entra');
      //   this.product.stock_quantity = 0;
      // }
      // console.log('stock_quantity antes: ' + this.product.stock_quantity);
    });
  }

  minus(p: ProductModel, ev: any, index: number) {
    if (p.in_cart !== 1 && p.in_cart > 1) {
      p.in_cart = p.in_cart - 1;
    }
  }
  plus(p: ProductModel, ev: any, index: number) {
    p.in_cart = +p.in_cart + 1;
  }

}
