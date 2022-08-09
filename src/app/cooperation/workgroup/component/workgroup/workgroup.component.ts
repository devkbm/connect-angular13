import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkScheduleFormComponent } from './work-schedule-form.component';
import { WorkGroupFormComponent } from './workgroup-form.component';
import { MyWorkGroupGridComponent } from './myworkgroup-grid.component';
import { WorkCalendarComponent } from './work-calendar.component';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  @ViewChild('myWorkGroupGrid', {static: true}) myWorkGroupGrid!: MyWorkGroupGridComponent;
  @ViewChild('workCalendar', {static: true}) workCalendar!: WorkCalendarComponent;
  @ViewChild('workScheduleForm', {static: false}) workScheduleForm!: WorkScheduleFormComponent;
  @ViewChild('workGroupForm', {static: false}) workGroupForm!: WorkGroupFormComponent;

  scheduleDrawerVisible: boolean = false;
  workGroupDrawerVisible: boolean = false;

  workGroupId: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getMyWorkGroupList();
  }

  public getMyWorkGroupList(): void {
    this.closeWorkGroupDrawer();
    this.myWorkGroupGrid.getMyWorkGroupList();
  }

  public getScheduleList(): void {
    this.closeWorkGroupDrawer();
    this.closeScheduleDrawer();

    this.workCalendar.fkWorkGroup = this.workGroupId;
    this.workCalendar.getWorkScheduleList();
  }

  public openScheduleDrawer(): void {
    this.scheduleDrawerVisible = true;
  }

  public closeScheduleDrawer(): void {
    this.scheduleDrawerVisible = false;

    this.workCalendar.fkWorkGroup = this.workGroupId;
    this.workCalendar.getWorkScheduleList();
  }

  public openWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = true;
  }

  public closeWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = false;
  }

  public newWorkGroup(): void {
    this.openWorkGroupDrawer();

    setTimeout(() => {
      this.workGroupForm.newForm();
    },50);
  }

  public modifyWorkGroup(workGroup: any): void {
    this.openWorkGroupDrawer();

    setTimeout(() => {
      this.workGroupForm.getWorkGroup(workGroup.id);
    },50);
  }

  public newSchedule(): void {
    this.openScheduleDrawer();

    setTimeout(() => {
      this.workScheduleForm.newForm(this.workGroupId, new Date(), new Date());
    },50);
  }

  public workGroupSelect(ids: any): void {
    this.workGroupId = ids;
    this.getScheduleList();
  }

  async itemSelect(id: any) {
    await this.openScheduleDrawer();

    setTimeout(() => {
      this.workScheduleForm.getWorkGroupSchedule(id);
    },50);
  }

  async newSchedule2(param: any) {
    console.log(param.fkWorkGroup);
    if (param.fkWorkGroup === 0 || param.fkWorkGroup === '') {
      alert('작업그룹을 선택해주세요.');
      return;
    }

    await this.openScheduleDrawer();
    setTimeout(() => {
      const workGroupId: number = param.fkWorkGroup;
      const start = param.start;
      const end = param.end;

      this.workScheduleForm.newForm(workGroupId, start, end);
    },50);
  }

}
