import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(private todoServices: TodoService) {}
  ngOnInit(): void {
    this.todos$ = this.todoServices.todos$;
  }
  onHandleChangeStatus(todo: Todo) {
    this.todoServices.changeTodoStatus(Number(todo.id), todo.isCompleted);
  }
  onHandleChangeContent(todo: Todo) {
    this.todoServices.changeTodoContent(todo);
  }
  onHandleDeleteTodo(todo: Todo) {
    this.todoServices.deleteTodo(todo.id);
  }
}
