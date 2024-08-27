import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Todo} from "../../../../shared/model/todo";
import {SharedModule} from "../../../../shared/shared.module";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TodoService} from "../../services/todo.service";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-todo-drag-drop',
  standalone: true,
  imports: [CommonModule, SharedModule, DragDropModule],
  templateUrl: './todo-drag-drop.component.html',
  styleUrls: ['./todo-drag-drop.component.scss']
})
export class TodoDragDropComponent implements OnInit, OnDestroy {

  // all tasks container
  tasks: Todo[] = [];

  // to handle observable
  destroy$ = new Subject<void>();

  // tasks by state
  todo: Todo[] = [];
  inProgress: Todo[] = [];
  done: Todo[] = [];
  cancelled: Todo[] = [];


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private todoService: TodoService) {
  }

  drop(event: CdkDragDrop<Todo[]>, index: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const position = event.currentIndex;

    switch (index) {
      case 0 :
        this.updateTaskState(event.container.data[position], "Todo")
        ;
        break;
      case 1 :
        this.updateTaskState(event.container.data[position], "InProgress");
        break
          ;
      case 2:
        this.updateTaskState(event.container.data[position], "Done");
        break
          ;
      case 3:
        this.updateTaskState(event.container.data[position], "Cancelled");
        break
          ;
    }

  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.todoService.loadTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
      this.tasks = res.todos;
      if (this.tasks.length > 0) {
        this.todo = this.tasks.filter(task => task.state == "Todo");
        this.inProgress = this.tasks.filter(task => task.state == "InProgress");
        this.done = this.tasks.filter(task => task.state == "Done");
        this.cancelled = this.tasks.filter(task => task.state == "Cancelled");
      }
    }, error => {
      console.error('error loading todos :', error);
    })
  }

  goToUpdateTodo(element: Todo) {
    this.router.navigate(['features/todo/update-todo', element.id])
  }

  deleteToDo(element: Todo) {
    try {
      this.todoService.deleteToDo(element.id, this.dialog)
    } catch {
      console.error('error deleting todo ');
    }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  private updateTaskState(todo: Todo, state: "Todo" | "InProgress" | "Done" | "Cancelled") {
    try {
      this.todoService.updateTodoState(todo, state)
    } catch {
      console.error('error updating todo ');
    }
  }
}

