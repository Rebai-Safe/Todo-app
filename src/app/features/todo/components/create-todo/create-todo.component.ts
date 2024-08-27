import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {v4 as uuidv4} from 'uuid';
import {Todo} from "../../../../shared/model/todo";
import {TodoService} from "../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";


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
    private router: Router,
    private _snackBar: MatSnackBar,
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
    try {
      this.todoService.createTodo(this.todoForm.value)
      this._snackBar.open("Task created successfully", '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['features/todo/todo-list']);
    } catch (error) {
      console.error('error saving todo :', error);
    }
  }
}

