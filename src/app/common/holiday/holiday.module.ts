import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from '../../core/interceptor/custom-http-interceptor';
import { SharedModule } from 'src/app/shared/shared.module';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from '../../core/grid/renderer/checkbox-renderer.component';
import { HolidayService } from './holiday.service';
import { HolidayComponent } from './holiday.component';
import { HolidayFormComponent } from './holiday-form.component';
import { HolidayGridComponent } from './holiday-grid.component';

/* Inner Component */

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    AllNgZorroModule,
    SharedModule
  ],
  declarations: [
    HolidayFormComponent,
    HolidayGridComponent,
    HolidayComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    HolidayService
  ],
  exports: [
    HolidayComponent
  ]
})
export class HolidayModule { }
