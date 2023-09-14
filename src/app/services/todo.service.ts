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

    // this.filteredTodos = structuredClone(this.todos);

    // mình không nên deepcopy trong trường hợp có sử dụng animation vì animation chỉ sử dụng cho thành phần static nếu mình sử dụng deepcode
    // thì mỗi lần thêm hay xóa  sửa todo sẽ được ...spread thành 1 todo reference khác dẫn đến animation tưởn thành phần mới và nó sẽ ko chạy animtion
    this.filteredTodos = [...this.todos]; //shallow copy

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
        //  this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))]; //deepcopy
        this.filteredTodos = [...this.todos]; //shadowcopy
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
  changeTodoStatus(id: number, isCompleted: boolean) {
    const todo = this.todos.find((t: Todo) => t.id === id);
    console.log('todo: ', todo);

    if (todo) todo.isCompleted = isCompleted;
    this.updateToLocalStorage();
  }
  changeTodoContent(t: Todo) {
    const thisTodo = this.todos.find((todo) => todo.id === t.id);
    if (thisTodo) thisTodo.content = t.content;
    this.updateToLocalStorage();
  }
  deleteTodo(id: number) {
    const indexToDo = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(indexToDo, 1);
    this.updateToLocalStorage();
  }
  changeAllToDoStatus() {
    this.todos = this.todos.map((todo: Todo) => {
      return {
        ...todo,
        isCompleted: !this.todos.every((todo: Todo) => todo.isCompleted),
      };
    });
    this.updateToLocalStorage();
  }
}
