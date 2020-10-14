import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from 'src/models/product-model';
import { ProductService } from './../../services/product.service';
import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  product: ProductModel[] = [];

  showData = false;
  categoria: any;
  mensaje: boolean;
  prodsCategory: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  productoNoEncontrado = '../../../assets/images/woocommerce.png';
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];
  constructor(
    private loadingController: LoadingController,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  i = 0;
  precio = 5;
  quantity: number = this.i;
  ngOnInit() {
    this.route.data.subscribe((data: { product: ProductModel[] }) => {
      this.product = data.product;
      this.product.forEach(element => {
        if (element.images.length < 1) {
          this.i++;
          element.images[0] = this.productoNoEncontrado;
        }else{
          element.images = element.images[0].src;
        }
      });
      this.showData = true;
    });
  }
  async cargarDatos(ev: any) {
    this.categoria = ev.target.value;
    {
      // this.productService.getAllProductsCategories(this.categoria).subscribe(async (products: ProductModel[]) => {
      //   this.listArrayOfProducts = this.listArrayOfProducts.concat(products);
      //   this.displayedList = [...this.listArrayOfProducts];
      //   this.listArrayOfProducts = products;
      //   this.displayedList = [...this.listArrayOfProducts];
      //   // Esta parte es para agregar una foto default cuando no tienen foto
      //   // this.displayedList.forEach((value) => { console.log(value); });
      //   this.displayedList.forEach((value) => {
      //     // console.log('antes');
      //     // console.log(value.images);
      //     if (value.images.length < 1) {
      //       value.images[0] = [this.productoNoEncontrado];
      //     }
      //     else if (value.images.length > 0) {
      //       // tslint:disable-next-line:no-unused-expression
      //       value.images = [value.images[0].src];
      //     }
      //     // console.log('despues');
      //     // console.log(value.images);
      //   });
      //   // console.log('afuera del if ');
      //   // this.displayedList.forEach((value) => { console.log(value); });
      //   // Fin
      // }, async (err) => {
      //   console.log(err);
      // });
    }
    this.productService.getAllProductsCategories(this.categoria).subscribe((prods: ProductModel[]) => {
      console.log('esta es la categira que estoy buscando' + this.categoria);
      if (prods.length <= 0) {
        this.mensaje = true;
      } else {
        this.mensaje = false;
      }
      // Esta parte es para agregar una foto default cuando no tienen foto
      this.filteredProducts = prods;
      this.filteredProducts.forEach((value) => { console.log(value); });
      this.filteredProducts.forEach((value) => {
        // console.log('antes');
        // console.log(value.images);
        if (value.images.length < 1) {
          value.images[0] = [this.productoNoEncontrado];
        }
        else if (value.images.length > 0) {
          // tslint:disable-next-line:no-unused-expression
          value.images = [value.images[0].src];
        }
        // console.log('despues');
        // console.log(value.images);
      });
      // console.log('afuera del if ');
      // this.displayedList.forEach((value) => { console.log(value); });
      // Fin

    }, err => console.log('este es el error -> ' + err));
  }

}
