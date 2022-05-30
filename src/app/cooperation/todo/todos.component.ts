import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoModel } from './todo.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { TodoGroupModel } from './todo-group.model';
import { ResponseObject } from 'src/app/core/model/response-object';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  newText: string = '';
  todos: TodoModel[];
  today: Date = new Date();

  constructor(private service: TodoService) {
    this.todos = [

      // {isCompleted: false, todo: '할일1'},
      // {isCompleted: false, todo: '할일2'}
    ];
  }

  ngOnInit() {

  }

  toggleTodo(todo: TodoModel) {
    todo.isCompleted = !todo.isCompleted;
  }

  addTodo(text: string) {
    const todo: any = {};
    this.service
        .saveTodo(todo)
        .subscribe(
          (model: ResponseObject<TodoModel>) => {
            this.todos.push({
              pkTodoGroup : model.data.pkTodoGroup,
              pkTodo : model.data.pkTodo,
              isCompleted : false,
              todo : model.data.todo
            });
          }
        )

  }

  getTodoList(e: TodoGroupModel): void {
    this.service
        .getTodoList(e.pkTodoGroup)
        .subscribe(
          (model: ResponseList<TodoModel>) => {
            this.todos = model.data;
            console.log(model);
          });

  }
}

