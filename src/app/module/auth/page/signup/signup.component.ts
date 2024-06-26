import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Importar NgxUiLoaderService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthServiceService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService // Inyectar NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control?.value !== this.form?.get(matchTo)?.value;
      return forbidden ? { 'mustMatch': { value: control?.value } } : null;
    };
  }

  submitForm(): void {
    if (this.form.valid) {
      this.ngxLoader.start(); // Iniciar el cargador

      this.authService.registerUser(this.form.value).subscribe(
        response => {
          this.ngxLoader.stop(); // Detener el cargador después de la respuesta exitosa

          // Mostrar un toast indicando que el registro fue exitoso
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Se ha enviado un código a tu correo electrónico para activar tu cuenta.'
          });
  
          this.messageService.add({
            severity: 'info',
            summary: 'Registro exitoso | NO Salgas de la Aplicación',
            detail: 'Esto podría tardar unos segundos.',
            life: 20000
          });
  
          // Reiniciar el formulario
          this.form.reset();
  
          // Redirigir al usuario a la página de verificación de correo electrónico después de 4 segundos
          setTimeout(() => {
            this.router.navigate(['/accounts/verify-email']);
          }, 4000);
        },
        error => {
          this.ngxLoader.stop(); // Detener el cargador en caso de error

          // Manejar el error, por ejemplo mostrar un mensaje de error
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al registrar. Por favor, intenta nuevamente más tarde.'
          });
        }
      );
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, completa correctamente todos los campos.'
      });
    }
  }
}
