import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeseosPage } from './lista-deseos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeseosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeseosPageRoutingModule {}
