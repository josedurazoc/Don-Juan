import { ExploreContainerComponentModule } from './../../explore-container/explore-container.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { SortModalComponent } from 'src/app/components/sort-modal/sort-modal.component';
import { FilterMenuComponent } from 'src/app/components/filter-menu/filter-menu.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PrincipalPageRoutingModule
  ],
    declarations: [PrincipalPage,
        SortModalComponent, FilterMenuComponent
    ]
})
export class PrincipalPageModule {
}
