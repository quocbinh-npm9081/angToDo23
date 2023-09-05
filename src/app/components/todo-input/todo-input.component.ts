import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  todoContent: string = '';
  constructor(private todoService: TodoService) {}
  onSubmit() {
    // console.log('todoContent: ', this.todoContent);
    if (this.todoContent.trim() === '') return false;
    this.todoService.addTodo(this.todoContent);
    this.todoContent = '';
    return true;
  }
}
