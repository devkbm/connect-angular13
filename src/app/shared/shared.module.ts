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

import { CustomInputTextComponent } from './custom-input-text/custom-input-text.component';
import { NzInputTextComponent } from './nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from './nz-input-textarea/nz-input-textarea.component';
import { NzSelectCustomComponent } from './nz-select-custom/nz-select-custom.component';
import { NzCrudButtonGroupComponent } from './nz-crud-button-group/nz-crud-button-group.component';
import { FormCrudButtonGroupComponent } from './form-crud-button-group/form-crud-button-group.component';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzIconModule
  ],
  declarations: [
    CustomInputTextComponent,
    FormCrudButtonGroupComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    AutoFocusDirective
   ],
  exports: [
    CustomInputTextComponent,
    FormCrudButtonGroupComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent
  ]
})
export class SharedModule { }
