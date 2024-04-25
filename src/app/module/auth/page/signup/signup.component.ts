import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../../service/auth.service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor( private fb: FormBuilder, private messageService: MessageService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, this.matchValues('password')]]
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
      // 2. Llama al método signUp del servicio AuthServiceService
      this.authService.signUp(this.form.value)
        .subscribe(
          response => {
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'Registro exitoso', detail: 'El usuario ha sido registrado correctamente.' });
            this.form.reset();
          },
          error => {
            console.error(error);
            // Manejar el error, mostrar mensaje de error, etc.
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al registrar el usuario.' });
          }
        );
    } else {
      // Aquí puedes manejar lo que sucede cuando el formulario no es válido
      this.messageService.add({ severity: 'warn', summary: 'Formulario inválido', detail: 'Por favor completa correctamente todos los campos.' });
    }
  }
}
