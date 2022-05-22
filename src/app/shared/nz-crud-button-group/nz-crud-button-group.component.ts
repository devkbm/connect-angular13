import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nz-crud-button-group',
  template:`
    <nz-button-group>
      <button nz-button (click)="searchButtonClick($event)">
        <i nz-icon nzType="search"></i>
        조회
      </button>
      <nz-divider nzType="vertical"></nz-divider>
      <button nz-button nzType="primary"
        nz-popconfirm nzPopconfirmTitle="저장하시겠습니까?"
        (nzOnConfirm)="saveButtonClick()" (nzOnCancel)="false">
        <i nz-icon nzType="save" nzTheme="outline"></i>
        저장
      </button>
      <nz-divider nzType="vertical"></nz-divider>
      <button nz-button nzDanger
        nz-popconfirm nzPopconfirmTitle="삭제하시겠습니까?"
        (nzOnConfirm)="deleteButtonClick()" (nzOnCancel)="false">
        <i nz-icon nzType="delete" nzTheme="outline"></i>
        삭제
      </button>
      <nz-divider nzType="vertical"></nz-divider>
      <button nz-button (click)="closeButtonClick($event)">
        <i nz-icon nzType="form" nzTheme="outline"></i>
        닫기
      </button>
    </nz-button-group>
  `,
  styles:[
    `
      .select_button {
        background-color: green;
      }
    `
  ]
})
export class NzCrudButtonGroupComponent implements OnInit {

  @Output() closeClick = new EventEmitter();
  @Output() searchClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeButtonClick(event: any) {
    this.closeClick.emit(event);
  }

  searchButtonClick(event: any) {
    this.searchClick.emit(event);
  }

  saveButtonClick() {
    this.saveClick.emit();
  }

  deleteButtonClick() {
    this.deleteClick.emit();
  }

}
