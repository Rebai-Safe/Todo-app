import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'features/todo',
    loadChildren: () => import('./features/todo/todo.module').then(m => m.TodoModule)
  }, {
    path: '',
    redirectTo: 'features/todo',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
