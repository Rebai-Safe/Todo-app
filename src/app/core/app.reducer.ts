import { ActionReducerMap } from '@ngrx/store';
import { todoReducer } from './todo-store/todo.reducer';
import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState> = {
  todo: todoReducer, // Integrating the todo feature reducer

};
