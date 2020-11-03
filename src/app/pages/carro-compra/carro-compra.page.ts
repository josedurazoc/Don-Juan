import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SortModalComponent } from 'src/app/components/sort-modal/sort-modal.component';
import { CartModel } from 'src/models/cartModel';
import { ProductModel } from './../../../models/product-model';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.page.html',
  styleUrls: ['./carro-compra.page.scss'],
})
export class CarroCompraPage implements OnInit {
  cart: CartModel;
  displayedList: ProductModel[] = [];

  i = 1;
  quantity: number = this.i;
  limite = 5;
  total: number;
  foto = '../../../assets/images/don_juan_splash.png';
  fotoCarroVacio = '../../../assets/images/empty-cart.png';
  constructor(
    private cartService: CartService,
    private menuController: MenuController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.cartService.cartData.subscribe(data => {
      this.cart = data;
    });

    this.cartService.cartTotal.subscribe(total => this.total = total);
  }
  openFilter() {
    this.menuController.enable(true, 'filter').then();
    this.menuController.open('filter').then();
  }
  openModal() {
    this.modalController.create({
      component: SortModalComponent,
      cssClass: 'sortModal',
      animated: true
    }).then(el => {
      el.present().then();
      return el.onDidDismiss().then(resultData => {
        this.sort({ role: resultData.role, data: resultData.data });
      });
    });
  }
  sort(resultData: { role: string, data: any }) {
    const { role, data } = { ...resultData };
    // tslint:disable-next-line:triple-equals
    if (role == 'cancel') {
      return;
    }
    // tslint:disable-next-line:triple-equals
    else if (role == 'sort') {
      // Check the type of sorting asked by the customer
      // tslint:disable-next-line:triple-equals
      if (data == 'default') {
        this.displayedList.sort(() => {
          return 1;
        });
      }
      // tslint:disable-next-line:triple-equals
      else if (data == 'recent') {
        this.displayedList.sort((a, b) => {
          const x = a.date_created.toLowerCase();
          const y = b.date_created.toLowerCase();

          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
      }
      // tslint:disable-next-line:triple-equals
      else if (data == 'price-desc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return a.price - b.price; // Low to high
        });
      }
      // tslint:disable-next-line:triple-equals
      else if (data == 'price-asc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return b.price - a.price; // High to low
        });
      }
      // tslint:disable-next-line:triple-equals
      else if (data == 'popularity') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();

          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      }
      // tslint:disable-next-line:triple-equals
      else if (data == 'classification') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();

          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
      }
    }
  }
  ckeckout() {

  }
  plus() {
    console.log(this.limite);
    // donde 5 es el limite de productos en el inventario de la tienda
    if (this.i < this.limite) {
      this.i++;
      this.quantity = this.i;
    }
  }
  minus() {
    console.log(this.limite);
    if (this.i !== 1 && this.i > 0) {
      this.i--;
      this.quantity = this.i;
    }
  }

}
