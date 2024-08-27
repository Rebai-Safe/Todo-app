import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../../../../shared/model/todo";
import {SharedModule} from "../../../../shared/shared.module";
import {TodoService} from "../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  todoForm!: FormGroup;
  todo$: any;
  tasks: any[] = [];
  index!: number;
  states = ['Todo', 'InProgress', 'Done', ' Cancelled']


  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.todo$ = this.todoService.loadTodoById(id)
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
    try {
      this.todoService.updateTodo(this.todoForm.value)
      this._snackBar.open("Task updated successfully", '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['/features/todo/todo-list'])
    } catch {
      console.error('error updating todo ');
    }
  }
}
