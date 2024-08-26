import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {v4 as uuidv4} from 'uuid';
import {TodoService} from "../../../../shared/services/todo.service";
import {Store} from "@ngrx/store";
import {createTodo} from "../../../../core/todo-store/todo.actions";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {

  todoForm!: FormGroup;
  tasks: any[] = [];
  states = ['Todo', 'InProgress', 'Done', 'Cancelled']

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private todoService: TodoService) {
    this.todoForm = this.formBuilder.group({
      id: [uuidv4()],
      title: ['', Validators.required],
      description: ['', Validators.required],
      state: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    })
  }

  createTodo() {
    this.store.dispatch(createTodo({todo: this.todoForm.value}));
    this.router.navigate(['features/todo/todo-list'])
  }
}
