import { ProductService } from './../../services/product.service';
import { ProductModel } from './../../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  product: ProductModel;
  terminoBusqueda: any;
  constructor(private route: ActivatedRoute,
              private cartService: CartService){}
  i = 1;
  precio = 5;
  productoNoEncontrado = '../../../assets/images/woocommerce.png';
  quantity: number = this.i;
  fecha: string;
  ngOnInit() {
    this.route.data.subscribe((data: { product: ProductModel }) => {
        this.product = data.product;
        if (this.product.images.length < 1) {
          this.product.images[0] = this.productoNoEncontrado;
        } else {
          this.product.images = this.product.images[0].src;
        }
    });
}

  addProduct(product: ProductModel) { this.cartService.addToCart(product); }

  plus() {
    // donde 5 es el limite de productos en el inventario de la tienda
    if (this.i < 5) {
      this.i++;
      this.quantity = this.i;
    }
  }
  minus() {
    if (this.i !== 1 && this.i > 0) {
      this.i--;
      this.quantity = this.i;
    }
  }
}
