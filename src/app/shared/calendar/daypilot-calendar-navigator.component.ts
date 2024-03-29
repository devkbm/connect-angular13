import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  DayPilot,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";


interface NavigatorTimeRangeSelectedArgs {
  readonly start: DayPilot.Date;
  readonly end: DayPilot.Date;
  readonly day: DayPilot.Date;
  readonly days: number;
  readonly mode: "Day" | "Week" | "Month" | "None" | "FreeHand";
}

interface NavigatorRangeChangedArgs {
  readonly start: DayPilot.Date;
  readonly end: DayPilot.Date;
  readonly date: DayPilot.Date;
}

@Component({
  selector: 'app-daypilot-calendar-navigator',
  template: `
    <daypilot-navigator #navigator
      [config]="configNavigator"
      [events]="events"
      [(date)]="date">
   </daypilot-navigator>
  `,
  styles: []
})
export class DaypilotCalendarNavigatorComponent implements AfterViewInit {

  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  @Input() mode: "Day" | "Week" | "Month" | "None" = "Day";
  @Input() events: DayPilot.EventDataShort[] = [];
  @Input() date: DayPilot.Date = DayPilot.Date.today();

  @Output() selectChanged:EventEmitter<NavigatorTimeRangeSelectedArgs> = new EventEmitter<NavigatorTimeRangeSelectedArgs>();
  @Output() rangeChanged:EventEmitter<NavigatorRangeChangedArgs> = new EventEmitter<NavigatorRangeChangedArgs>();

  configNavigator: DayPilot.NavigatorConfig = {
    orientation: 'Vertical',
    showMonths: 1,
    cellWidth: 28,
    cellHeight: 25,
    selectMode: this.mode,
    locale: 'ko-kr',
    onVisibleRangeChanged: (args: {start: DayPilot.Date , end: DayPilot.Date}) => {
      this.rangeChanged.emit({start: args.start, end: args.end, date: this.date });
    },
    onTimeRangeSelected: (args: NavigatorTimeRangeSelectedArgs) => {
      this.selectChanged.emit(args);
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

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit event');
  }

  setMode(mode: "Day" | "Week" | "Month" | "None", date: DayPilot.Date): void {
    this.mode = mode;
    this.configNavigator.selectMode = this.mode;
    this.date = date;
  }

}
