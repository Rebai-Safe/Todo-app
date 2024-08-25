import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Todo} from "../../../shared/model/todo";
import {SharedModule} from "../../../shared/shared.module";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TodoService} from "../../../shared/services/todo.service";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {Store} from "@ngrx/store";
import {selectTodos} from "../../../core/todo.selectors";
import {deleteTodo, updateTodoState} from "../../../core/todo.actions";

@Component({
  selector: 'app-todo-drag-drop',
  standalone: true,
  imports: [CommonModule, SharedModule, DragDropModule],
  templateUrl: './todo-drag-drop.component.html',
  styleUrls: ['./todo-drag-drop.component.scss']
})
export class TodoDragDropComponent implements OnInit, OnDestroy {

  tasks: Todo[] = [];

  //
  todo: Todo[] = [];
  inProgress: Todo[] = [];
  done: Todo[] = [];
  cancelled: Todo[] = [];


  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
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
        this.updateTasks(event.container.data[position], "Todo")
        ;
        break;
      case 1 :
        this.updateTasks(event.container.data[position], "InProgress");
        break
          ;
      case 2:
        this.updateTasks(event.container.data[position], "Done");
        break
          ;
      case 3:
        this.updateTasks(event.container.data[position], "Cancelled");
        break
          ;
    }

  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.store.select(selectTodos).subscribe(res => {
      this.tasks = res.todos;
      if(this.tasks.length > 0){
        this.todo = this.tasks.filter(task => task.state == "Todo");
        this.inProgress = this.tasks.filter(task => task.state == "InProgress");
        this.done = this.tasks.filter(task => task.state == "Done");
        this.cancelled = this.tasks.filter(task => task.state == "Cancelled");
      }
    })
  }

  goToUpdateTodo(element: Todo) {
    this.router.navigate(['features/update-todo', element.id])
  }

  deleteToDo(element: Todo) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {title: "Are you sure ?", text: "Are you sure you want to delete this task ?", error: false}
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      if (response === 'YES') {
        this.store.dispatch(deleteTodo({id: element.id }));
      }
    }, error => {
      this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {title: "Error", text: "Error occurred while proceeding", error: true}
      });
    })
  }

  ngOnDestroy() {

  }


  private updateTasks(todo: Todo, state: "Todo" | "InProgress" | "Done" | "Cancelled") {
    this.store.dispatch(updateTodoState({id: todo.id, state: state}));
  }
}

