import {Component, ViewChild, AfterViewInit, Input, Output, EventEmitter} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent
} from "@daypilot/daypilot-lite-angular";
import { StaffRegistFormComponent } from "src/app/hrm/staff/staff-regist-form.component";

@Component({
  selector: 'app-daypilot-calendar',
  template: `
    <div class="content">
      <div class="header">
        <div class="nav-buttons">
          <button (click)="navigatePrevious($event)" class="direction-button"><</button>
          <button (click)="navigateToday($event)">Today</button>
          <button (click)="navigateNext($event)" class="direction-button">></button>
        </div>

        <div class="title">
          <div *ngIf="selectMode === 'Day'">
            {{date.toDate() | date : 'YYYY-MM-dd' }}
          </div>
          <div *ngIf="selectMode === 'Week'">
            {{date.toDate() | date : 'YYYY-MM' }}
          </div>
          <div *ngIf="selectMode === 'Month'">
            {{date.toDate() | date : 'YYYY-MM' }}
          </div>
        </div>

        <div class="view-buttons">
          <button (click)="viewDay()" [class]="this.selectMode == 'Day' ? 'selected' : ''">Day</button>
          <button (click)="viewWeek()" [class]="this.selectMode == 'Week' ? 'selected' : ''">Week</button>
          <button (click)="viewMonth()" [class]="this.selectMode == 'Month' ? 'selected' : ''">Month</button>
        </div>
      </div>

      <daypilot-calendar #day   [config]="configDay" [events]="events"></daypilot-calendar>
      <daypilot-calendar #week  [config]="configWeek" [events]="events"></daypilot-calendar>
      <daypilot-month    #month [config]="configMonth" [events]="events" ></daypilot-month>

    </div>

  `,
  styleUrls: ['./daypilot-calendar.component.css']
})
export class DaypilotCalendarComponent implements AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;

  @Input() selectMode?: "Day" | "Week" | "Month" | "None" = "Month";
  @Input() events: DayPilot.EventData[] = [];

  @Output() dateChanged: EventEmitter<DayPilot.Date> = new EventEmitter<DayPilot.Date>();
  @Output() rangeChanged: EventEmitter<{start:DayPilot.Date , end:DayPilot.Date}> = new EventEmitter<{start:DayPilot.Date , end:DayPilot.Date}>();

  date = DayPilot.Date.today();

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.date = date;
  }

  configDay: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    onTimeRangeSelected: async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      console.log(args);
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    }

  };

  configWeek: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    locale: 'ko-kr',
    onTimeRangeSelected: async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      this.rangeChanged.emit({start: args.start, end: args.end});
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    }
  };

  configMonth: DayPilot.MonthConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    onTimeRangeSelected: async (args: DayPilot.MonthTimeRangeSelectedArgs) => {
      this.rangeChanged.emit({start: args.start, end: args.end});
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
      console.log(this.events);
    },
    onEventClick:async (args: DayPilot.MonthEventClickArgs) => {
      console.log(args);
    }
  };

  constructor() {
    const localeKR = new DayPilot.Locale(
      'ko-kr',
      {
        dayNames:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
        dayNamesShort:['일','월','화','수','목','금','토'],
        monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월',''],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월',''],
        timePattern:'h:mm tt',
        datePattern:'yyyy-M-d ddd',
        dateTimePattern:'yyyy-M-d h:mm tt',
        timeFormat:'Clock12Hours',
        weekStarts: 0                         // 0 일요일
      }
    );

    DayPilot.Locale.register(localeKR);

    this.viewMonth();
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = [{
      id: 1,
      start: "2022-08-01T13:00:00",
      end: "2022-08-01T15:00:00",
      text: "Event 1",
      barColor: "#f1c232"
    },
    {
      id: 2,
      start: "2022-08-01T10:00:00",
      end: "2022-08-01T12:00:00",
      text: "Event 2"
    }];
  }

  viewDay(): void {
    this.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  navigatePrevious(event: any): void {
    event.preventDefault();

    if (this.selectMode === 'Day') {
      const date = (this.configDay.startDate as DayPilot.Date).addDays(-1);
      this.configDay.startDate = date;
      this.configWeek.startDate = date;
      this.configMonth.startDate = date;

      this.rangeChanged.emit({start: date, end: date});

      //this.changeDate((this.configDay.startDate as DayPilot.Date).addDays(-1));
    } else if (this.selectMode === 'Week') {
      const date = (this.configDay.startDate as DayPilot.Date).addDays(-7);
      this.configDay.startDate = date;
      this.configWeek.startDate = date;
      this.configMonth.startDate = date;

      this.rangeChanged.emit({start: date, end: date.addDays(7)});

      //this.changeDate((this.configWeek.startDate as DayPilot.Date).addDays(-7));
    } else if (this.selectMode === 'Month') {
      const date = (this.configDay.startDate as DayPilot.Date).addMonths(-1);
      this.configDay.startDate = date;
      this.configWeek.startDate = date;
      this.configMonth.startDate = date;

      this.rangeChanged.emit({start: date, end: date.addMonths(1)});

      //this.changeDate((this.configMonth.startDate as DayPilot.Date).addMonths(-1));
    }
  }

  navigateNext(event: any): void {
    event.preventDefault();

    if (this.selectMode === 'Day') {
      this.changeDate((this.configDay.startDate as DayPilot.Date).addDays(1));
    } else if (this.selectMode === 'Week') {
      this.changeDate((this.configWeek.startDate as DayPilot.Date).addDays(7));
    } else if (this.selectMode === 'Month') {
      this.changeDate((this.configMonth.startDate as DayPilot.Date).addMonths(1));
    }

  }

  navigateToday(event: any): void {
    event.preventDefault();

    this.changeDate(DayPilot.Date.today());
  }

}
