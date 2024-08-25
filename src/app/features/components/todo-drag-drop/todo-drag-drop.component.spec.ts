import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDragDropComponent } from './todo-drag-drop.component';

describe('TodoDragDropComponent', () => {
  let component: TodoDragDropComponent;
  let fixture: ComponentFixture<TodoDragDropComponent>;

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
