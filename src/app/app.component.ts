import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "./features/todo/services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-app';

  constructor(private localStorageService: LocalStorageService) {
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
    try {
      this.localStorageService.saveStateToLocalStorage()
    } catch (error) {
      console.error('error saving state to local storage:', error);
    }
  }

  private loadStateFromLocalStorage(): void {
    try {
      this.localStorageService.loadStateFromLocalStorage()
    } catch (error) {
      console.error('error retrieving state from local storage:', error);
    }
  }
}
