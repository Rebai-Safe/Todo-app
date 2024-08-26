import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {createTodo, deleteTodo, loadTodoById, updateTodoState} from "../../../core/todo-store/todo.actions";
import {Todo} from "../../../shared/model/todo";
import {selectTodoById, selectTodos} from "../../../core/todo-store/todo.selectors";
import {updateTodo} from "../../../core/todo-store/todo.actions";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  isLoading = false;

  constructor(
    private store: Store,) {
  }

  createTodo(todo: Todo) {
    this.store.dispatch(createTodo({todo: todo}));
  }

  loadTodos() {
    return this.store.select(selectTodos);
  }

  loadTodoById(id: string) {
    // dispatch action to load the todo by ID
    this.store.dispatch(loadTodoById({id}));
    return this.store.select(selectTodoById(id));
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(updateTodo({todo: todo}));

  }

  updateTodoState(todo: Todo, state: "Todo" | "InProgress" | "Done" | "Cancelled") {
    this.store.dispatch(updateTodoState({id: todo.id, state: state}));
  }

  deleteToDo(id: string, dialog: MatDialog) {
    const dialogRef = dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {title: "Are you sure ?", text: "Are you sure you want to delete this task ?", error: false}
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      if (response === 'YES') {
        this.doDeleteTodo(id)
      }
    }, error => {
      dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {title: "Error", text: "Error occurred while proceeding", error: true}
      });
    })
  }

  private doDeleteTodo(id: string) {
    this.store.dispatch(deleteTodo({id: id}));
  }
}
