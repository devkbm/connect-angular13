import {Component, ViewChild, AfterViewInit, Input} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";

@Component({
  selector: 'app-calendar-daypilot',
  template: `
    <div class="container">
      <div class="navigator">
        <daypilot-navigator [config]="configNavigator" [events]="events" [(date)]="date" (dateChange)="changeDate($event)" #navigator></daypilot-navigator>
      </div>
      <div class="content">
        {{navigator.date.toDate() | date : 'YYYY-MM' }}
        <div class="buttons">
        <button (click)="viewDay()" [class]="this.configNavigator.selectMode == 'Day' ? 'selected' : ''">Day</button>
        <button (click)="viewWeek()" [class]="this.configNavigator.selectMode == 'Week' ? 'selected' : ''">Week</button>
        <button (click)="viewMonth()" [class]="this.configNavigator.selectMode == 'Month' ? 'selected' : ''">Month</button>
        <button (click)="navigatePrevious($event)">Previous</button>
        <button (click)="navigateToday($event)">Today</button>
        <button (click)="navigateNext($event)">Next</button>
        </div>

        <daypilot-calendar [config]="configDay" [events]="events" #day></daypilot-calendar>
        <daypilot-calendar [config]="configWeek" [events]="events" #week></daypilot-calendar>
        <daypilot-month [config]="configMonth" [events]="events" #month></daypilot-month>
      </div>
    </div>
  `,
  styles: [`
    .container {
        display: flex;
        flex-direction: row;
      }

      .navigator {
        margin-right: 10px;
      }

      .content {
        flex-grow: 1;
      }

      .buttons {
        margin-bottom: 10px;
      }

      button {
        background-color: #3c78d8;
        color: white;
        border: 0;
        padding: .5rem 1rem;
        width: 80px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 5px;
      }

      button.selected {
        background-color: #1c4587;
      }
  `
  ]
})
export class CalendarDaypilotComponent implements AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  @Input()
  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.nav.date = date;
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today()
  };

  configWeek: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    onTimeRangeSelected: async (args) => {
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
    startDate: DayPilot.Date.today()
  };

  constructor() {
    this.viewWeek();

  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();

  }

  viewDay():void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek():void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth():void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  navigatePrevious(event: any): void {
    event.preventDefault();

    if (this.configNavigator.selectMode === 'Day') {
      this.changeDate((this.configDay.startDate as DayPilot.Date).addDays(-1));
    } else if (this.configNavigator.selectMode === 'Week') {
      this.changeDate((this.configWeek.startDate as DayPilot.Date).addDays(-7));
    } else if (this.configNavigator.selectMode === 'Month') {
      this.changeDate((this.configMonth.startDate as DayPilot.Date).addMonths(-1));
    }
  }

  navigateNext(event: any): void {
    event.preventDefault();

    if (this.configNavigator.selectMode === 'Day') {
      this.changeDate((this.configDay.startDate as DayPilot.Date).addDays(1));
    } else if (this.configNavigator.selectMode === 'Week') {
      this.changeDate((this.configWeek.startDate as DayPilot.Date).addDays(7));
    } else if (this.configNavigator.selectMode === 'Month') {
      this.changeDate((this.configMonth.startDate as DayPilot.Date).addMonths(1));
    }
  }

  navigateToday(event: any): void {
    event.preventDefault();

    this.changeDate(DayPilot.Date.today());
  }

}
