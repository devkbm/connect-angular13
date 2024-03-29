import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getEventTargetViaRoot } from '@fullcalendar/angular';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { GlobalProperty } from 'src/app/global-property';

@Component({
  selector: 'app-nz-file-upload',
  template: `
   <div class="clearfix" nz-row style="height: 100px">
      <nz-upload #upload class="upload-list-inline"
        [nzAction]="uploadUrl"
        nzMultiple
        [nzListType]="'text'"
        [nzWithCredentials]="true"
        [nzData]="imageUploadParam"
        [nzHeaders]="fileUploadHeader"
        [nzFileList]="fileList"
        (nzChange)="fileUploadChange($event)">
        <button nz-button>
          <i nz-icon nzType="upload"></i>
          <span>첨부파일</span>
        </button>
      </nz-upload>
  </div>
  `,
  styles: [`
    :host ::ng-deep .upload-list-inline .ant-upload-list-item {
      float: left;
      width: 200px;
      margin-right: 8px;
    }
  `]
})
export class NzFileUploadComponent implements OnInit {

  imageUploadParam = { pgmId: 'board', appUrl:'asd' };
  uploadUrl: string = GlobalProperty.serverUrl + '/common/file/';
  fileUploadHeader: any;

  /*{
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },

    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    }*/
  @Input() fileList: NzUploadFile[] = [];
  @Output() uploadCompleted = new EventEmitter<NzUploadFile[]>();


  constructor() { }

  ngOnInit() {
    this.fileUploadHeader = {
      Authorization: sessionStorage.getItem('token')
    }
  }

  fileUploadChange(args: NzUploadChangeParam): void {
    if (args.type === 'success') {
      // this.fileList = param.file.response;
      this.fileList.push(args.file.response[0]);
      this.uploadCompleted.emit(this.fileList);
    }
  }

}
