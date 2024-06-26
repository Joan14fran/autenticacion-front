import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"", pathMatch:"full", redirectTo:"dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { } 
