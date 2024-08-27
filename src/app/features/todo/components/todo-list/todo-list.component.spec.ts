import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {TodoService} from "../../services/todo.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../../core/app.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {selectTodos} from "../../../../core/todo-store/todo.selectors";
import {Observable, of} from "rxjs";
import {Todo, TodoState} from "../../../../shared/model/todo";
import {MatDialog} from "@angular/material/dialog";

// mock TodoService
class TodoServiceMock {

  todos: Todo[] = [{
    id: '123',
    title: 'Test Todo',
    description: 'Test Description',
    state: 'Todo',
    startDate: new Date(),
    endDate: new Date(),
  }]

  loadTodoById(id: string): Observable<Todo> {
    let todo = this.todos.filter(todo => todo.id == id)[0]
    return of(
      todo
    ); // Return an observable with mock data
  }
  loadTodos(): Observable<TodoState> {
    return of({todos: this.todos})
  }
  deleteToDo(id: string, dialog: MatDialog) {
    this.todos = this.todos.filter(t => t.id !== id)
  }
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['root', 'paramMap']);


    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TodoListComponent,
        MatSnackBarModule,
        BrowserAnimationsModule, // for matSnackBar animations
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTodos, value: []
            },
          ],
        }),
        {provide: Router, useValue: mockRouter},
        {provide: MatSnackBar, useValue: mockSnackBar},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: MatDialog, useValue: mockDialog},
        {provide: TodoService, useClass: TodoServiceMock},
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load todos and update the dataSource', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Test Todo');
  });

  it('should navigate to the update todo route when goToUpdateTodo is called', () => {
    const todo: Todo = { id: "99999", title: 'Test Todo 1', description: 'Test Description 1', state: 'Todo', startDate: new Date(), endDate: new Date() };
    component.goToUpdateTodo(todo);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/features/todo/update-todo', todo.id]);
  });


  it('should return the correct class for each state', () => {
    expect(component.getClass('Todo')).toBe('todo');
    expect(component.getClass('InProgress')).toBe('in-progress');
    expect(component.getClass('Done')).toBe('done');
    expect(component.getClass('Cancelled')).toBe('cancelled');
    expect(component.getClass('Unknown')).toBe('');
  });
});
