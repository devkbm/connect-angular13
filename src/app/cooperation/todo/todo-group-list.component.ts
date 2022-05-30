import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { TodoGroupModel } from './todo-group.model';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-group-list',
  template: `
    <button (click)="addTodoGroup()">add</button>

    <div *ngFor="let todoGroup of todoGroupList; index as i" (click)="loggin(todoGroup)">
      <label>{{todoGroup.todoGroupName}}</label>
    </div>
  `,
  styles: []
})
export class TodoGroupListComponent implements OnInit {

  todoGroupList: TodoGroupModel[] = [];

  @Output() onSelectedTodoGroup = new EventEmitter();

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.getTodoGroupList();
  }

  addTodoGroup(): void {
    this.service.newTodoGroup()
                .subscribe(
                  (model: ResponseObject<TodoGroupModel>) => {
                    this.todoGroupList.push(model.data);
                    console.log(model);
                  });
  }

  getTodoGroupList(): void {
    this.service.getMyTodoGroupList()
                .subscribe(
                  (model: ResponseList<TodoGroupModel>) => {
                    this.todoGroupList = model.data;
                  }
                );
  }

  loggin(e: TodoGroupModel): void {
    this.onSelectedTodoGroup.emit(e);
    console.log(e);
  }
}
