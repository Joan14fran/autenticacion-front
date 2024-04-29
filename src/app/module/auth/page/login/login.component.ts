import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthServiceService } from '../../service/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthServiceService, private messageService: MessageService,private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.loginUser(user).subscribe(
        response => {
          // Manejar la respuesta exitosa
          console.log(response);
          // Mostrar un mensaje de éxito al usuario si es necesario
          this.messageService.add({severity:'success', summary:'Autenticacion Exitosa', detail:'credenciales validadas con exito.'});
          this.messageService.add({severity:'info', summary:'Autenticacion Exitosa | NO Salgas de la Aplicacion', detail:'esto podria tardar unos segundos.'});
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000);
        },
        error => {
          // Manejar el error
          console.error(error);
          // Mostrar un mensaje de error al usuario si es necesario
          this.messageService.add({severity:'error', summary:'Autenticacion Fallida', detail:'Error al iniciar sesión. Por favor, revise sus credenciales.'});
        }
      );
    }
  }
}
