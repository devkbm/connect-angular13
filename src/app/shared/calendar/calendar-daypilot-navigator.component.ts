import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  DayPilot,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";

@Component({
  selector: 'app-calendar-daypilot-navigator',
  template: `
    <daypilot-navigator #navigator
      [config]="configNavigator"
      [events]="events"
      [(date)]="date"
      (dateChange)="changeDate($event)">
   </daypilot-navigator>
  `,
  styles: []
})
export class CalendarDaypilotNavigatorComponent implements AfterViewInit {

  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  @Input()
  events: DayPilot.EventDataShort[] = [];
  @Output() dateChanged:EventEmitter<DayPilot.Date> =new EventEmitter<DayPilot.Date>();

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args: any) => {
      console.log(args);
    }
  };

  constructor() { }

  ngAfterViewInit(): void {

  }

  changeDate(date: DayPilot.Date): void {
    this.nav.date = date;
    this.dateChanged.emit(date);
  }

}
