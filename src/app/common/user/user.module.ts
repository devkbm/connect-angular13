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
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from '../../core/grid/renderer/checkbox-renderer.component';

/* Inner Component */
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form.component';
import { UserGridComponent } from './user-grid.component';
import { UserPopupComponent } from './user-popup.component';
import { UserImageUploadComponent } from './user-image-upload.component';
import { UserService } from './user.service';

const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule,
  NzAvatarModule,
  NzDescriptionsModule,
  NzCardModule,
  NzImageModule,
  NzUploadModule,
  NzSpaceModule,
  NzSwitchModule,
  NzIconModule
]

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
    nzModules,
    SharedModule
  ],
  declarations: [
    UserImageUploadComponent,
    UserFormComponent,
    UserGridComponent,
    UserPopupComponent,
    UserComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    UserService
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
