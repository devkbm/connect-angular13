import {Component, ViewChild, AfterViewInit, Input, Output, EventEmitter} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent
} from "@daypilot/daypilot-lite-angular";

export interface ModeChangedArgs {
  readonly mode: "Day" | "Week" | "Month" | "None";
  readonly date: DayPilot.Date;
}

@Component({
  selector: 'app-daypilot-calendar',
  template: `
    <div class="calendar">
      <div class="header">

        <div class="nav-buttons">
          <button (click)="navigatePrevious($event)" class="direction-button"><</button>
          <button (click)="navigateToday($event)">Today</button>
          <button (click)="navigateNext($event)" class="direction-button">></button>
        </div>

        <div class="title">
          <div *ngIf="this.mode === 'Day'">
            {{date.toDate() | date : 'YYYY-MM-dd' }}
          </div>
          <div *ngIf="this.mode === 'Week'">
            {{start.toDate() | date : 'YYYY-MM-dd' }} ~ {{end.toDate() | date : 'YYYY-MM-dd' }}
          </div>
          <div *ngIf="this.mode === 'Month'">
            {{date.toDate() | date : 'YYYY-MM' }}
          </div>
        </div>

        <div class="view-buttons">
          <button (click)="viewDay()" [class]="this.mode == 'Day' ? 'selected' : ''">Day</button>
          <button (click)="viewWeek()" [class]="this.mode == 'Week' ? 'selected' : ''">Week</button>
          <button (click)="viewMonth()" [class]="this.mode == 'Month' ? 'selected' : ''">Month</button>
        </div>
      </div>

      <div class="contents">
        <daypilot-calendar #day   [config]="configDay" [events]="events"></daypilot-calendar>
        <daypilot-calendar #week  [config]="configWeek" [events]="events"></daypilot-calendar>
        <daypilot-month    #month [config]="configMonth" [events]="events"></daypilot-month>
      </div>

    </div>
  `,
  styleUrls: ['./daypilot-calendar.component.css']
})
export class DaypilotCalendarComponent implements AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;

  @Input() mode?: "Day" | "Week" | "Month" | "None" = "Month";
  @Input() events: DayPilot.EventData[] = [];

  @Output() datesSelected: EventEmitter<{start: Date, end: Date}> = new EventEmitter<{start: Date, end: Date}>();
  @Output() rangeChanged: EventEmitter<{start: Date , end: Date, date: Date}> = new EventEmitter<{start: Date , end: Date, date: Date}>();
  @Output() eventClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() modeChanged:  EventEmitter<ModeChangedArgs> = new EventEmitter<ModeChangedArgs>();

  date: DayPilot.Date;
  start: DayPilot.Date;
  end: DayPilot.Date;

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

    this.date = DayPilot.Date.today();
    this.start = this.date.firstDayOfMonth().firstDayOfWeek('ko-kr');
    this.end = this.date.lastDayOfMonth().addDays(7).firstDayOfWeek('ko-kr').addDays(-1);
  }

  configDay: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    heightSpec: 'BusinessHours',
    cellHeight: 40,
    onTimeRangeSelected: (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      this.setDate(args.start);
      this.datesSelected.emit({start: args.start.toDateLocal(), end: args.end.toDateLocal()});
    },
    onEventClicked: (args: DayPilot.CalendarEventClickedArgs) => {
      this.eventClicked.emit(args.e.data);
    }
  };

  configWeek: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    locale: 'ko-kr',
    heightSpec: 'BusinessHours',
    cellHeight: 40,
    onTimeRangeSelected: (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      this.setDate(args.start);
      this.datesSelected.emit({start: args.start.toDateLocal(), end: args.end.toDateLocal()});
    },
    onEventClicked: (args: DayPilot.CalendarEventClickedArgs) => {
      this.eventClicked.emit(args.e.data);
    }
  };

  configMonth: DayPilot.MonthConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    cellHeight: 141.6,
    onTimeRangeSelected: (args: DayPilot.MonthTimeRangeSelectedArgs) => {
      this.setDate(args.start);
      this.datesSelected.emit({start: args.start.toDateLocal(), end: args.end.toDateLocal()});
    },
    onEventClicked: (args: DayPilot.MonthEventClickedArgs) => {
      this.eventClicked.emit(args.e.data);
    }
  };

  ngAfterViewInit(): void {
    this.viewMonth();
    // this.loadTestEvents();
  }

  setDate(date: DayPilot.Date) {
    this.date = date;
  }

  viewDay(): void {
    this.mode = "Day";
    this.setDate(this.date);
    this.rangeChangedEvent(this.date);

    this.modeChanged.emit({mode: this.mode, date: this.date});
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.mode = "Week";
    this.setDate(this.date);
    this.rangeChangedEvent(this.date);

    this.modeChanged.emit({mode: this.mode, date: this.date});
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.mode = "Month";
    this.setDate(this.date);
    this.rangeChangedEvent(this.date);

    this.modeChanged.emit({mode: this.mode, date: this.date});
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  navigatePrevious(event: MouseEvent): void {
    //event.preventDefault();
    if (this.mode === 'Day') {
      this.setDate(this.date.addDays(-1));
      this.rangeChangedEvent(this.date.addDays(-1));
    } else if (this.mode === 'Week') {
      this.setDate(this.date.addDays(-7));
      this.rangeChangedEvent(this.date.addDays(-7));
    } else if (this.mode === 'Month') {
      this.setDate(this.date.addMonths(-1));
      this.rangeChangedEvent(this.date.addMonths(-1));
    }
  }

  navigateNext(event: MouseEvent): void {
    //event.preventDefault();
    if (this.mode === 'Day') {
      this.setDate(this.date.addDays(1));
      this.rangeChangedEvent(this.date.addDays(1));
    } else if (this.mode === 'Week') {
      this.setDate(this.date.addDays(7));
      this.rangeChangedEvent(this.date.addDays(7));
    } else if (this.mode === 'Month') {
      this.setDate(this.date.addMonths(1));
      this.rangeChangedEvent(this.date.addMonths(1));
    }
  }

  navigateToday(event: MouseEvent): void {
    //event.preventDefault();
    this.setDate(DayPilot.Date.today());
    this.rangeChangedEvent(DayPilot.Date.today());
  }

  rangeChangedEvent(date: DayPilot.Date): void {
    if (this.mode === 'Day') {
      this.start = date;
      this.end = date;
      const range = {start: date.toDateLocal(), end: date.toDateLocal(), date: this.date.toDateLocal()};
      this.rangeChanged.emit(range);

      // Day Component
      this.configDay.startDate = this.start;
      this.day.control.startDate = this.start;
    } else if (this.mode === 'Week') {
      const sunday: DayPilot.Date = this.date.firstDayOfWeek('ko-kr');
      this.start = sunday;
      this.end = sunday.addDays(6);
      const range = {start: this.start.toDateLocal(), end: this.end.toDateLocal(), date: this.date.toDateLocal()};
      this.rangeChanged.emit(range);

      // Week Component
      this.week.control.startDate = this.start;
      this.configWeek.startDate = this.start;
    } else if (this.mode === 'Month') {
      this.start = this.date.firstDayOfMonth().firstDayOfWeek('ko-kr');
      this.end = this.date.lastDayOfMonth().addDays(7).firstDayOfWeek('ko-kr').addDays(-1);
      const range = {start: this.start.toDateLocal(), end: this.end.toDateLocal(), date: this.date.toDateLocal()};
      this.rangeChanged.emit(range);

      // Month Component
      this.month.control.startDate = this.date;
      this.configMonth.startDate = this.date;
    }
  }

  loadTestEvents(): void {
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
    },
    {
      id: 3,
      start: '2022-08-05T20:40:04.665+09:00',
      end: '2022-08-05T20:40:04.665+09:00',
      text: 'ddd'
    }];
  }

  async newEventModal(args: DayPilot.CalendarTimeRangeSelectedArgs | DayPilot.MonthTimeRangeSelectedArgs) {
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

  dateLogging(): void {
    console.log('date: ' + this.date);

    console.log('configDay control: ' + this.configDay.startDate);
    console.log('configWeek control: ' + this.configWeek.startDate);
    console.log('configMonth control: ' + this.configMonth.startDate);

    console.log('day control: ' + this.day.control.startDate);
    console.log('week control: ' + this.week.control.startDate);
    console.log('month control: ' + this.month.control.startDate);
  }

}
