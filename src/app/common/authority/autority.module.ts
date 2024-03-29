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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from '../../core/grid/renderer/checkbox-renderer.component';

/* Inner Component */
import { AuthorityFormComponent } from './authority-form.component';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityComponent } from './authority.component';
import { AuthorityService } from './authority.service';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

const angularModules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'})
]

const nzModules = [
  NzButtonModule,
  NzPopconfirmModule,
  NzIconModule,
  NzGridModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
]

@NgModule({
  imports: [
    ...angularModules,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    ...nzModules,
    SharedModule,
    CalendarModule
  ],
  declarations: [
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    AuthorityService
  ],
  exports: [
    AuthorityComponent
  ]
})
export class AutorityModule { }
