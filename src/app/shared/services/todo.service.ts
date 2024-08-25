import {Injectable} from '@angular/core';
import {Todo} from "../model/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  deleteToDo(toDoId: string) {
    let item = localStorage.getItem("tasks");
    if (item != null) {
      let tasks = JSON.parse(item);
      let index = tasks.findIndex((task: Todo) => task.id == toDoId)
      tasks.splice(index, 1)
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }

  createToDo(todo: Todo) {
    let item = localStorage.getItem("tasks");
    if (item != null) {
      let tasks = JSON.parse(item);
      tasks.push(todo);
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }
}
