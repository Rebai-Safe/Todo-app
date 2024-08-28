import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";
import {SharedModule} from "../../shared/shared.module";
import { TodoChartComponent } from './components/todo-chart/todo-chart.component';
import {NgChartsModule} from "ng2-charts";



@NgModule({
  declarations: [
    TodoPageComponent,
    TodoChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgChartsModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
