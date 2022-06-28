import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthorityService } from './authority.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { AggridFunction } from '../../core/grid/aggrid-function';
import { Authority } from './authority.model';

@Component({
  selector: 'app-authority-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-alpine-dark"
      [rowSelection]="'single'"
      [rowData]="authorityList"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridSize)="test($event)"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
    </ag-grid-angular>
  `
})
export class AuthorityGridComponent extends AggridFunction implements OnInit {

  authorityList: Authority[] = [];

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private service: AuthorityService,
              private appAlarmService: AppAlarmService) {
    super();

    this.columnDefs = [
        {
            headerName: '',
            sortable: true,
            resizable: true,
            width: 34,
            suppressSizeToFit: true,
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
            sortable: true,
            resizable: true,
            suppressSizeToFit: true,
            width: 70,
            cellStyle: {'text-align': 'center'}
        },
        {
            headerName: '권한',
            field: 'authority',
            sortable: true,
            resizable: true,
            suppressSizeToFit: true,
            width: 100
        },
        {
            headerName: '설명',
            field: 'description',
            sortable: true,
            resizable: true
        }
    ];

    this.getRowId = function(data: any) {
//      console.log(data);
      return data.data.authority;
    };
  }

  ngOnInit() {
      this.getAuthority();
  }

  getAuthority(params?: any): void {
    this.service
        .getAuthorityList(params)
        .subscribe(
            (model: ResponseList<Authority>) => {
                if (model.total > 0) {
                    this.authorityList = model.data;
                    this.sizeToFit();
                } else {
                    this.authorityList = [];
                }
                this.appAlarmService.changeMessage(model.message);
            }
        );
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

  public test(event: any): void {
    console.log(event);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

}
