import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoDragDropComponent} from './todo-drag-drop.component';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TodoService} from "../../services/todo.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../core/app.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {selectTodos} from "../../../../core/todo-store/todo.selectors";
import {Observable, of} from "rxjs";
import {Todo} from "../../../../shared/model/todo";


class TodoServiceMock {
  loadTodoById(id: string): Observable<Todo> {
    return of({
      id: '123',
      title: 'Test Todo',
      description: 'Test Description',
      state: 'Todo',
      startDate: new Date(),
      endDate: new Date(),
    }); // Return an observable with mock data
  }

  loadTodos() {
    return of({
      todos: [{
        id: '123',
        title: 'Test Todo',
        description: 'Test Description',
        state: 'Todo',
        startDate: new Date(),
        endDate: new Date(),
      }]
    })
  }
}

describe('TodoDragDropComponent', () => {
  let component: TodoDragDropComponent;
  let fixture: ComponentFixture<TodoDragDropComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockTodoService = jasmine.createSpyObj('TodoService', ['createTodo', 'loadTodos', 'loadTodoById', 'deleteToDo', 'updateTodo', 'updateTodoState', 'doDeleteTodo' ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TodoDragDropComponent,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTodos, value: [{
                id: "632531de-74e5-4cb8-9951-80859cb5593f", title: "task6", description: "aa", state: "InProgress",
                endDate: "2024-08-29T22:00:00.000Z", startDate: "2024-08-29T22:00:00.000Z"
              }]
            },
          ],
        }),
        {provide: Router, useValue: mockRouter},
        {provide: MatSnackBar, useValue: mockSnackBar},
        {provide: TodoService, useClass: TodoServiceMock},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoDragDropComponent]
    });
    fixture = TestBed.createComponent(TodoDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
