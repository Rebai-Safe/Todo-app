import {NgModule} from "@angular/core";
import {FeaturesRoutingModule} from "./features-routing.module";

import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";


@NgModule({
  declarations: [
    TodoPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule,
  ]
})
export class FeaturesModule {
}
