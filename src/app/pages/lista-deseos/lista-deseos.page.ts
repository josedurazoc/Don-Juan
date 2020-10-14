import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.page.html',
  styleUrls: ['./lista-deseos.page.scss'],
})
export class ListaDeseosPage implements OnInit {

  constructor() { }
  foto = '../../../assets/images/don_juan_splash.png';
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];
  articulosCarro = 0;

  ngOnInit() {
  }



}
