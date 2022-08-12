import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { CustomInputTextComponent } from './custom-input-text/custom-input-text.component';
import { NzInputTextComponent } from './nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from './nz-input-textarea/nz-input-textarea.component';
import { NzInputNumberCustomComponent } from './nz-input-number-custom/nz-input-number-custom.component';
import { NzSelectCustomComponent } from './nz-select-custom/nz-select-custom.component';
import { NzCrudButtonGroupComponent } from './nz-crud-button-group/nz-crud-button-group.component';
import { FormCrudButtonGroupComponent } from './form-crud-button-group/form-crud-button-group.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeSelectCustomComponent } from './nz-tree-select-custom/nz-tree-select-custom.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputDateComponent } from './nz-input-date/nz-input-date.component';
import { NzInputSelectComponent } from './nz-input-select/nz-input-select.component';
import { NzInputTreeSelectComponent } from './nz-input-tree-select/nz-input-tree-select.component';
import { NzInputColorPickerComponent } from './nz-input-color-picker/nz-input-color-picker.component';
import { NzInputCkeditorComponent } from './nz-input-ckeditor/nz-input-ckeditor.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzFileUploadComponent } from './nz-file-upload/nz-file-upload.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzIconModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    ColorPickerModule,
    CKEditorModule
  ],
  declarations: [
    CustomInputTextComponent,
    FormCrudButtonGroupComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputNumberCustomComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    NzTreeSelectCustomComponent,
    NzInputDateComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent,
    NzFileUploadComponent,
    NzInputColorPickerComponent,
    NzInputCkeditorComponent
   ],
  providers: [
    CookieService
  ],
  exports: [
    CustomInputTextComponent,
    FormCrudButtonGroupComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputNumberCustomComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    NzTreeSelectCustomComponent,
    NzInputDateComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent,
    NzFileUploadComponent,
    NzInputColorPickerComponent,
    NzInputCkeditorComponent
  ]
})
export class SharedModule { }
