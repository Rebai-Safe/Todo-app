import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {Router, RouterLink} from "@angular/router";
import {Todo} from "../../../../shared/model/todo";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "@ngrx/store";
import {selectTodos} from "../../../../core/todo-store/todo.selectors";
import {deleteTodo} from "../../../../core/todo-store/todo.actions";
import {TodoService} from "../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'description', 'startDate', 'endDate', 'state', 'actions'];
  dataSource = new MatTableDataSource<Todo>();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private todoService: TodoService) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.todoService.loadTodos().subscribe(res => {
      this.dataSource.data = res.todos;
    })
  }

  goToUpdateTodo(element: Todo) {
    this.router.navigate(['/features/todo/update-todo', element.id])
  }

  deleteToDo(element: Todo) {
    try {
      this.todoService.deleteToDo(element.id, this.dialog)
    } catch {
      console.error('error deleting todo ');
    }
  }

  getClass(state: string) {
    switch (state) {
      case 'Todo':
        return 'todo';
      case 'InProgress':
        return 'in-progress';
      case 'Done':
        return 'done';
      case 'Cancelled':
        return 'cancelled';
      default:
        return "";
    }
  }
}




