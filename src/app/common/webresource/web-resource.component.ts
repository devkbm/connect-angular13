import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WebResourceGridComponent } from './web-resource-grid.component';
import { WebResourceFormComponent } from './web-resource-form.component';
import { AppBase } from '../../core/app/app-base';

@Component({
  selector: 'app-web-resource',
  templateUrl: './web-resource.component.html',
  styleUrls: ['./web-resource.component.css']
})
export class WebResourceComponent extends AppBase  implements OnInit {

  drawerVisible = false;

  queryKey = 'resourceCode';
  queryValue = '';

  @ViewChild('programGrid', {static: false})
  grid!: WebResourceGridComponent;

  @ViewChild('programForm', {static: false})
  form!: WebResourceFormComponent;

  @ViewChild('deleteForm', {static: false})
  deleteForm!: WebResourceFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getProgramList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getProgramList(params);
  }

  initForm(): void {
    this.openDrawer();

    setTimeout(() => {
      this.form.newForm();
    },10);
  }

  saveProgram(): void {
    this.form.submitProgram();
  }

  deleteProgram(): void {
    const id = this.grid.getSelectedRows()[0].resourceCode;
    this.deleteForm.deleteProgram(id);
  }

  selectedItem(item: any): void {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item: any): void {

    this.openDrawer();

    setTimeout(() => {
      this.form.getProgram(item.resourceCode);
    },100);


  }

}
