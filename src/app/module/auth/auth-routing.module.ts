import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { PasswordResetRequestComponent } from './page/password-reset-request/password-reset-request.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "verify-email", component: VerifyEmailComponent },
  { path: "forget-password", component: PasswordResetRequestComponent },
  { path: "password-confirm", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
