import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TodaysComponent} from "./todays.component";
import {TodaysRoutingModule} from "./todays-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TodaysRoutingModule
  ],
  exports: [TodaysComponent],
  declarations: [TodaysComponent],
  providers: []
})
export class TodaysModule {
}
