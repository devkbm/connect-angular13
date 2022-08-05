import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../core/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';
import { DayPilot } from '@daypilot/daypilot-lite-angular';

@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  @Input() fkWorkGroup: string = '';

  fromDate: Date = new Date();
  toDate: Date = new Date();

  @Output() itemSelected = new EventEmitter();
  @Output() newDateSelected = new EventEmitter();
  eventData: any[] = [];

  constructor(private workGroupService: WorkGroupService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    //this.getScheduleList(this.fkWorkGroup);
    this.fromDate = new Date('2020-10-01');
    this.toDate = new Date('2020-10-30');
    //this.getScheduleList('55');
  }

  rangeChanged(e: any): void {
    const from: string = this.datePipe.transform(e.start,'yyyyMMdd') ?? '';
    const to: string = this.datePipe.transform(e.end,'yyyyMMdd') ?? '';

    this.getWorkScheduleList(from, to);

  }



  getWorkScheduleList(from: string, to: string): void {

    const param = {
      fkWorkGroup : this.fkWorkGroup,
      fromDate: from,
      toDate: to
    };

    this.workGroupService.getWorkScheduleList(param)
    .subscribe(
        (model: ResponseList<WorkGroupSchedule>) => {
          this.eventData = [];
          console.log(model.data);
          model.data.forEach(e => this.eventData.push({
            id: e.id,
            text: e.text,
            start: e.start,
            end: e.end
          }));
        }
    );
  }

  onEventClick(param: any): void {
      console.log(param);
      console.log(param.event.id);
      this.itemSelected.emit(param.event.id);
  }

  onDateClick(args: any): void {
    this.newDateSelected.emit({fkWorkGroup: this.fkWorkGroup, date: args.date});
  }

  onDatesRender(param: any): void {
    console.log(param);
    //console.log(param[0]._context.viewApi);

    const endDate: Date = param[0]._context.viewApi.currentEnd;
    endDate.setDate(endDate.getDate() - 1);

    this.fromDate = param[0]._context.viewApi.currentStart;
    this.toDate = endDate;
    // console.log(param.view.currentStart);
    // console.log(param.view.currentEnd);
    // console.log(endDate);
    //this.getScheduleList(this.fkWorkGroup);

  }

}
