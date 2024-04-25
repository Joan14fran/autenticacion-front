import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './module/auth/page/login/login.component';
import { SignupComponent } from './module/auth/page/signup/signup.component';

const routes: Routes = [

  // URLs de Autenticacion
  { path: 'auth',component: LoginComponent,loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule) },
  { path: 'register',component: SignupComponent,loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule) },
  // URLs del sistema
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./module/home/home.module').then(m => m.HomeModule) }
    ]
  },
  // URLs de redireccionamiento en caso de un error o restriccion
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
