import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService) { }

  updateQuantity(p: ProductModel, ev: any, index: number){
    const updatedInCartValue = ev.target.value;
    this.cartService.updateQuantity(index, updatedInCartValue);
  }

  removeItemFromCart(prod: ProductModel){
    this.productInCart = this.cartService.removeFromCart(prod);
  }

  ngOnInit() {}

}
