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

  productoNoEncontrado = '../../../assets/images/woocommerce.png';
  ngOnInit() {
    this.route.data.subscribe((data: { product: ProductModel }) => {
        this.product = data.product;
    });
}
  addProduct(product: ProductModel) { this.cartService.addToCart(product); }
}
