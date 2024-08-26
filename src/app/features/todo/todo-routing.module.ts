import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
    children: [
      {
        path: 'todo-list',
        loadComponent: () => import('./components/todo-list/todo-list.component').then((m) => m.TodoListComponent)
      }, {
        path: 'create-todo',
        loadComponent: () => import('./components/create-todo/create-todo.component').then((m) => m.CreateTodoComponent)
      }, {
        path: 'update-todo/:id',
        loadComponent: () => import('./components/update-todo/update-todo.component').then((m) => m.UpdateTodoComponent)
      }, {
        path: 'todo-dragdrop',
        loadComponent: () => import('./components/todo-drag-drop/todo-drag-drop.component').then((m) => m.TodoDragDropComponent)
      }, {
        path: '',
        redirectTo: 'todo-list',
        pathMatch: "full"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
