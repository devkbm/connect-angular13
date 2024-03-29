import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { AggridFunction } from '../../core/grid/aggrid-function';
import { MenuGroup } from './menu-group.model';
import { MenuService } from './menu.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { ResponseList } from '../../core/model/response-list';

@Component({
  selector: 'app-menu-group-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="menuGroupList"
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
export class MenuGroupGridComponent extends AggridFunction implements OnInit {

  menuGroupList: MenuGroup[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

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
      {
        headerName: '메뉴그룹코드',
        field: 'menuGroupId',
        width: 120,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: '메뉴그룹명',
        field: 'menuGroupName',
        width: 150
      },
      {
        headerName: '설명',
        field: 'description',
        width: 300,
        headerClass: 'text-center'
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.data.menuGroupId;
    };
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  ngOnInit() {
    this.getMenuGroupList();
  }

  getMenuGroupList(params?: any): void {
    this.menuService
        .getMenuGroupList(params)
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
              if (model.total > 0) {
                  this.menuGroupList = model.data;
              } else {
                  this.menuGroupList = [];
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
