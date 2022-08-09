import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  DayPilot,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";

@Component({
  selector: 'app-daypilot-calendar-navigator',
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
export class DaypilotCalendarNavigatorComponent implements AfterViewInit {

  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  @Input() events: DayPilot.EventDataShort[] = [];
  @Output() dateChanged:EventEmitter<DayPilot.Date> = new EventEmitter<DayPilot.Date>();
  @Output() rangeChanged:EventEmitter<{start: DayPilot.Date , end: DayPilot.Date}> = new EventEmitter<{start:DayPilot.Date , end:DayPilot.Date}>();

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    orientation: 'Vertical',
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args: {start: DayPilot.Date , end: DayPilot.Date}) => {
      this.rangeChanged.emit(args);
    }
  };

  constructor() { }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit event');
  }

  changeDate(date: DayPilot.Date): void {
    this.nav.date = date;
    this.dateChanged.emit(date);
  }

}
