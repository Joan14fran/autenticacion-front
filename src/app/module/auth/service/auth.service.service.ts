import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap, retry, catchError, throwError } from 'rxjs';
import { User } from '../../../core/models/models';
import { envairoment } from '../../../../environments/envairoment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = envairoment.url;

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  registerUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}accounts/register/`, user)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyEmail(otp: string) {
    return this.http.post<any>(`${this.apiUrl}accounts/verify-email/`, { otp })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}accounts/login/`, user)
      .pipe(
        tap(response => {
          const user={
             'full_name':response.full_name,
             'email':response.email
          }
          // Guardar el token de acceso y el usuario en cookies
          this.cookie.set('access_token', response.access_token);
          this.cookie.set('refresh_token', response.refresh_token);
          this.cookie.set('user', JSON.stringify(user));
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

}
