import { Component, OnInit } from '@angular/core';
import { Browser, Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  constructor(public http: HttpClient) { }
  createOrderData = {
    payment_method: 'nuevo',
    payment_method_title: 'nuevo Direct Bank Transfer',
    set_paid: true,
    billing: {
      first_name: 'nuevo',
      last_name: 'nuevo',
      address_1: 'nuevo Market',
      address_2: '',
      city: 'nuevo Francisco',
      state: 'nuevo',
      postcode: '99999',
      country: 'US',
      email: 'nuevojohn.doe@example.com',
      phone: '(999) 999-9999'
    },
    shipping: {
      first_name: 'nuevo',
      last_name: 'nuevo',
      address_1: 'nuevo969 Market',
      address_2: '',
      city: 'nuevo San Francisco',
      state: 'SO',
      postcode: '94103',
      country: 'MX'
    },
    line_items: [
      {
        product_id: 9113,
        quantity: 12
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1
      }
    ],
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '99999.00'
      }
    ]
  };
  ngOnInit() { }
  async openPage() {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  const url = environment.backend_api_url + 'orders?' + 'consumer_key=' +
    environment.readOnlyKeys.consumer_key + '&consumer_secret=' + environment.readOnlyKeys.consumer_secret;
  this.http.post(url, this.createOrderData, {headers})
    .subscribe(
      async data => {
        console.log('Order successfully created', data);
      },
      async error => {
        console.log('Error', error);
      }
    );
}
}
