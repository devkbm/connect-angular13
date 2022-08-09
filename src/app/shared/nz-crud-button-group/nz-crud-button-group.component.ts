import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nz-crud-button-group',
  template:`
    <nz-button-group>
      <button nz-button (click)="searchButtonClick($event)">
        <i nz-icon nzType="search"></i>
        조회
      </button>
      <nz-divider nzType="vertical"></nz-divider>
      <!--저장 재확인할 경우 -->
      <button *ngIf="isSavePopupConfirm" nz-button nzType="primary"
        nz-popconfirm nzPopconfirmTitle="저장하시겠습니까?"
        (nzOnConfirm)="saveButtonClick()" (nzOnCancel)="false">
        <i nz-icon nzType="save" nzTheme="outline"></i>
        저장
      </button>
      <!--저장 재확인하지 않을 경우 -->
      <button *ngIf="!isSavePopupConfirm" nz-button nzType="primary"
        (click)="saveButtonClick()">
        <i nz-icon nzType="save" nzTheme="outline"></i>
        저장
      </button>
      <nz-divider nzType="vertical"></nz-divider>
      <!--삭제 재확인할 경우 -->
      <button *ngIf="isDeletePopupConfirm" nz-button nzDanger
        nz-popconfirm nzPopconfirmTitle="삭제하시겠습니까?"
        (nzOnConfirm)="deleteButtonClick()" (nzOnCancel)="false">
        <i nz-icon nzType="delete" nzTheme="outline"></i>
        삭제
      </button>
      <!--삭제 재확인하지 않을 경우 -->
      <button *ngIf="!isDeletePopupConfirm" nz-button nzDanger
        (click)="deleteButtonClick()">
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

  @Input() isSavePopupConfirm: boolean = true;
  @Input() isDeletePopupConfirm: boolean = true;

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
