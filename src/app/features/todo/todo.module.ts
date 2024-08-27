import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    TodoPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
