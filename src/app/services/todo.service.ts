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
  private todos: Todo[] = [];
  private filteredTodos: Todo[] = [];

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
    this.todos = this.storeService.getObj(TodoService.TodoStorageKey) || [];
    // this.filteredTodos = [...this.todos]; //shallow copy
    // this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))]; //deepcopy
    console.log('todo init: ', typeof this.todos);

    this.filteredTodos = structuredClone(this.todos);
    this.updateTodosData();
  }
  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter((todo) => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter((todo) => todo.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))];
        break;
    }
    if (isFiltering) {
      this.updateToLocalStorage();
    }
  }
  updateToLocalStorage() {
    this.storeService.setObj(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }
  private updateTodosData() {
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
  addTodo(todo: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, todo);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }
}
