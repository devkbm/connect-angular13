import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { DataService } from './data.service';
import { CalendarDaypilotComponent } from './calendar-daypilot.component';
import { CalendarDaypilotNavigatorComponent } from './calendar-daypilot-navigator.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    CalendarComponent,
    CalendarDaypilotComponent,
    CalendarDaypilotNavigatorComponent
  ],
  providers: [DataService],
  exports: [
    CalendarComponent,
    CalendarDaypilotComponent,
    CalendarDaypilotNavigatorComponent
  ]
})
export class CalendarModule { }
