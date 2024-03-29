
import { DutyApplicationGridComponent } from './component/duty-application/duty-application-grid.component';
import { DutyApplicationService } from './service/duty-application.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/core/grid/renderer/checkbox-renderer.component';

import { DutyCodeFormComponent } from './component/duty-code/duty-code-form.component';
import { DutyCodeService } from './service/duty-code.service';
import { DutyCodeComponent } from './component/duty-code/duty-code.component';
import { DutyCodeGridComponent } from './component/duty-code/duty-code-grid.component';
import { DutyApplicationFormComponent } from './component/duty-application/duty-application-form.component';
import { DutyApplicationComponent } from './component/duty-application/duty-application.component';
import { HrmCoreModule } from '../hrm-core/hrm-core.module';

const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    nzModules,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    HrmCoreModule
  ],
  declarations: [
    DutyCodeFormComponent,
    DutyCodeGridComponent,
    DutyCodeComponent,
    DutyApplicationFormComponent,
    DutyApplicationGridComponent,
    DutyApplicationComponent
  ],
  providers: [
    DutyCodeService,
    DutyApplicationService
  ],
  exports: [
    DutyCodeComponent,
    DutyApplicationComponent
  ]
})
export class DutyModule { }
