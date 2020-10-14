import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<any>{

constructor(private productServide: ProductService,
            private loadingController: LoadingController) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;

    return this.productServide.getSingleProduct(id).pipe(
      tap(async () => {
        if (await this.loadingController.getTop()){
          this.loadingController.dismiss().then();
        }
      })
    );
  }
}