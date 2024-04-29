import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './module/auth/page/login/login.component';
import { SignupComponent } from './module/auth/page/signup/signup.component';
import { AuthGuard } from './core/guard/auth.guard'; // Importa el guard de autenticación

const routes: Routes = [

  // URLs de Autenticacion
  { path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(i => i.AuthModule) },

  // URLs del sistema protegidas por el guard de autenticación
  {
    path: '',
    component: AppLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./module/home/home.module').then(r => r.HomeModule) },
      { path: 'usuario', loadChildren: () => import('./module/user/user.module').then(i => i.UserModule) }
    ]
  },

  // URLs de redireccion generico
  { path: 'redirect', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: '**', redirectTo: '/redirect/notfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
