import { Component, OnInit } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  newText: string = '';
  todos: TodoModel[];

  constructor() {
    this.todos = [
      {done: false, text: '할일1'},
      {done: false, text: '할일2'}
    ];
  }

  ngOnInit() {

  }

  toggleTodo(todo: TodoModel) {
    todo.done = !todo.done;
  }
}

