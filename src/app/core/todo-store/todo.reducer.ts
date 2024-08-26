import {createReducer, on} from '@ngrx/store';
import {createTodo, deleteTodo, loadTodos, updateTodo, updateTodoState} from './todo.actions';
import {initialState} from "../../shared/model/todo";


const _todoReducer = createReducer(
  initialState,
  on(createTodo, (state, {todo}) => ({
    ...state,
    todos: [...state.todos, todo]
  })),
  on(updateTodo, (state, {todo}) => ({
    ...state,
    todos: state.todos.map(t => (t.id === todo.id ? todo : t))
  })),
  on(deleteTodo, (state, {id}) => ({...state, todos: state.todos.filter(t => t.id !== id)})),

  on(loadTodos, (state, {todos}) => ({
      ...state,
      todos: [...todos]
    })
  ),
  on(updateTodoState, (stateT, {id, state}) => ({
    ...stateT,
    todos: stateT.todos.map(todo =>
      todo.id === id ? {...todo, state} : todo
    )
  }))
)

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}

