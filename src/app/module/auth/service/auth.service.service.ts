import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { envairoment } from '../../../../environments/envairoment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = envairoment.url;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private messageService: MessageService
  ) {}

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}accounts/password-reset/`, { email });
  }

  setNewPassword(uidb64: string, token: string, password: string, confirm_password: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}accounts/set-new-password/`, {
      uidb64,
      token,
      password,
      confirm_password
    });
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}accounts/register/`, user).pipe(retry(2));
  }

  verifyEmail(otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}accounts/verify-email/`, { otp }).pipe(retry(2));
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}accounts/login/`, user).pipe(
      tap(response => {
        const user = {
          full_name: response.full_name,
          email: response.email
        };
        this.cookie.set('access_token', response.access_token);
        this.cookie.set('refresh_token', response.refresh_token);
        this.cookie.set('user', JSON.stringify(user));
      }),
      retry(2)
    );
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    if (!refreshToken) {
      this.clearCookiesAndNotify('Su sesión ha expirado.');
      return of(null);
    }
    return this.http.post<any>(`${this.apiUrl}accounts/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        const newAccessToken = response.access;
        this.cookie.set('access_token', newAccessToken);
      }),
      catchError(() => {
        this.clearCookiesAndNotify('Su sesión ha expirado.');
        return of(null);
      })
    );
  }

  clearCookiesAndNotify(message: string): void {
    this.cookie.delete('user');
    this.cookie.delete('access_token');
    this.cookie.delete('refresh_token');
    this.messageService.add({ severity: 'warn', summary: 'Sesión Finalizada', detail: message });
    this.router.navigate(['auth']);
  }

  logoutUser(): Observable<any> {
    const refreshToken = this.cookie.get('refresh_token');
    return this.http.post<any>(`${this.apiUrl}accounts/logout/`, { refresh_token: refreshToken }).pipe(
      tap(() => {
        this.clearCookiesAndNotify('Sesión cerrada exitosamente.');
      }),
      retry(2)
    );
  }
}
