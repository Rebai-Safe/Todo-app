import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoChartComponent} from './todo-chart.component';
import {Observable, of} from "rxjs";
import {Todo, TodoState} from "../../../../shared/model/todo";
import {TodoService} from "../../services/todo.service";
import {NgChartsModule} from "ng2-charts";

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

  loadTodos(): Observable<TodoState> {
    return of({todos: this.todos})
  }

}

describe('TodoChartComponent', () => {
  let component: TodoChartComponent;
  let fixture: ComponentFixture<TodoChartComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoChartComponent],
      providers: [{provide: TodoService, useClass: TodoServiceMock}],
      imports: [NgChartsModule]
    });
    fixture = TestBed.createComponent(TodoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
