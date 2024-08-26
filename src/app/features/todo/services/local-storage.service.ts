import {Injectable} from '@angular/core';
import {TodoState} from "../../../shared/model/todo";
import {loadTodos} from "../../../core/todo-store/todo.actions";
import {Store} from "@ngrx/store";
import {selectTodos} from "../../../core/todo-store/todo.selectors";
import {catchError, of, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'tasks';

  constructor(private store: Store) {
  }

  saveStateToLocalStorage(): void {
    this.store.select(selectTodos)
      .pipe(take(1), catchError((error) => {
        console.error('error retrieving state from store:', error);
        return of(null); // fallback value
      }))
      .subscribe(state => {
        if (state) {
          this.saveState(state);
        }
      });
  }

  loadStateFromLocalStorage() {
    const savedState = localStorage.getItem(this.storageKey);
    if (savedState != null) {
      const parsedState: TodoState = JSON.parse(savedState);
      // dispatch an action to update the store with the saved state
      this.store.dispatch(loadTodos({todos: parsedState.todos}));
    }
  }

  private saveState(state: any): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(this.storageKey, serializedState);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }
}
