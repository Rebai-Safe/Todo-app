import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {take} from "rxjs";
import {Store} from "@ngrx/store";
import {selectTodos} from "./core/todo-store/todo.selectors";
import {loadTodos} from "./core/todo-store/todo.actions";
import {TodoState} from "./shared/model/todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-app';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    // load the state from local storage
    this.loadStateFromLocalStorage();
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    // save the state to localStorage before the page refresh
    this.saveState();
  }

  ngOnDestroy(): void {

  }

  private saveState(): void {
    let featureState: any;
    this.store.select(selectTodos)
      .pipe(take(1))
      .subscribe(state => {
        featureState = state;
        if (featureState) {
          this.saveStateToLocalStorage(featureState);
        }
      });
  }

  private loadStateFromLocalStorage(): void {
    const savedState = localStorage.getItem("tasks");
    if (savedState != null) {
      const parsedState: TodoState = JSON.parse(savedState);
      // Dispatch an action to update the store with the saved state
      this.store.dispatch(loadTodos({todos: parsedState.todos}));
    }
  }

  private saveStateToLocalStorage(state: any): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('tasks', serializedState);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }
}
