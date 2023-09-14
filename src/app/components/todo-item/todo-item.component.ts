import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const fadeStrikeThrough = trigger('fadeStrikeThrough', [
  state(
    'active',
    style({
      fontSize: '18px',
      color: 'black',
    })
  ),
  state(
    'completed',
    style({
      fontSize: '15px',
      color: 'yellow',
      textDecoration: 'line-through',
    })
  ),
  transition('active <=> completed', animate('5s ease-out')),
]);
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThrough],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() changeEdit: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  isHovering = false;
  isEditing = false;
  constructor(private todoServices: TodoService) {}

  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();

    if (keyCode === 13) {
      this.changeEdit.emit(this.todo);
      this.isEditing = false;
    }
  }

  onHandleChangeStatus(todo: Todo) {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });

    // this.todoServices.changeTodoStatus(Number(todo.id), !todo.isCompleted);
  }
  onHandleDeleteStatus(todo: Todo) {
    this.deleteStatus.emit(todo);
  }
}
