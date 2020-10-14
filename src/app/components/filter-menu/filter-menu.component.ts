import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryModel} from '../../../models/categoryModel';
import {IonCheckbox, MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent implements OnInit {
  // tslint:disable-next-line:no-output-rename
  @Output('checkbox') checkbox: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-input-rename
  @Input('categories') categories: CategoryModel[] = [];

  collapsed: boolean;
  @ViewChild('checkbox', {static: false}) ionCheckbox: IonCheckbox;

  constructor(private menuController: MenuController, private route: Router) { }

  ngOnInit() {
    this.collapsed = true;
  }

  onClick() {
    this.collapsed = !this.collapsed;
  }

  checkboxSelected(ev: any) {
    this.menuController.close('filter').then();

    this.checkbox.emit({
      name: ev.target.name,
      selected: ev.target.checked
    });
  }

  closeMenu() {
    this.menuController.close('filter').then();
  }
}
