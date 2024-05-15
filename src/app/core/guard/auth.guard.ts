import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../module/auth/service/auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.check();;
  }

  check():boolean{
    try {
      // console.log(this.cookieService.get("access_token"));
      if(!this.cookieService.check("access_token")){
        this.router.navigate(['auth'])
        return false
      }else{
        let token = this.cookieService.get("access_token")
        if(token =="undefined"){
          this.router.navigate(['auth'])
          return false
        }else{
          return true
        }
      }
    } catch (e) {
      return false
    }
  }
   
  
}
