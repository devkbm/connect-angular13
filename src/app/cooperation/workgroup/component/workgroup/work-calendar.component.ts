import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../core/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';

@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  @Input() fkWorkGroup: number = 0;

  from: string = this.datePipe.transform(new Date(),'yyyyMMdd') ?? '';
  to: string = this.datePipe.transform(new Date(),'yyyyMMdd') ?? '';

  @Output() itemSelected = new EventEmitter();
  @Output() newDateSelected = new EventEmitter();
  eventData: any[] = [];

  constructor(private workGroupService: WorkGroupService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
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
      console.log('null');
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
