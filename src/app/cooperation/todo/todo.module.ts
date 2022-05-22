import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodosComponent } from './todos.component';
import { AddTodoComponent } from './add-todo.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    TodoComponent,
    TodosComponent,
    AddTodoComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
