import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodosComponent } from './todos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TodoComponent,
    TodosComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
