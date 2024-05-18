import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../module/auth/service/auth.service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private warningTime = 600000 - 60000; // 10 minutos - 1 minuto

  constructor(private cookieService: CookieService, private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get('access_token');
    const refreshToken = this.cookieService.get('refresh_token');

    if (accessToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      this.startTokenExpiryTimer(refreshToken);

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.authService.refreshAccessToken(refreshToken).pipe(
              switchMap((response: any) => {
                const newAccessToken = response.access;
                this.cookieService.set('access_token', newAccessToken);
                const newRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next.handle(newRequest);
              }),
              catchError((error: any) => {
                this.authService.clearCookiesAndNotify('Su sesión ha expirado.');
                return throwError(error);
              })
            );
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  startTokenExpiryTimer(refreshToken: string) {
    timer(this.warningTime).subscribe(() => {
      this.authService.clearCookiesAndNotify('Su sesión está a punto de finalizar.');
    });
  }
}
