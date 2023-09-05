import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hasTodo$?: Observable<boolean>;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0)); //Neu length > 0 tra ve true

    this.hasTodo$.subscribe((hasTodo) => {
      console.log('hasTodo value:', hasTodo);
    });
  }
}
