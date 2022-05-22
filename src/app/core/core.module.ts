import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

/* NG-ZORRO */
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';

import { ButtonRendererComponent } from './grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from './grid/renderer/checkbox-renderer.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent])
  ],
  declarations: [
    ButtonRendererComponent,
    CheckboxRendererComponent
  ],
  exports: [
    ButtonRendererComponent,
    CheckboxRendererComponent
  ]
})
export class CoreModule { }
