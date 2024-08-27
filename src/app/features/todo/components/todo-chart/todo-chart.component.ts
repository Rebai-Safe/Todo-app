import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData} from "chart.js";
import {TodoService} from "../../services/todo.service";
import {Todo, TodoState} from "../../../../shared/model/todo";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-todo-chart',
  templateUrl: './todo-chart.component.html',
  styleUrls: ['./todo-chart.component.scss']
})
export class TodoChartComponent implements OnInit, OnDestroy{

  // to handle observable
  destroy$ = new Subject<void>();

  public pieChartLabels: string[] = ['Todo', 'InProgress', 'Done', 'Cancelled'];

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  public pieChartData!: ChartData<'pie', number[], string | string[]>;

  tasks: Todo[] = [];


  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
  this.todoService.loadTodos()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.tasks = res.todos;
      if (this.tasks.length > 0) {
        let todoCount, inProgressCount, doneCount, cancelledCount = 0
        todoCount = this.tasks.filter(task => task.state == "Todo").length
        inProgressCount = this.tasks.filter(task => task.state == "InProgress").length
        doneCount = this.tasks.filter(task => task.state == "Done").length
        cancelledCount = this.tasks.filter(task => task.state == "Cancelled").length
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [{
            data: [todoCount, inProgressCount, doneCount, cancelledCount],
            backgroundColor: ['#757575', '#F57C00', '#388E3C', '#D32F2F'],
          }]
        };
      }
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
