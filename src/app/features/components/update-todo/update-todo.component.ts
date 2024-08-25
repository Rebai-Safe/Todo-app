import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../../../shared/model/todo";
import {v4 as uuidv4} from "uuid";
import {SharedModule} from "../../../shared/shared.module";
import {Store} from "@ngrx/store";
import {loadTodoById, updateTodo} from "../../../core/todo.actions";
import {selectTodoById, selectTodos} from "../../../core/todo.selectors";

@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent {

  todoForm!: FormGroup;
  todo$: any;
  tasks: any[] = [];
  index!: number;
  states = ['Todo', 'InProgress', 'Done', ' Cancelled']


  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {

      // Dispatch action to load the todo by ID
      this.store.dispatch(loadTodoById({id}));

      // Select the todo by ID
      this.todo$ = this.store.select(selectTodoById(id));
      this.todo$.subscribe((res: Todo) => {
        this.todoForm = this.formBuilder.group({
          id: [res.id],
          title: [res.title, Validators.required],
          description: [res.description, Validators.required],
          state: [res.state, Validators.required],
          startDate: [res.startDate, Validators.required],
          endDate: [res.endDate, Validators.required],
        })
      })
    }
  }

  updateTodo() {
    this.store.dispatch(updateTodo(this.todoForm.value));
    //this.router.navigate(['/features/todo-list'])
  }
}
