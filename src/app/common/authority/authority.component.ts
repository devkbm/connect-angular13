import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityFormComponent } from './authority-form.component';
import { AppBase } from '../../core/app/app-base';
import { ResponseObject } from '../../core/model/response-object';
import { WebResource } from '../program/web-resource';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent extends AppBase implements AfterViewInit {

  @ViewChild(AuthorityGridComponent)
  grid!: AuthorityGridComponent;

  @ViewChild('form')
  form!: AuthorityFormComponent;

  @ViewChild('deleteform')
  deleteform!: AuthorityFormComponent;

  drawerVisible = false;

  queryKey = 'authority';
  queryValue = '';
  queryOptionList = [
    {label: '권한', value: 'authority'},
    {label: '설명', value: 'description'}
  ];

  constructor(location: Location) {
    super(location);
    this.appId = "COM002";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.form = new AuthorityFormComponent();
    console.log(this.form);
    console.log(this.grid);
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  openDrawer(): void {
    this.drawerVisible = true;

    this.getAppInfo().subscribe(
      (model: ResponseObject<WebResource>) => {
        console.log(model);
      }
    );
  }

  selectedItem(item: any): void {
    //this.form.fg.patchValue(item);
  }

  editDrawOpen(item: any): void {

    this.openDrawer();

    setTimeout(() => {
      this.form.appId = this.appId;
      this.form.getAuthority(item.authority);
    },10);

  }

  getAuthorityList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid?.getAuthority(params);
  }

  deleteAuthority(): void {
    const id = this.grid.getSelectedRows()[0].authority;
    this.deleteform.deleteAuthority(id);
  }

  initForm(): void {
    this.openDrawer();

    setTimeout(() => {
      this.form.appId = this.appId;
      console.log(this.form.appId);
      this.form.newForm();
    },50);


  }

}
