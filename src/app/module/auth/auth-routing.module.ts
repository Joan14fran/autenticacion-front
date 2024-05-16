import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { Login2Component } from './page/login2/login2.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "verify-email", component: VerifyEmailComponent },
  { path: 'password-reset-confirm/:uidb64/:token', component: ResetPasswordComponent },
  { path: 'login2', component: Login2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
