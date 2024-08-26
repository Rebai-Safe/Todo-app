import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {Router, RouterLink} from "@angular/router";
import {Todo} from "../../../shared/model/todo";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {TodoService} from "../../../shared/services/todo.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "@ngrx/store";
import {selectTodos} from "../../../core/ngrx/todo.selectors";
import {deleteTodo} from "../../../core/ngrx/todo.actions";

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
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private todoService: TodoService) {
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.store.select(selectTodos).subscribe(res => {
      this.dataSource.data = res.todos;
    })
  }

  goToUpdateTodo(element: Todo) {
    this.router.navigate(['features/update-todo', element.id])
  }

  deleteToDo(element: Todo) {
    const id = element.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {title: "Are you sure ?", text: "Are you sure you want to delete this task ?", error: false}
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      if (response === 'YES') {
        this.store.dispatch(deleteTodo({id: element.id }));
      }
    }, error => {
      this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {title: "Error", text: "Error occurred while proceeding", error: true}
      });
    })
  }

  getClass(state: string) {
    switch (state) {
      case 'Todo':
        return 'todo';
        break;
      case 'InProgress':
        return 'in-progress';
        break;
      case 'Done':
        return 'done';
        break;
      case 'Cancelled':
        return 'cancelled';
        break;
      default:
        return "";
    }
  }
}




