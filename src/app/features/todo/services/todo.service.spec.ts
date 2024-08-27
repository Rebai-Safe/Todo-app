import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../core/app.state";
import {CreateTodoComponent} from "../components/create-todo/create-todo.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {selectTodos} from "../../../core/todo-store/todo.selectors";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {createTodo, deleteTodo, updateTodo, updateTodoState} from "../../../core/todo-store/todo.actions";
import {Todo, TodoState} from "../../../shared/model/todo";
import {of} from "rxjs";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

describe('TodoServiceService', () => {
  let service: TodoService;
  let store: MockStore<AppState>;
  let dialog: jasmine.SpyObj<MatDialog>;


  beforeEach(() => {
    //  mock store and dialog
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        {provide: Store, useValue: store},
        {provide: MatDialog, useValue: dialog}
      ]
    });
    service = TestBed.inject(TodoService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch createTodo action when createTodo is called', () => {
    const todo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Description',
      state: 'Todo',
      startDate: new Date(),
      endDate: new Date()
    };
    service.createTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(createTodo({todo}));
  });


  it('should dispatch updateTodo action when updateTodo is called', () => {
    const todo: Todo = {
      id: '1',
      title: 'Updated Todo',
      description: 'Updated Description',
      state: 'InProgress',
      startDate: new Date(),
      endDate: new Date()
    };
    service.updateTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(updateTodo({todo}));
  });

  it('should dispatch updateTodoState action when updateTodoState is called', () => {
    const todo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Description',
      state: 'Todo',
      startDate: new Date(),
      endDate: new Date()
    };
    service.updateTodoState(todo, 'Done');
    expect(store.dispatch).toHaveBeenCalledWith(updateTodoState({id: todo.id, state: 'Done'}));
  });

  it('should open dialog and dispatch deleteTodo when confirmed', () => {
    const id = '1';
    const dialogRef = {
      afterClosed: () => of('YES')
    } as any;

    dialog.open.and.returnValue(dialogRef);

    service.deleteToDo(id, dialog);

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: "Are you sure ?",
        text: "Are you sure you want to delete this task ?",
        error: false
      }
    });

    expect(store.dispatch).toHaveBeenCalledWith(deleteTodo({id}));
  });

  it('should not dispatch deleteTodo if dialog is not confirmed', () => {
    const id = '1';
    const dialogRef = {
      afterClosed: () => of('NO')
    } as any;

    dialog.open.and.returnValue(dialogRef);
    service.deleteToDo(id, dialog);

    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(deleteTodo({id}));
  });

});
