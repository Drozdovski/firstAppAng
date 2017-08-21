import { Component } from '@angular/core';
import { Todo } from '../providers';
import * as _ from 'lodash';
import {HostBinding} from '@angular/core';


@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @HostBinding('style.background-image')
  backgroundImage:string = 'url(https://s-media-cache-ak0.pinimg.com/originals/38/4a/3a/384a3a96abac9f196c9a862c31ad33c4.jpg)';
  title = 'Task-man';
  todos:any = [];
  todo:any = {};
  selectedTasks = {};
  orderDir = 'asc';

  constructor(private todoService: Todo) {
    this.loadTodos();
  }

  orderBy() {
    this.orderDir = this.orderDir == 'asc' ? 'desc' : 'asc'
    this.todos = _.orderBy(this.todos, ['title'], [this.orderDir]);
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
