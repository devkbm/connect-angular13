import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


import { AggridFunction } from '../../core/grid/aggrid-function';

import { MenuService } from './menu.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { ResponseList } from '../../core/model/response-list';
import { Menu } from './menu.model';

@Component({
  selector: 'app-menu-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="menuList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class MenuGridComponent extends AggridFunction implements OnInit {

  menuList: Menu[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Input()
  menuGroupCode: string = '';

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) {

      super();

      this.columnDefs = [
        {
          headerName: '',
          width: 34,
          cellStyle: {'text-align': 'center', 'padding': '0px'},
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onEditButtonClick.bind(this),
            label: '',
            iconType: 'form'
          }
        },
        {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'}
        },
        {headerName: '메뉴그룹코드',  field: 'menuGroupId',     width: 80 },
        {headerName: '메뉴코드',      field: 'menuId',          width: 100},
        {headerName: '메뉴명',        field: 'menuName',        width: 150},
        {headerName: '메뉴타입',      field: 'menuType',        width: 100 },
        {headerName: '상위메뉴',      field: 'parentMenuId',    width: 100 },
        {headerName: '순번',          field: 'sequence',        width: 80},
        {headerName: 'APP URL',       field: 'appUrl',          width: 300 }
      ];

      this.defaultColDef = {
        sortable: true,
        resizable: true
      };

      this.getRowId = (data: any) => {
          return data.data.menuId;
      };
  }

  ngOnInit() {
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getMenuList(params?: any) {

    this.menuService
        .getMenuList(params)
        .subscribe(
          (model: ResponseList<Menu>) => {
              if (model.total > 0) {
                  this.menuList = model.data;
              } else {
                  this.menuList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }
}
