import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodaysComponent} from "./todays.component";

const routes: Routes = [
  { path: '', component: TodaysComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodaysRoutingModule { }
