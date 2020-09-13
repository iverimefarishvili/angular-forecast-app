import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WeeklyComponent} from "./weekly.component";
import {WeeklyRoutingModule} from "./weekly-routing.module";

@NgModule({
  imports: [
    CommonModule,
    WeeklyRoutingModule
  ],
  exports: [WeeklyComponent],
  declarations: [WeeklyComponent],
  providers: []
})
export class WeeklyModule{
}
