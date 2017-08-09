import { Component } from '@angular/core';
import { Todo } from '../providers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-man';
  todos:any = [];
  todo:any = {};
  selectedTasks = {};

  constructor(private todoService: Todo) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.query().subscribe((data) => {
      this.todos = data;
    })
  }

  createTodo() {
    this.todoService.create(this.todo).subscribe(
      (data) => {
        this.todo = {};
        this.todos.push(data);
      },
      (error) => {

      }
    )
  }

  editTask(todo) {
    this.selectedTasks[todo.id] = Object.assign({}, todo);
  }

  updateTodo(todo) {
    this.todoService.update(todo.id, this.selectedTasks[todo.id]).subscribe(
      (data) => {
        let todoIndex = this.todos.findIndex((item => item.id == todo.id));
        this.selectedTasks[todo.id] = undefined;
        this.todos[todoIndex] = data;
      },
      (error) => {

      }
    )
  }

  deleteTodo(id) {
    if(confirm('Are you sure?')) {
      this.todoService.delete(id).subscribe(
        () => {
          this.todos = this.todos.filter((todo) => { return todo.id != id })
        },
        (error) => {

        }
      )
    }
  }

}
