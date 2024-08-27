import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateTodoComponent} from './update-todo.component';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TodoService} from "../../services/todo.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../core/app.state";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {selectTodos} from "../../../../core/todo-store/todo.selectors";
import {of} from "rxjs";

// Mock ActivatedRoute
const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => '123', // Mock the 'id' parameter
    },
  },
};

// Mock TodoService
class TodoServiceMock {
  loadTodoById(id: string) {
    return of({
      id: '123',
      title: 'Test Todo',
      description: 'Test Description',
      state: 'Todo',
      startDate: new Date(),
      endDate: new Date(),
    }); // Return an observable with mock data
  }
}

describe('UpdateTodoComponent', () => {
  let component: UpdateTodoComponent;
  let fixture: ComponentFixture<UpdateTodoComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockActivatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>;

  let store: MockStore<AppState>;


  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockTodoService = jasmine.createSpyObj('TodoService', ['createTodo', 'loadTodos', 'loadTodoById', 'deleteToDo', 'updateTodo', 'updateTodoState', 'doDeleteTodo']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['root', 'paramMap']);
    mockActivatedRouteSnapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', ['get']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        UpdateTodoComponent,
        ReactiveFormsModule,
        MatSnackBarModule, // Required for MatSnackBar to work
        BrowserAnimationsModule, // Required for MatSnackBar animations
      ],
      providers: [
        FormBuilder,
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
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: MatSnackBar, useValue: mockSnackBar},
        {provide: TodoService, useClass: TodoServiceMock},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateTodoComponent]
    });
    fixture = TestBed.createComponent(UpdateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
