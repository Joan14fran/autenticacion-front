import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { PrimengModule } from './../../shared/Primeng.module';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { PasswordResetRequestComponent } from './page/password-reset-request/password-reset-request.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    PasswordResetRequestComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports:[
    LoginComponent,
    SignupComponent
  ],
  providers:[
    CookieService,
    MessageService
  ]
})
export class AuthModule { }
