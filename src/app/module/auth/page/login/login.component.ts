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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.signIn(username, password).subscribe(
        response => {
          // Aquí maneja la respuesta del inicio de sesión
          this.messageService.add({ severity: 'info', summary: 'Login', detail: 'Estoy podria tardar unos segundos.' });
          // Redirige al usuario a la página de dashboard
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error => {
          // Aquí maneja los errores de inicio de sesión
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas.' });
        }
      );
    } else {
      // Aquí puedes manejar lo que sucede cuando el formulario no es válido
    }
  }
}
