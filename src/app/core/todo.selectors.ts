import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Todo, TodoState} from "../shared/model/todo";

export const selectTodos = createFeatureSelector<TodoState>('todos');

// select all todos
export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos
);


// select todo by id
export const selectTodoById = (id: string) => createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.find(todo => todo.id === id) || null
);

