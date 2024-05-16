import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../module/auth/service/auth.service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get('access_token');
    if (accessToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            const refreshToken = this.cookieService.get('refresh_token');
            return this.authService.refreshAccessToken(refreshToken).pipe(
              switchMap((response: any) => {
                const newAccessToken = response.access;
                const newRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next.handle(newRequest);
              }),
              catchError((error: any) => {
                // Handle refresh token error or other errors
                console.error('Error refreshing token:', error);
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
}
