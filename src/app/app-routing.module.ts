import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./module/home/home.module').then(m => m.HomeModule) }
    ]
  },
  { path: 'error', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  {
    path: '**',
    redirectTo: '/error/notfound'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
