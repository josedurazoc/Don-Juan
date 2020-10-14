import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarroCompraPageRoutingModule } from './carro-compra-routing.module';

import { CarroCompraPage } from './carro-compra.page';
import {CartViewComponent} from '../../components/cart-view/cart-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarroCompraPageRoutingModule
  ],
    declarations: [CarroCompraPage, CartViewComponent]
})
export class CarroCompraPageModule {}
