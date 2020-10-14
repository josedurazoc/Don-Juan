import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CartModel} from '../../models/cartModel';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {ProductModel} from '../../models/product-model';
import { OrderModel } from 'src/models/OrderModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Local variables
  private serverUrl = environment.backend_api_url;
  private CartDataArray: CartModel = {
    count: 0,
    productData: []
  };
  private cartData$ = new BehaviorSubject<CartModel>({count: 0, productData: []});
  private totalAmount = 0;
  private totalAmount$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private storage: Storage,
              private router: Router) {
    this.totalAmount = 0;
    storage.get('cart').then(data => {
      if (data) {
        this.CartDataArray = data;
        this.cartData$.next(this.CartDataArray);
        this.calculateTotal();
      }
    });
  }

  async addToCart(product: ProductModel) {
    const loader = await this.loadingController.create({
      message: 'Añadido al carro...',
      animated: true,
      spinner: 'circles',
      backdropDismiss: false,
      showBackdrop: true
    });

    const alert = await this.alertController.create({
      header: 'Carrito actualizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          cssClass: 'continue',
          handler: () => {
            console.log('Producto añadido');
          }
        },
        {
          text: 'Ver carrito',
          cssClass: 'viewCart',
          handler: () => {
            this.router.navigateByUrl('/pages/principal').then();
          }
        }
      ],
      animated: true,
      message: 'Producto añadido al carrito',
      backdropDismiss: false,
      cssClass: 'addProduct'
    });

    const toast = await this.toastController.create({
      message: 'Only 5 allowed in cart',
      header: 'Max Quantity Reached',
      duration: 2000,
      position: 'middle',
      animated: true,
      color: 'warning,',
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'OK'
        }
      ]
    });

    await loader.present().then();

    // when the cart is not completely empty
    if (this.CartDataArray.count !== 0) {
      // calculate Index
      const index = this.CartDataArray.productData.findIndex(p => p.id === product.id);

      // if there is a match, that means the index is npt equals to -1
      if (index > -1) {
        // Limit the max purchasable quantity to 5 per product per order
        if (this.CartDataArray.productData[index].in_cart > 5) {
          this.CartDataArray.productData[index].in_cart = 5;
          this.calculateTotal();
          this.storage.set('cart', {...this.CartDataArray}).then();
          await loader.dismiss().then();
          await toast.present().then();
        } else {
          this.CartDataArray.productData[index].in_cart += 1;
          this.calculateTotal();
          this.storage.set('cart', {...this.CartDataArray}).then();
          await loader.dismiss().then();
          await alert.present().then();
        }
        this.cartData$.next(this.CartDataArray);
      }
      //  when the product is not in cart array but the cart is not empty
      else {
        this.CartDataArray.productData.push(product);
        const newProductIndex = this.CartDataArray.productData.findIndex(p => p.id === product.id);
        this.CartDataArray.productData[newProductIndex].in_cart = 1;
        this.calculateTotal();
        await loader.dismiss().then();
        await toast.present().then();
        this.CartDataArray.count = this.CartDataArray.productData.length;
        this.storage.set('cart', {...this.CartDataArray}).then();
        this.cartData$.next(this.CartDataArray);
      }
      // when the cart is absolutely empty
    } else {
      this.CartDataArray.productData.push({...product, in_cart: 1});
      this.CartDataArray.count = this.CartDataArray.productData.length;
      this.calculateTotal();
      this.storage.set('cart', {...this.CartDataArray}).then();
      await loader.dismiss().then();
      await toast.present().then();
      this.cartData$.next(this.CartDataArray);
    }
  }
  removeFromCart(product: ProductModel) {
    this.CartDataArray.productData = this.CartDataArray.productData.filter(p => p.id !== product.id);
    this.CartDataArray.count = this.CartDataArray.productData.length;
    this.calculateTotal();
    this.cartData$.next(this.CartDataArray);
    this.totalAmount$.next(this.totalAmount);
    this.storage.set('cart', {...this.CartDataArray}).then();
    return this.CartDataArray.productData;
  }
  private  calculateTotal(){
    this.totalAmount = 0;
    if (this.CartDataArray.productData.length === 0){
      this.totalAmount = 0;
      this.totalAmount$.next(this.totalAmount);
      return;
    }
    this.CartDataArray.productData.forEach(p => {
      this.totalAmount += parseInt(p.price, 10) * p.in_cart;
    });

    this.totalAmount$.next(this.totalAmount);

  }
  updateQuantity(indexOfProducts: number, newInCartValue: number){
    this.CartDataArray.productData[indexOfProducts].in_cart = newInCartValue;
    this.calculateTotal();
    this.storage.set('cart', {...this.CartDataArray}).then();
    this.cartData$.next(this.CartDataArray);
    this.totalAmount$.next(this.totalAmount);
  }
  private emptyCart(){
    this.CartDataArray = {
      count: 0,
      productData: []
    };
    this.calculateTotal();
    this.cartData$.next(this.CartDataArray);
  }
  get cartData(): Observable<CartModel> {
    return this.cartData$.asObservable();
  }
  get cartTotal(): Observable<number>{
    return this.totalAmount$.asObservable();
  }
  getAllPaymentGateways() {
    return this.httpClient.get(`${this.serverUrl}/payment_gateways`);
  }
  getTaxes() {
    return this.httpClient.get(`${this.serverUrl}/taxes`);
  }
  async createOrder(orderData: OrderModel) {
    let headers = new HttpHeaders().set('WriteObject', '');
    headers = headers.set('Content-Type', 'application/json');
    const loader = await this.loadingController.create({
      message: 'Haciendo Orden',
      animated: true,
      spinner: 'circular',
      backdropDismiss: true,
      showBackdrop: true
    });
    await loader.present().then();

    this.httpClient.post(`${this.serverUrl}/orders`, {...orderData}, {headers})
    .subscribe(async (newOrderDetails: any) => {
      await loader.dismiss().then();

      const navigationExtras = {
        state: {
          message: '',
          products: this.CartDataArray.productData,
          orderId: newOrderDetails.id,
          total: parseFloat(newOrderDetails.total)
        }
      };

      this.emptyCart();
      this.router.navigate(['/gracias'], navigationExtras).then();
    });

  }
}
