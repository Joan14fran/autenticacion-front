import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AuthServiceService } from '../../service/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private messageService: MessageService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const user = this.form.value;
      this.ngxLoader.start(); // Iniciar el cargador
      this.authService.loginUser(user).subscribe(
        response => {
          // Manejar la respuesta exitosa
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Autenticación Exitosa', detail: 'Credenciales validadas con éxito.' });
          this.messageService.add({ severity: 'info', summary: 'Autenticación Exitosa | NO Salgas de la Aplicación', detail: 'Esto podría tardar unos segundos.' });
          setTimeout(() => {
            this.router.navigate(['/']);
            this.ngxLoader.stop(); // Detener el cargador después de la navegación
          }, 4000);
        },
        error => {
          // Manejar el error
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Autenticación Fallida', detail: 'Error al iniciar sesión. Por favor, revise sus credenciales.' });
          this.ngxLoader.stop(); // Detener el cargador en caso de error
        }
      );
    }
  }

  requestPasswordReset(): void {
    this.ngxLoader.start(); // Iniciar el cargador
    this.authService.requestPasswordReset(this.email).subscribe(
      response => {
        // Manejar la respuesta exitosa
        this.messageService.add({ severity: 'success', summary: 'Correo de Restablecimiento Enviado', detail: 'Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.' });
        this.visible = false; // Cerrar el diálogo después de enviar la solicitud
        this.ngxLoader.stop(); // Detener el cargador
      },
      error => {
        // Manejar el error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al solicitar el restablecimiento de la contraseña. Por favor, inténtelo de nuevo.' });
        this.ngxLoader.stop(); // Detener el cargador en caso de error
      }
    );
  }
}
