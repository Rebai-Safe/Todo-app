import {createAction, props} from '@ngrx/store';
import {Todo} from "../shared/model/todo";

export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{ todo: Todo }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo}>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const loadTodos = createAction(
  '[LoadTodos] Load State',
  props<{ todos: Todo[] }>()
);

export const loadTodoById = createAction(
  '[Todo] Load Todo By ID',
  props<{ id: string }>()
);

export const updateTodoState = createAction(
  '[Todo] update Todo State',
  props<{ id: string; state: "Todo" | "InProgress" | "Done" | "Cancelled" }>()
);



