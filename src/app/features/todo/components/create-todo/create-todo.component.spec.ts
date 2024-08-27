import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTodoComponent} from './create-todo.component';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TodoService} from "../../services/todo.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Todo} from "../../../../shared/model/todo";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../core/app.state";
import {selectTodos} from "../../../../core/todo-store/todo.selectors";

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockTodoService = jasmine.createSpyObj('TodoService', ['createTodo', 'loadTodos', 'loadTodoById', 'deleteToDo', 'updateTodo', 'updateTodoState', 'doDeleteTodo']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CreateTodoComponent,
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
        {provide: MatSnackBar, useValue: mockSnackBar},
        {provide: TodoService, useValue: mockTodoService},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateTodoComponent]
    });
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the form with default values', () => {
    expect(component.todoForm).toBeDefined();
    expect(component.todoForm.get('title')?.value).toBe('');
    expect(component.todoForm.get('description')?.value).toBe('');
    expect(component.todoForm.get('state')?.value).toBe('');
    expect(component.todoForm.get('startDate')?.value).toBeNull();
    expect(component.todoForm.get('endDate')?.value).toBeNull();
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.todoForm.patchValue({
      title: '',
      description: '',
      state: '',
      startDate: null,
      endDate: null,
    });

    expect(component.todoForm.valid).toBeFalse();
  });

  it('should call createTodo from todoService on createTodo()', () => {
    const todoData: Todo = {
      id: 'mock-uuid',
      title: 'Test Task',
      description: 'Test Description',
      state: 'Todo',
      startDate: new Date(),
      endDate: new Date(),
    };

    // Set form values
    component.todoForm.setValue(todoData);
    component.createTodo();
    expect(mockTodoService.createTodo).toHaveBeenCalledWith(todoData);
  });

  it('should navigate to the todo list after creating a task', () => {
    component.createTodo();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['features/todo/todo-list']);
  });

});
