import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../../service/auth.service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup;
  uidb64: string | null = null;
  token: string | null = null;

  constructor( private fb: FormBuilder, private authService: AuthServiceService, private messageService: MessageService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
    });

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      confirm_password: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.uidb64 && this.token) {
      const { password, confirm_password } = this.form.value;
      if (password === confirm_password) {
        this.authService.setNewPassword(this.uidb64, this.token, password, confirm_password).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Contraseña Restablecida', detail: 'Su contraseña ha sido restablecida con éxito.' });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000);
          },
          error => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al restablecer la contraseña. Por favor, inténtelo de nuevo.' });
          }
        );
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden.' });
      }
    }
  }
  
}
