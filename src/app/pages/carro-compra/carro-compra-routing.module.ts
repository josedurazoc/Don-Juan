import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarroCompraPage } from './carro-compra.page';

const routes: Routes = [
  {
    path: '',
    component: CarroCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarroCompraPageRoutingModule {}
