import { ProductResolverService } from './../services/product-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HomePage } from './home.page';
import { CategoryResolverService } from '../services/CategoryResolverService';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'buscar',
        loadChildren: () =>
          import('../pages/buscar/buscar.module').then(
            m => m.BuscarPageModule)
      }, {
        path: 'ajustes',
        loadChildren: () =>
          import('../pages/ajustes/ajustes.module').then(
            m => m.AjustesPageModule)
      },
      {
        path: 'carroCompra',
        loadChildren: () =>
          import('../pages/carro-compra/carro-compra.module').then(
            m => m.CarroCompraPageModule)
      },
      {
        path: 'listaDeseo',
        loadChildren: () =>
          import('../pages/lista-deseos/lista-deseos.module').then(
            m => m.ListaDeseosPageModule)
      },
      {
        path: 'principal',
        loadChildren: () =>
          import('../pages/principal/principal.module').then(
            m => m.PrincipalPageModule)
      },
      {
        path: 'categoria/:id',
        loadChildren: () =>
          import('../pages/categoria/categoria.module').then(
            m => m.CategoriaPageModule),
        resolve: { product: CategoryResolverService }
      },
      {
        path: 'detalleProducto/:id',
        loadChildren: () =>
          import('../pages/detalle-producto/detalle-producto.module').then(
            m => m.DetalleProductoPageModule),
        resolve: { product: ProductResolverService }
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then(
            x => x.LoginPageModule)
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../pages/signup/signup.module').then(
            x => x.SignupPageModule)
      },
      {
        path: 'recovery',
        loadChildren: () =>
          import('../pages/recovery/recovery.module').then(
            m => m.RecoveryPageModule)
      },
      {
        path: '',
        redirectTo: '/principal',
        pathMatch: 'full'
      },
      {
        path: 'checkout',
        loadChildren: () =>
         import('../pages/checkout/checkout.module').then(
           m => m.CheckoutPageModule)
      },
      {
        path: 'gracias',
        loadChildren: () =>
        import('../pages/gracias/gracias.module').then(
          m => m.GraciasPageModule)
      },
      {
        path: 'maps',
        loadChildren: () =>
        import('../pages/maps/maps.module').then(
          m => m.MapsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class HomeRouter { }
