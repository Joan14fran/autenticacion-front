import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path:'', component: AppLayoutComponent,
        children:[
          { path: '', loadChildren: () => import('./module/home/home.module').then(m => m.HomeModule ) }
        ]
      },
      { path: 'notfound', component:NotfoundComponent },
      { path:'**', redirectTo: '/notfound' }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
