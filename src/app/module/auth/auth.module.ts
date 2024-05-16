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
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { Login2Component } from './page/login2/login2.component';


@NgModule({
  declarations: [
    LoginComponent, 
    SignupComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    Login2Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
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
