import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MenuGroupFormComponent } from './menu-group-form.component';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { MenuFormComponent } from './menu-form.component';
import { AppBase } from '../../core/app/app-base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AppBase implements OnInit {

  menuGroupFormVisible = false;
  menuFormVisible = false;
  selectedMenuGroupId: string = '';

  menuGroupQueryKey: string = 'menuGroupId';
  menuGroupQueryValue: string = '';
  menuQueryKey: string = 'menuId';
  menuQueryValue: string = '';

  //@ViewChild('menuGroupGrid', {static: false})
  @ViewChild(MenuGroupGridComponent)
  menuGroupGrid!: MenuGroupGridComponent;

  //@ViewChild('menuGroupForm', {static: false})
  @ViewChild(MenuGroupFormComponent)
  menuGroupForm!: MenuGroupFormComponent;

  //@ViewChild('menuGrid', {static: false})
  @ViewChild(MenuGridComponent)
  menuGrid!: MenuGridComponent;

  //@ViewChild('menuForm', {static: false})
  @ViewChild(MenuFormComponent)
  menuForm!: MenuFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  newMenuGroupForm(): void {
    this.menuGroupFormVisible = true;

    setTimeout(() => {
      this.menuGroupForm.newForm();
    },10);
  }

  menuGroupFormOpen(item: any): void {
    this.menuGroupFormVisible = true;

    setTimeout(() => {
      this.menuGroupForm.getMenuGroup(item.menuGroupId);
    },10);
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  newMenu(): void {
    this.menuFormVisible = true;

    setTimeout(() => {
      console.log(this.selectedMenuGroupId);
      this.menuForm.newForm(this.selectedMenuGroupId);
    },10);
  }

  menuFormOpen(item: any): void {
    this.menuFormVisible = true;

    setTimeout(() => {
      this.menuForm.getMenu(item.menuId);
    },10);
  }

  menuFormClose(): void {
    this.menuFormVisible = false;
  }

  getMenuGroupList(): void {
    let params: any = new Object();
    if ( this.menuGroupQueryValue !== '') {
      params[this.menuGroupQueryKey] = this.menuGroupQueryValue;
    }

    this.menuGroupFormClose();
    this.menuGrid.clearData();
    this.menuGroupGrid.getMenuGroupList(params);
  }

  getMenuList(): void {
    let params: any = new Object();
    params['menuGroupId'] = this.selectedMenuGroupId;

    if ( this.menuQueryValue !== '') {
      params[this.menuQueryKey] = this.menuQueryValue;
    }

    this.menuFormClose();
    this.menuGrid.getMenuList(params);
  }

  selectMenuGroup(item: any): void {

    this.selectedMenuGroupId = item.menuGroupId;
    this.getMenuList();
  }


}
