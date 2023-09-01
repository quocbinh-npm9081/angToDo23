import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';
  private todos: Todo[];
  private filterTodos: Todo[];

  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(private storeService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.todos =
      this.storeService.getValue<Todo[]>(TodoService.TodoStorageKey) || ơ;
    this.filterTodos = [...this.todos];

    this.displayTodoSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
