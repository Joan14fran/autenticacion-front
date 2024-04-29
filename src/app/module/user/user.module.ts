import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PerfilComponent } from './page/perfil/perfil.component';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  providers:[
    CookieService,
    MessageService
  ]
})
export class UserModule { }
