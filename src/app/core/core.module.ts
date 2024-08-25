import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {todoReducer} from "./todo.reducer";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({todos: todoReducer}, {})
  ]
})
export class CoreModule { }
