import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap, retry } from 'rxjs';
import { User } from '../../../core/models/models';
import { envairoment } from '../../../../environments/envairoment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = envairoment.url;

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  signUp(user: User) {
    return this.http.post<any>(`${this.apiUrl}usuario/api/signup/`, user);
  }
  
  signIn(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}usuario/api/signin/`, credentials).pipe(
      tap(response => {
        // Verifica si la respuesta contiene el token y los datos del usuario
        if (response && response.token && response.user) {
          // Guarda el token y los datos del usuario en las cookies
          this.saveToken(response.token);
          this.saveUserData(response.user);
        }
        return response;
      })
    );
  }

  // Método para guardar el token en la cookie
  private saveToken(token: string) {
    this.cookie.set('AuthToken', token);
  }

  // Método para guardar la información del usuario en la cookie
  private saveUserData(user: User) {
    this.cookie.set('userAuth', JSON.stringify(user));
  }

  logOut(token:string){ 
    return this.http.get(`${this.apiUrl}usuario/api/logout?token=${token}`).pipe(
      tap(res=>{
        this.cookie.deleteAll("/")
        this.router.navigate(['auth'])
      }),retry(2)
    )
  }

}
