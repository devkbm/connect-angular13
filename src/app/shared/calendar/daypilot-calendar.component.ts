import {Component, ViewChild, AfterViewInit, Input, Output, EventEmitter} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent
} from "@daypilot/daypilot-lite-angular";

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

      <div class="contents">
        <daypilot-calendar #day   [config]="configDay" [events]="events"></daypilot-calendar>
        <daypilot-calendar #week  [config]="configWeek" [events]="events"></daypilot-calendar>
        <daypilot-month    #month [config]="configMonth" [events]="events"></daypilot-month>
      </div>
      d
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

  @Output() datesSelected: EventEmitter<{start: Date, end: Date}> = new EventEmitter<{start: Date, end: Date}>();
  @Output() rangeChanged: EventEmitter<{start: Date , end: Date}> = new EventEmitter<{start: Date , end: Date}>();
  @Output() eventClicked: EventEmitter<any> = new EventEmitter<any>();

  date = DayPilot.Date.today();

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  async newEvent(args: DayPilot.CalendarTimeRangeSelectedArgs | DayPilot.MonthTimeRangeSelectedArgs) {
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

  configDay: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    //heightSpec: 'Full',
    //height: 50,
    onTimeRangeSelected: (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      this.datesSelected.emit({start: args.start.toDate(), end: args.end.toDate()});
      console.log({start: args.start, end: args.end});
      this.newEvent(args);
    },
    onEventClicked: (args: DayPilot.CalendarEventClickedArgs) => {
      console.log(args.e.data);
      this.eventClicked.emit(args.e.data);
    }
  };

  configWeek: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    locale: 'ko-kr',
    //heightSpec: 'Full',
    //height: 50,
    onTimeRangeSelected: (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      this.datesSelected.emit({start: args.start.toDate(), end: args.end.toDate()});
      console.log({start: args.start, end: args.end});

      this.newEvent(args);
    },
    onEventClicked: (args: DayPilot.CalendarEventClickedArgs) => {
      console.log(args.e.data);
      this.eventClicked.emit(args.e.data);
    }
  };

  configMonth: DayPilot.MonthConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'ko-kr',
    onTimeRangeSelected: (args: DayPilot.MonthTimeRangeSelectedArgs) => {
      this.datesSelected.emit({start: args.start.toDate(), end: args.end.toDate()});
      console.log({start: args.start, end: args.end});

      this.newEvent(args);
    },
    onEventClicked: (args: DayPilot.MonthEventClickedArgs) => {
      console.log(args.e.data);
      this.eventClicked.emit(args.e.data);
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
    },
    {
      id: 3,
      start: '2022-08-05T20:40:04.665+09:00',
      end: '2022-08-05T20:40:04.665+09:00',
      text: 'ddd'
    }];
  }

  viewDay(): void {
    this.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;

    this.rangeChangedEvent(this.date);
  }

  viewWeek(): void {
    this.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;

    this.rangeChangedEvent(this.date);
  }

  viewMonth(): void {
    this.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;

    this.rangeChangedEvent(this.date);
  }

  navigatePrevious(event: MouseEvent): void {
    if (this.selectMode === 'Day') {
      this.setDate(this.date.addDays(-1));
    } else if (this.selectMode === 'Week') {
      this.setDate(this.date.addDays(-7));
    } else if (this.selectMode === 'Month') {
      this.setDate(this.date.addMonths(-1));
    }
  }

  navigateNext(event: MouseEvent): void {
    if (this.selectMode === 'Day') {
      this.setDate(this.date.addDays(1));
    } else if (this.selectMode === 'Week') {
      this.setDate(this.date.addDays(7));
    } else if (this.selectMode === 'Month') {
      this.setDate(this.date.addMonths(1));
    }
  }

  navigateToday(event: MouseEvent): void {
    this.setDate(DayPilot.Date.today());
  }

  setDate(date: DayPilot.Date): void {
    this.date = date;

    // Day
    this.configDay.startDate = date;
    this.day.control.startDate = date;
    // Week
    this.week.control.startDate = date;
    this.configWeek.startDate = date;
    // Month
    this.month.control.startDate = date;
    this.configMonth.startDate = date;

    this.rangeChangedEvent(date);
  }

  rangeChangedEvent(date: DayPilot.Date): void {
    if (this.selectMode === 'Day') {
      const range = {start: date.toDate(), end: date.toDate()};
      this.rangeChanged.emit(range);
      // console.log(range);
    } else if (this.selectMode === 'Week') {
      const sunday: DayPilot.Date = this.date.firstDayOfWeek('ko-kr');
      const range = {start: sunday.toDate(), end: sunday.addDays(6).toDate()};
      this.rangeChanged.emit(range);
      // console.log(range);
    } else if (this.selectMode === 'Month') {
      const fistday: DayPilot.Date = this.date.firstDayOfMonth().firstDayOfWeek('ko-kr');
      const lastday: DayPilot.Date = this.date.lastDayOfMonth().addDays(7).firstDayOfWeek('ko-kr').addDays(-1);
      const range = {start: fistday.toDate(), end: lastday.toDate()};
      this.rangeChanged.emit(range);
      // console.log(range);
    }
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
