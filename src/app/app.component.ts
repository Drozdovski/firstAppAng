import { Component } from '@angular/core';
import { Todo } from '../providers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-man';
  todos = [];

  constructor(private todoService: Todo) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.query().subscribe((data) => {
      this.todos = data;
    })
  }
}
