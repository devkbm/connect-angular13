import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';

import { AuthorityComponent } from '../common/authority/authority.component';
import { UserComponent } from '../common/user/user.component';
import { ProgramComponent } from '../common/program/program.component';
import { MenuComponent } from '../common/menu/menu.component';
import { TermComponent } from '../common/terms/term.component';
import { CommonCodeComponent } from '../common/commoncode/common-code.component';
import { DeptComponent } from '../common/dept/dept.component';
import { HolidayComponent } from '../common/holiday/holiday.component';

import { TeamComponent } from '../cooperation/communication/component/team.component';
import { BoardComponent } from '../cooperation/board/component/board.component';
import { SurveyFormComponent } from '../cooperation/survey/component/survey-form.component';
import { WorkgroupComponent } from '../cooperation/workgroup/component/workgroup/workgroup.component';
import { AppointmentCodeComponent } from '../hrm/appointment/component/appointment-code/appointment-code.component';
import { HrmRelationCodeComponent } from '../hrm/appointment/component/hrm-type/hrm-relation-code.component';
import { HrmTypeComponent } from '../hrm/appointment/component/hrm-type/hrm-type.component';
import { LedgerComponent } from '../hrm/appointment/component/ledger/ledger.component';
import { DutyApplicationComponent } from '../hrm/duty/component/duty-application/duty-application.component';
import { DutyCodeComponent } from '../hrm/duty/component/duty-code/duty-code.component';
import { EmployeeMasterComponent } from '../hrm/employee/component/basic-info/employee-master.component';
import { DeptEmployeeListComponent } from '../hrm/employee/component/dept-employee-list/dept-employee-list.component';
import { PayitemComponent } from './../hrm/payitem/component/pay-item/payitem.component';
import { PayTableComponent } from '../hrm/payitem/component/paytable/pay-table.component';
import { BizCodeComponent } from '../common/bizcode/biz-code.component';
import { StaffRegistFormComponent } from '../hrm/staff/staff-regist-form.component';
import { TodosComponent } from '../cooperation/todo/todos.component';
import { AuthGuardService } from '../core/service/auth-guard.service';


const layoutroutes: Routes = [
  {
    path: 'home', component: AppLayoutComponent, canActivateChild: [AuthGuardService],
    children: [
      /* ?????? ????????? */
      {path: 'user',          component: UserComponent},
      {path: 'auth',          component: AuthorityComponent},
      {path: 'program',       component: ProgramComponent},
      {path: 'menu',          component: MenuComponent},
      {path: 'commoncode',    component: CommonCodeComponent},
      {path: 'dept',          component: DeptComponent},
      {path: 'term',          component: TermComponent},
      {path: 'holiday',       component: HolidayComponent},
      {path: 'bizcode',       component: BizCodeComponent},

      /* ??????????????? */
      {path: 'team',          component: TeamComponent},
      {path: 'board',         component: BoardComponent},
      {path: 'workgroup',     component: WorkgroupComponent},
      {path: 'surveyform',    component: SurveyFormComponent},
      {path: 'todo',          component: TodosComponent},

      /* ??????????????? */
      {path: 'hrmtype',           component: HrmTypeComponent},
      {path: 'relationcode',      component: HrmRelationCodeComponent},
      {path: 'appointmentcode',   component: AppointmentCodeComponent},
      {path: 'appointmentledger', component: LedgerComponent},
      {path: 'employee',          component: EmployeeMasterComponent},
      {path: 'deptemployeelist',  component: DeptEmployeeListComponent},
      {path: 'dutycode',          component: DutyCodeComponent},
      {path: 'dutyapplication',   component: DutyApplicationComponent},
      {path: 'payitem',           component: PayitemComponent},
      {path: 'paytable',          component: PayTableComponent},
      {path: 'staff',             component: StaffRegistFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
