import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../core/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';
import { DaypilotCalendarComponent } from 'src/app/shared/calendar/daypilot-calendar.component';

@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements AfterViewInit {

  @ViewChild(DaypilotCalendarComponent) calendar!: DaypilotCalendarComponent;
  @Input() fkWorkGroup: number = 0;

  from!: string;
  to!: string;

  @Output() itemSelected = new EventEmitter();
  @Output() newDateSelected = new EventEmitter();
  eventData: any[] = [];

  constructor(private workGroupService: WorkGroupService,
              private datePipe: DatePipe) {
  }

  ngAfterViewInit(): void {
    this.from = this.datePipe.transform(this.calendar.start.toDateLocal(),'yyyyMMdd') ?? '';
    this.to = this.datePipe.transform(this.calendar.end.toDateLocal(),'yyyyMMdd') ?? '';
  }

  rangeChanged(e: any): void {
    this.from = this.datePipe.transform(e.start,'yyyyMMdd') ?? '';
    this.to = this.datePipe.transform(e.end,'yyyyMMdd') ?? '';

    this.getWorkScheduleList();
  }

  getWorkScheduleList(): void {
    const workGroupId: string = this.fkWorkGroup.toString();

    if (workGroupId === "" || workGroupId === null || workGroupId === undefined) {
      this.eventData = [];
      return;
    }
    const param = {
      fkWorkGroup : this.fkWorkGroup,
      fromDate: this.from,
      toDate: this.to
    };

    this.workGroupService
        .getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
              let data: any[] = [];
              model.data.forEach(e => data.push({
                id: e.id,
                text: e.text,
                start: e.start,
                end: e.end,
                barColor: e.color
              }));
              this.eventData = data;
              console.log(data);
            }
        );
  }

  eventClicked(param: any): void {
    this.itemSelected.emit(param.id);
  }

  onDateClick(args: any): void {
    this.newDateSelected.emit({fkWorkGroup: this.fkWorkGroup, start: args.start, end: args.end});
  }


}
