import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from '../../service/user.service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent { 

  user:any
  constructor(private cookie: CookieService, private service: UserServiceService){
    // this.user = JSON.parse(this.cookie.get('userAuth'))
  }
  

}
