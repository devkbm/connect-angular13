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
import { NzInputNumberCustomComponent } from './nz-input-number-custom/nz-input-number-custom.component';
import { NzSelectCustomComponent } from './nz-select-custom/nz-select-custom.component';
import { NzCrudButtonGroupComponent } from './nz-crud-button-group/nz-crud-button-group.component';
import { FormCrudButtonGroupComponent } from './form-crud-button-group/form-crud-button-group.component';
import { AutoFocusDirective } from './auto-focus.directive';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeSelectCustomComponent } from './nz-tree-select-custom/nz-tree-select-custom.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  imports: [
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
    NzTreeSelectModule
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
    AutoFocusDirective
   ],
  exports: [
    CustomInputTextComponent,
    FormCrudButtonGroupComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputNumberCustomComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    NzTreeSelectCustomComponent
  ]
})
export class SharedModule { }
