import { Component, OnInit } from '@angular/core';
import { Browser, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor() {
    Browser.addListener('browserPageLoaded', () => {
      console.log('browserPageLoaded iniciado');
    });

    Browser.addListener('browserFinished', () => {
      console.log('browserPageLoaded cerrado');
    });

    Browser.prefetch({
      urls: ['https://www.autorefaccionesonline.com/checkout/']
    });
   }

  ngOnInit() {
  }

  async openPage(){
    await Browser.open({toolbarColor: '#222', url: ''});
  }
}
