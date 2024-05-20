import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth.service.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Importar NgxUiLoaderService

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'], // Corrección de "styleUrl" a "styleUrls"
  providers: [MessageService]
})
export class VerifyEmailComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService // Inyectar NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), this.onlyNumbersValidator()]]
    });
  }

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = /^\d+$/.test(value);
      return isValid ? null : { 'onlyNumbers': { value: value } };
    };
  }

  submitVerificationCode(): void {
    if (this.form.valid) {
      const otp = this.form.value.otp;

      this.ngxLoader.start(); // Iniciar el cargador

      this.authService.verifyEmail(otp).subscribe(
        response => {
          this.ngxLoader.stop(); // Detener el cargador después de la respuesta exitosa

          // Mostrar un toast de éxito
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito Verificación',
            detail: 'Correo electrónico verificado exitosamente.'
          });

          this.messageService.add({
            severity: 'info',
            summary: 'Éxito Verificación | NO Salgas de la Aplicación',
            detail: 'Esto podría tardar unos segundos.',
            life: 20000
          });

          // Retrasar la redirección después de que aparezca el toast
          setTimeout(() => {
            // Redirigir al usuario a otra página después de verificar el correo electrónico
            this.router.navigate(['/auth']);
          }, 4000); // Redirigir después de 4 segundos (ajusta el tiempo según sea necesario)
        },
        error => {
          this.ngxLoader.stop(); // Detener el cargador en caso de error

          // Manejar el error, por ejemplo mostrar un mensaje de error
          console.error(error);
          // Mostrar un mensaje de error al usuario
          this.messageService.add({
            severity: 'error',
            summary: 'Error Verificación',
            detail: 'Error al verificar el correo electrónico.'
          });
        }
      );
    }
  }
}
