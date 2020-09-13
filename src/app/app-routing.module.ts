import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/todays/todays.module').then(m => m.TodaysModule)},
  {path: 'daily', loadChildren: () => import('./components/todays/todays.module').then(m => m.TodaysModule)},
  {path: 'weekly', loadChildren: () => import('./components/weekly/weekly.module').then(m => m.WeeklyModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
