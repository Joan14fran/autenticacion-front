import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap, retry, catchError, throwError } from 'rxjs';
import { User } from '../../../core/models/models';
import { envairoment } from '../../../../environments/envairoment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  accessToken: string = "";
  refreshToken: string = "";
  private apiUrl = envairoment.url;

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) {
  }


  registerUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}accounts/register/`, user)
      .pipe(
        retry(2)
      );
  }

  verifyEmail(otp: string) {
    return this.http.post<any>(`${this.apiUrl}accounts/verify-email/`, { otp })
      .pipe(
        retry(2)
      );
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}accounts/login/`, user)
      .pipe(
        tap(response => {
          const user = {
            'full_name': response.full_name,
            'email': response.email
          }
          // Guardar el token de acceso y el usuario en cookies
          this.cookie.set('access_token', response.access_token);
          this.cookie.set('refresh_token', response.refresh_token);
          this.cookie.set('user', JSON.stringify(user));
        }),
        retry(2)
      );
  }

  logoutUser() {
    const refreshToken = this.cookie.get('refresh_token'); // Obtener el token de actualización de las cookies
    return this.http.post<any>(`${this.apiUrl}accounts/logout/`, { refresh_token: refreshToken })
      .pipe(
        tap(() => {
          // Limpiar las cookies u otros procesos de limpieza después de cerrar sesión
          this.cookie.delete('user');
          this.cookie.delete('access_token');
          this.cookie.delete('refresh_token');
          this.router.navigate(['auth'])
        }),retry(2)
      );
  }
  
}
