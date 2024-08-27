import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "./core/app.state";
import {TodoService} from "./features/todo/services/todo.service";
import {LocalStorageService} from "./features/todo/services/local-storage.service";
import {CreateTodoComponent} from "./features/todo/components/create-todo/create-todo.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {selectTodos} from "./core/todo-store/todo.selectors";
import {Router} from "@angular/router";

describe('AppComponent', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['saveStateToLocalStorage', 'loadStateFromLocalStorage', 'saveState']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CreateTodoComponent,
        ReactiveFormsModule,
        MatSnackBarModule, // Required for MatSnackBar to work
        BrowserAnimationsModule, // Required for MatSnackBar animations
      ],
      providers: [

        provideMockStore({
          selectors: [
            {
              selector: selectTodos, value: [{
                id: "632531de-74e5-4cb8-9951-80859cb5593f", title: "task6", description: "aa", state: "InProgress",
                endDate: "2024-08-29T22:00:00.000Z", startDate: ""
              }]
            }, // Mock selector value
          ],
        }),
        {provide: Router, useValue: mockRouter},
        {provide: LocalStorageService, useValue: mockLocalStorageService},
      ]
    }).compileComponents();
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-app');
  });

});
