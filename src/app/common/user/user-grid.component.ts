import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from '../../core/grid/aggrid-function';

import { UserService } from './user.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { User } from './user.model';
import { ResponseList } from '../../core/model/response-list';


@Component({
  selector: 'app-user-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="userList"
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
export class UserGridComponent extends AggridFunction implements OnInit {

  userList: User[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private userService: UserService,
              private appAlarmService: AppAlarmService) {

    super();

    this.columnDefs = [
        {
          headerName: '',
          width: 34,
          cellStyle: {'text-align': 'center', padding: '0px'},
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
      {headerName: '아이디',        field: 'userId',  width: 100 },
      {headerName: '이름',          field: 'name',    width: 100 },
      {headerName: '부서',          field: 'dept.deptNameKorean',    width: 100 },
      {headerName: '핸드폰번호',    field: 'mobileNum', width: 100 },
      {headerName: '이메일',        field: 'email',     width: 100 },
      {
        headerName: '사용여부',
        field: 'enabled',
        width: 80,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      {
        headerName: '계정잠금여부',
        field: 'accountNonLocked',
        width: 120,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      {
        headerName: '계정만료여부',
        field: 'accountNonExpired',
        width: 120,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      {
        headerName: '비번만료여부',
        field: 'credentialsNonExpired',
        width: 120,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          disabled: true
        }
      }
    ];

    this.getRowId = function(data: any) {
      return data.data.userId;
    };
  }

  ngOnInit() {
    this.getUserList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getUserList(params?: any): void {

    this.userService
        .getUserList(params)
        .subscribe(
          (model: ResponseList<User>) => {
              if (model.total > 0) {
                  this.userList = model.data;
              } else {
                  this.userList = [];
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

  getSelectedRow() {
    return this.gridApi.getSelectedRows()[0];
  }

}
