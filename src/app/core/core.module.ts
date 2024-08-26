import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./app.reducer";
import {todoReducer} from "./todo-store/todo.reducer";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', todoReducer),
    StoreModule.forRoot(appReducer)
  ]
})
export class CoreModule { }
