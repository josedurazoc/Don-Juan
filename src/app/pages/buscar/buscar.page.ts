import { FilterMenuComponent } from './../../components/filter-menu/filter-menu.component';
import { SortModalComponent } from '../../components/sort-modal/sort-modal.component';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';
import { CategoryModel } from './../../../models/categoryModel';
import { CartService } from './../../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})

export class BuscarPage implements OnInit {
  articulosCarro = 0;
  sliderImages = [
    '/assets/slides/11.jpg',
    '/assets/slides/12.jpg',
    '/assets/slides/13.jpg',
    '/assets/slides/14.jpg'
  ];
  foto = '../../../assets/images/don_juan_splash.png';
  productoNoEncontrado = '../../../assets/images/woocommerce.png';

  sliderOptions = {
    autoplay: {
      delay: 2000,
    },
    loop: true,
  };

  filteredProducts: ProductModel[] = [];
  showSkeleton: boolean;
  terminoBusqueda: any;
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];
  currentPage = 1;
  filterCount = 0;
  filteredCategoryList: any[] = [];
  categories: CategoryModel[] = [];
  count: number;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    private productService: ProductService,
    private menuController: MenuController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private cartService: CartService) {
  }

  async ngOnInit() {
    // esto es una pantalla de carga de espera con un circulo de progreso
    const loader: HTMLIonLoadingElement = await this.loadingController.create({
      spinner: 'circular',
      message: 'Cargando',
      backdropDismiss: true,
      animated: true
    });
    await loader.present().then();
    this.categories = await this.productService.getAllCategories().toPromise();
    await loader.dismiss().then();
    // tslint:disable-next-line:no-shadowed-variable
    this.cartService.cartData.pipe(map(data => data.count)).subscribe(count => this.count = count);
  }
  loadingSpinner() {
    this.loadingController.create({
      message: 'Cargando Detalles...',
      animated: true,
      spinner: 'circular',
      backdropDismiss: false,
      showBackdrop: false,

    }).then(el => el.present());
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
  categoryFilter(ev: { name: string, selected: boolean }) {
    // if the user clicked the filter for the first time and nothing is selected
    // tslint:disable-next-line:triple-equals
    if (ev.selected && this.filterCount == 0) {
      this.filteredCategoryList.push(ev.name);
      this.filterCount++;
      // tslint:disable-next-line:triple-equals
      this.displayedList = this.displayedList.filter(p => p.categories.some(cat => cat.name == ev.name));
    }
    // if the category selected is not present in the list of items
    else if (ev.selected && this.filterCount > 1) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount++;
      if (!this.filteredCategoryList.includes(ev.name)) {
        this.filteredCategoryList.push(ev.name);
        // tslint:disable-next-line:triple-equals
        const product: ProductModel[] = newArray.filter(p => p.categories.some(cat => cat.name == ev.name));
        let i: number;
        product.forEach(p => {
          // tslint:disable-next-line:triple-equals
          i = this.displayedList.findIndex(prod => prod.id == p.id);
          // If product is present in the array
          if (i !== -1) {
            return;
          } else {
            this.displayedList = this.displayedList.concat(p);
          }
        });
      } else {
        return;
      }
    } // end of else if
    else if (!ev.selected && this.filterCount > 1) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount--;
      // remove the category from the filter list array
      this.filteredCategoryList = this.filteredCategoryList.filter(el => el !== ev.name);

      if (this.filteredCategoryList.length > 0) {
        this.displayedList = [];
        this.filteredCategoryList.forEach(el => {
          this.displayedList = this.displayedList.concat(
            // tslint:disable-next-line:triple-equals
            newArray.filter(p => p.categories.some(cat => cat.name == el))
          );
        });
      }
      // check if the filter count has reached 0, that means no filter is present now
      // tslint:disable-next-line:triple-equals
      if (this.filterCount == 0) {
        this.displayedList = [...this.listArrayOfProducts];
      }
    }
  }
  search(ev: any) {
    this.terminoBusqueda = ev.target.value;
    if (this.terminoBusqueda !== '') {
      this.filteredProducts = [];
      this.showSkeleton = true;
      this.productService.searchProducts(this.terminoBusqueda).subscribe((prods: ProductModel[]) => {
        this.showSkeleton = false;
        this.filteredProducts = prods;
        this.filteredProducts.forEach(element => {
          if (element.images.length < 1) {
            element.images[0] = this.productoNoEncontrado;
          } else {
            element.images = element.images[0].src;
          }
        });
      }, err => console.log('este es el error -> ' + err));
    }else{
      this.filteredProducts.length = 0;
    }
  }
}

    // esto traer los datos en json de woocommerce
    // this.productService.getAllProductsSearched().subscribe(async (prodducts: ProductModel[]) => {
    //   await loader.dismiss().then();
    //   this.listArrayOfProducts = prodducts;
    //   this.displayedList = [...this.listArrayOfProducts];
    //   console.log(this.displayedList.length);
    //   // this.displayedList.forEach((value) => { console.log(value); });
    //   this.displayedList.forEach((value) => {
    //     // console.log('antes');
    //     // console.log(value.images);
    //     if (value.images.length < 1) {
    //       value.images[0] = [this.productoNoEncontrado];
    //     } else {
    //       // tslint:disable-next-line:no-unused-expression
    //       value.images[0] = [value.images[0].src];
    //     }
    //     // console.log('despues');
    //     // console.log(value.images);
    //   });
    //   // console.log('afuera del if ');
    //   // this.displayedList.forEach((value) => { console.log(value); });


    // }, async (err) => {
    //   await loader.dismiss().then();
    //   console.log(err);
    //   // await loader.dismiss().then();
    // });
